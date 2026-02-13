import { Message } from "@/types/history";
import React from "react";

type Props = {
    messages?: Message[] | null;
};

const MessagesCard: React.FC<Props> = ({ messages }) => {
    const sortedMessages = (messages || [])
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (sortedMessages.length === 0) {
        return <p className="text-gray-500">No messages available.</p>;
    }

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 h-[500px] overflow-y-auto space-y-6">
            {sortedMessages.map((m: Message, idx: number) => {
                const isDriver = m.sender === "driver";

                return (
                    <div
                        key={idx}
                        className={`flex w-full ${isDriver ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`
                max-w-[75%] px-4 py-3 rounded-xl shadow-md relative
                ${isDriver ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}
              `}
                        >
                            {/* Sender Label */}
                            <p
                                className={`
                  text-xs font-semibold mb-1 
                  ${isDriver ? "text-blue-200" : "text-gray-600"}
                `}
                            >
                                {isDriver ? "Driver" : "Rider"}
                            </p>

                            {/* Main Message Text */}
                            <p className="text-sm whitespace-pre-line leading-relaxed">
                                {m.msg}
                            </p>

                            {/* Metadata Section */}
                            <div
                                className={`
                  mt-3 p-2 rounded-lg text-[11px] space-y-1
                  ${isDriver ? "bg-blue-500/40" : "bg-gray-200"}
                `}
                            >
                                <p>
                                    <span className="font-semibold">Booking:</span> {m.bookingId}
                                </p>
                                <p>
                                    <span className="font-semibold">Rider:</span> {m.riderId}
                                </p>
                                <p>
                                    <span className="font-semibold">Driver:</span> {m.driverId}
                                </p>
                            </div>

                            {/* Timestamp */}
                            <p
                                className={`
                  text-[10px] mt-2 text-right
                  ${isDriver ? "text-blue-200" : "text-gray-500"}
                `}
                            >
                                {new Date(m.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessagesCard;
