export function ProfileForm({ form, setForm, onSubmit }: any) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3 text-sm">
            {Object.keys(form).map((key) => (
                <div key={key}>
                    <label className="block text-xs mb-1 capitalize">{key}</label>
                    <input
                        type="text"
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: (e.target.value) })}
                    />
                </div>
            ))}
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-2"
            >
                Save Changes
            </button>
        </form>
    );
}