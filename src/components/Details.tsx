interface DetailProps {
    label: string;
    value?: string | number | null;
}

export const Detail: React.FC<DetailProps> = ({ label, value }) => (
    <div className="flex flex-col border rounded p-3 bg-gray-100 dark:bg-zinc-900">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="font-medium">{value ?? '-'}</span>
    </div>
);