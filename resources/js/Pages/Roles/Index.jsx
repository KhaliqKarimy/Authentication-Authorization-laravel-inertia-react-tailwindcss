import usePermission from "@/Hooks/UsePermission";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
    roles,
    permissions,
}) {
    const { can } = usePermission();

    const [open, setOpen] = useState(false);

    const [selectedRole, setSelectedRole] =
        useState(null);

    const {
        data,
        setData,
        put,
        processing,
    } = useForm({
        permissions: [],
    });

    const deleteRole = (id) => {

        if (confirm("Delete role?")) {

            router.delete(
                route("roles.destroy", id)
            );
        }
    };

    const openPermissionModal = (role) => {

        setSelectedRole(role);

        setData(
            "permissions",
            role.permissions?.map(p => p.id) || []
        );

        setOpen(true);
    };

    const togglePermission = (id) => {

        if (data.permissions.includes(id)) {

            setData(
                "permissions",
                data.permissions.filter(
                    item => item !== id
                )
            );

        } else {

            setData(
                "permissions",
                [...data.permissions, id]
            );
        }
    };

    const submitPermissions = () => {

        put(
            route(
                "roles.syncPermissions",
                selectedRole.id
            ),
            {
                preserveScroll: true,

                onSuccess: () => {
                    setOpen(false);
                },
            }
        );
    };

    return (
        <>
            <Head title="Roles" />

            <div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h1 className="text-2xl font-bold">
                            Roles
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage system roles
                        </p>

                    </div>

                    {can("roles.create") && (

                        <Link
                            href={route("roles.create")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
                        >
                            Create Role
                        </Link>

                    )}

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Guard
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Created
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {roles.data.map(role => (

                                <tr
                                    key={role.id}
                                    className="border-b"
                                >

                                    <td className="px-6 py-4 font-medium">
                                        {role.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {role.guard_name}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {role.created_at}
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex gap-4">

                                            {can("roles.edit") && (

                                                <Link
                                                    href={route("roles.edit", role.id)}
                                                    className="text-indigo-600"
                                                >
                                                    Edit
                                                </Link>

                                            )}

                                            {can("roles.assign.permission") && (

                                                <button
                                                    onClick={() => openPermissionModal(role)}
                                                    className="text-green-600"
                                                >
                                                    Permissions
                                                </button>

                                            )} 

                                            {can("roles.delete") && (

                                                <button
                                                    onClick={() => deleteRole(role.id)}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </button>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Modal */}
                {open && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                        <div className="bg-white w-full max-w-2xl rounded-2xl p-6">

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <h2 className="text-xl font-bold">
                                        Assign Permissions
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {selectedRole?.name}
                                    </p>

                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-gray-500"
                                >
                                    ✕
                                </button>

                            </div>

                            <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2">

                                {Object.entries(permissions).map(
                                    ([group, items]) => (

                                        <div
                                            key={group}
                                            className="border rounded-2xl overflow-hidden"
                                        >

                                            {/* Group Header */}
                                            <div className="bg-gray-50 px-4 py-3 border-b">

                                                <h3 className="font-semibold capitalize text-gray-800">
                                                    {group}
                                                </h3>

                                            </div>

                                            {/* Permissions */}
                                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">

                                                {items.map(permission => (

                                                    <label
                                                        key={permission.id}
                                                        className="
                                flex items-center gap-3
                                border rounded-xl px-4 py-3
                                cursor-pointer
                                hover:bg-indigo-50
                                transition
                            "
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            checked={data.permissions.includes(
                                                                permission.id
                                                            )}
                                                            onChange={() =>
                                                                togglePermission(permission.id)
                                                            }
                                                            className="rounded border-gray-300"
                                                        />

                                                        <div>

                                                            <p className="text-sm font-medium text-gray-800">

                                                                {permission.name
                                                                    .split(".")[1]
                                                                    ?.replace(".", " ")
                                                                    .replace("-", " ")
                                                                }

                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {permission.name}
                                                            </p>

                                                        </div>

                                                    </label>

                                                ))}

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 border rounded-xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={processing}
                                    onClick={submitPermissions}
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl disabled:opacity-50"
                                >
                                    Save Permissions
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

Index.layout = page => (
    <DashboardLayout children={page} />
);