import React from "react";
import { Loading } from "../ui/Loading";
import Modal from "../ui/Modal";

interface Driver {
    id?: string | number;
    name?: string;
    // add other driver fields if needed
}

interface DriverModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDriver: Driver | null;
    loading: boolean;
    tabs: string[];
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    renderTabContent: () => React.ReactNode;
}

const DriverModal: React.FC<DriverModalProps> = ({
    isOpen,
    onClose,
    selectedDriver,
    loading,
    tabs,
    activeTab,
    setActiveTab,
    renderTabContent,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedDriver?.name || "Driver Details"}
            size="full"
        >
            {loading ? (
                <div className="flex items-center justify-center w-full h-full py-12">
                    <Loading />
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    {/* Tabs */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800">
                        <nav className="flex gap-2 md:gap-3 px-3 md:px-4 py-3 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors duration-200
                    ${activeTab === tab
                                            ? "bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900 shadow"
                                            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white dark:bg-zinc-950">
                        {renderTabContent()}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default DriverModal;
