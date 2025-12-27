'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { BsPersonAdd } from "react-icons/bs";
import { Loading } from '@/components/Loading';
import { Eye } from 'lucide-react';
import { Admin } from '@/types/admin';
import { RegisterForm } from '@/components/registrationForm';
import { RegisterFormType } from '@/types/registration';
import Modal from '@/components/Modal';
import { departments } from '@/app/utils/department';

export default function EmployeePage() {
    const [editingEmployee, setEditingEmployee] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<Admin[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addEmployee, setAddEmployee] = useState(false);
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

    async function submitEmployee() {
        if (
            !registerForm.username?.trim() ||
            !registerForm.email?.trim() ||
            !registerForm.mobnum?.trim() ||
            !registerForm.address?.trim()
        ) {
            alert("All required fields must be filled");
            return;
        }

        try {
            const isEdit = Boolean(editingEmployee?._id);

            const res = await fetch(
                isEdit
                    ? `/api/admin/${editingEmployee!._id}`
                    : "/api/auth/register",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerForm),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Operation failed");
                return;
            }

            alert(isEdit ? "Employee updated successfully" : "Employee created successfully");

            setAddEmployee(false);
            setEditingEmployee(null);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">Employees</h2>
                    <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search name, email, or mobile"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                        />

                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition"
                            onClick={() => {
                                setEditingEmployee(null);
                                setRegisterForm({
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
                                });
                                setAddEmployee(true);
                            }}
                        >
                            <BsPersonAdd />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="shadow-md rounded-lg overflow-hidden bg-white dark:bg-zinc-800">
                    <div className="overflow-y-auto max-h-[75vh]">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-200 dark:bg-zinc-700 uppercase text-xs sticky top-0 z-10">
                                <tr>
                                    {['ID', 'Full Name', 'Email', 'Mobile', 'Department', 'Created At'].map(col => (
                                        <th key={col} className="px-6 py-3 font-medium">
                                            {col}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="py-6">
                                            <div className="flex items-center justify-center w-full h-full">
                                                <Loading />
                                            </div>
                                        </td>
                                    </tr>
                                ) : employees.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                                            No employees found.
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map(emp => (
                                        <tr
                                            key={emp._id}
                                            className="border-b hover:bg-gray-800 hover:text-white transition"
                                        >
                                            <td className="px-6 py-3">{emp.employeeId}</td>
                                            <td className="px-6 py-3">{`${emp.firstName} ${emp.lastName}`}</td>
                                            <td className="px-6 py-3">{emp.email}</td>
                                            <td className="px-6 py-3">{emp.mobnum}</td>
                                            <td className="px-6 py-3">
                                                {
                                                    departments.find((dept: { id: string; }) => dept.id === emp.department)?.name || emp.department
                                                }
                                            </td>
                                            <td className="px-6 py-3">
                                                {new Date(emp.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-3 flex justify-end text-green-700">
                                                <Eye
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setEditingEmployee(emp);
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
                                                        });
                                                        setAddEmployee(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <Modal isOpen={addEmployee} onClose={() => setAddEmployee(false)} title={editingEmployee ? "Edit Information" : "Add Employee"} size="xl">
                            <RegisterForm
                                form={registerForm}
                                setForm={setRegisterForm}
                                onSubmit={submitEmployee}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
