import { ReactNode } from "react";

interface DetailProps {
    label: string;
    value?: ReactNode;
}

export const Detail: React.FC<DetailProps> = ({ label, value }) => (
    <div className="flex flex-col rounded-2xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-950 p-4 shadow-sm">
        <span className="text-xs font-medium">
            {label}
        </span>
        <span className="text-sm font-semibold">
            {value ?? "-"}
        </span>
    </div>
);
