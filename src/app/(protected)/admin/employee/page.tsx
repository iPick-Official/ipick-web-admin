'use client';
import { useEffect, useMemo, useState } from 'react';
import { Download, PenBox, PlusIcon } from 'lucide-react';
import { Admin } from '@/types/admin';
import { RegisterFormType } from '@/types/registration';
import { departments } from '@/app/utils/department';
import { compressAndRenameImage } from '@/app/utils/compressor';
import { useSort } from '@/hooks/useSort';
import { Sidebar } from '@/components/ui/Sidebar';
import { Loading } from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';
import { RegisterForm } from '@/components/ui/Registration';
import FilterToolbar from '@/components/ui/FilterToolbar';
import DataTable, { Column } from '@/components/ui/DataTable';

export default function EmployeePage() {
    const [editingEmployee, setEditingEmployee] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<Admin[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { sortOrder, toggleSort } = useSort("desc");
    const [addEmployee, setAddEmployee] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<{ name: string; url: string } | null>(null);

    const [registerForm, setRegisterForm] = useState<RegisterFormType>({
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobnum: "",
        address: "",
        password: "iPick_2023",
        position: "",
        department: "",
        status: "",
        photoUrl: { name: "", url: "" },
    });

    useEffect(() => {
        async function fetchEmployees() {
            setLoading(true);
            try {
                const res = await fetch('/api/employees');
                if (!res.ok) throw new Error('Failed to fetch employees');

                const data = await res.json();
                setEmployees(data.employees || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchEmployees();
    }, []);

    const handleFileChange = (file: File) => {
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);
        setProfileImage({ name: file.name, url: previewUrl });
    };

    async function uploadProfileImage(file: File) {
        const compressedFile = await compressAndRenameImage(file);
        const formData = new FormData();
        formData.append("file", compressedFile);
        const res = await fetch("/api/photo-upload", { method: "POST", body: formData });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Image upload failed");
        }
        const data = await res.json();
        return { name: String(data.filename || compressedFile.name), url: String(data.url) };
    }

    async function fetchImageFromApi(filename: string): Promise<string> {
        const res = await fetch(`/api/photo-url?filename=${filename}`);
        if (!res.ok) throw new Error("Failed to fetch existing image");
        const blob = await res.blob();
        return URL.createObjectURL(blob);
    }

    async function submitEmployee() {
        try {
            let photoUrl = registerForm.photoUrl;
            if (selectedFile) photoUrl = await uploadProfileImage(selectedFile);

            const payload: RegisterFormType = { ...registerForm, photoUrl };
            const isEdit = Boolean(editingEmployee?._id);
            const res = await fetch(isEdit ? `/api/employees/${editingEmployee!._id}` : "/api/auth/register", {
                method: isEdit ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Operation failed");
            alert(isEdit ? "Employee updated successfully" : "Employee created successfully");
            window.location.reload();
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Server error");
        }
    }

    const openAddEmployeeModal = () => {
        setEditingEmployee(null);
        setProfileImage(null);
        setRegisterForm({
            username: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            mobnum: "",
            address: "",
            position: "",
            department: "",
            status: "",
            password: "iPick_2023",
            photoUrl: { name: "", url: "" },
        });
        setAddEmployee(true);
    };

    const openEditEmployeeModal = async (emp: Admin) => {
        setEditingEmployee(emp);
        setSelectedFile(null);
        if (emp.photoUrl?.name) {
            try {
                const previewUrl = await fetchImageFromApi(emp.photoUrl.name);
                setProfileImage({ name: emp.photoUrl.name, url: previewUrl });
            } catch (err) {
                console.error(err);
                setProfileImage(null);
            }
        } else setProfileImage(null);

        setRegisterForm({
            username: emp.username || "",
            firstName: emp.firstName || "",
            middleName: emp.middleName || "",
            lastName: emp.lastName || "",
            email: emp.email || "",
            mobnum: emp.mobnum || "",
            address: emp.address || "",
            position: emp.position || "",
            department: emp.department || "",
            status: emp.status || "",
            photoUrl: emp.photoUrl || { name: "", url: "" },
        });
        setAddEmployee(true);
    };

    const displayedEmployee = useMemo(() => {
        return employees.filter(e => {
            const term = searchTerm.toLowerCase();
            return (
                e.department?.toLowerCase().includes(term) ||
                e.status?.toLowerCase().includes(term) ||
                e.username?.toLowerCase().includes(term) ||
                e.firstName?.toLowerCase().includes(term) ||
                e.lastName?.toLowerCase().includes(term) ||
                e.mobnum?.includes(term)
            );
        });
    }, [employees, searchTerm]);

    const sortedEmployee = useMemo(() => {
        return [...displayedEmployee].sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }, [displayedEmployee, sortOrder]);

    // Define DataTable columns
    const columns: Column<Admin>[] = [
        { key: "employeeId", label: "ID" },
        { key: "fullName", label: "Full Name", render: (row) => `${row.firstName} ${row.lastName}` },
        { key: "username", label: "Username" },
        { key: "mobnum", label: "Mobile" },
        {
            key: "department",
            label: "Department",
            render: (row) => departments.find(d => d.id === row.department)?.name || row.department,
        },
        { key: "status", label: "Status", render: (row) => row.status.toUpperCase() },
        {
            key: "createdAt",
            label: "Created At",
            sortable: true,
            render: (row) => new Date(row.createdAt).toLocaleString(),
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Employees"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onRegister={openAddEmployeeModal}
                    onExport={() => ""}
                    exportDisabled={loading}
                />

                <DataTable
                    columns={columns}
                    data={sortedEmployee}
                    loading={loading}
                    rowKey={(row) => row._id}
                    sortOrder={sortOrder}
                    onSortToggle={toggleSort}
                    emptyMessage="No employees found."
                    actionColumn={{
                        label: "Action",
                        render: (row) => (
                            <div className="text-green-700">
                                <PenBox
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditEmployeeModal(row);
                                    }}
                                />
                            </div>
                        ),
                    }}
                />

                <Modal
                    isOpen={addEmployee}
                    onClose={() => setAddEmployee(false)}
                    title={editingEmployee ? "Edit Information" : "Add Employee"}
                    size="xl"
                >
                    <RegisterForm
                        form={registerForm}
                        setForm={setRegisterForm}
                        onSubmit={submitEmployee}
                        onFileChange={handleFileChange}
                        profileImage={profileImage}
                    />
                </Modal>
            </div>
        </div>
    );
}
