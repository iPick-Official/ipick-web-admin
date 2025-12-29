import { ReactNode } from 'react';

interface DetailProps {
    label: string;
    value?: ReactNode;
}

export const Detail: React.FC<DetailProps> = ({ label, value }) => (
    <div className="flex flex-col border rounded rounded-lg p-3 bg-gray-100 dark:bg-zinc-900">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="font-medium">{value ?? '-'}</span>
    </div>
);
