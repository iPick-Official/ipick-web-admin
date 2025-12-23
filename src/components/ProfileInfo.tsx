export function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}