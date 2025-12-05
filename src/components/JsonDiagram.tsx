"use client";

import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    Handle,
    Position
} from "reactflow";
import "reactflow/dist/style.css";

import dagre from "dagre";

// ----- DAGRE LAYOUT ----- //
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const applyLayout = (nodes: Node[], edges: Edge[]) => {
    dagreGraph.setGraph({ rankdir: "TB", nodesep: 40, ranksep: 80 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 180, height: 50 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    return nodes.map((node) => {
        const position = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: position.x - 90,
                y: position.y - 25
            }
        };
    });
};

// ----- CUSTOM COLLAPSIBLE NODE ----- //

function CollapsibleNode({ data }: any) {
    return (
        <div className="border rounded-lg shadow-sm bg-white px-3 py-2 text-sm">
            <div className="flex justify-between items-center">
                <strong>{data.label}</strong>
                {data.canToggle && (
                    <button
                        onClick={data.onToggle}
                        className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        {data.collapsed ? "+" : "-"}
                    </button>
                )}
            </div>

            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
        </div>
    );
}

const nodeTypes = { collapsible: CollapsibleNode };

// ----- MAIN DIAGRAM COMPONENT ----- //

export default function JsonDiagram({ data }: { data: any }) {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const toggle = (id: string) =>
        setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

    const { nodes: layoutNodes, edges: layoutEdges } = useMemo(() => {
        let nodes: Node[] = [];
        let edges: Edge[] = [];

        let idCounter = 0;
        const makeId = () => `node-${idCounter++}`;

        const buildGraph = (value: any, parentId: string | null, label: string) => {
            const id = makeId();

            const isExpandable =
                typeof value === "object" && value !== null && Object.keys(value).length > 0;

            const node: Node = {
                id,
                type: "collapsible",
                position: { x: 0, y: 0 },
                data: {
                    label,
                    collapsed: collapsed[id] ?? false,
                    canToggle: isExpandable,
                    onToggle: () => toggle(id)
                }
            };

            nodes.push(node);

            if (parentId)
                edges.push({
                    id: `edge-${parentId}-${id}`,
                    source: parentId,
                    target: id
                });

            const isCollapsed = collapsed[id];

            if (!isCollapsed) {
                if (Array.isArray(value)) {
                    value.forEach((v, i) => buildGraph(v, id, `[${i}]`));
                } else if (typeof value === "object" && value !== null) {
                    Object.entries(value).forEach(([k, v]) => buildGraph(v, id, k));
                }
            }

            return id;
        };

        buildGraph(data, null, "root");

        // Auto layout
        const layoutedNodes = applyLayout(nodes, edges);
        return { nodes: layoutedNodes, edges };
    }, [data, collapsed]);

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutEdges);

    // Apply relayout when collapsed changes
    React.useEffect(() => {
        const newNodes = applyLayout(layoutNodes, layoutEdges);
        setNodes(newNodes);
        setEdges(layoutEdges);
    }, [collapsed]);

    return (
        <div style={{ height: 650 }} className="border rounded-lg bg-white">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
