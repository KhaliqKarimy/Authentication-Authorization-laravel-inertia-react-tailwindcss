import usePermission from "@/Hooks/UsePermission";
import DashboardLayout from "@/Layouts/DashboardLayout";

import {
    Head,
    Link,
    router,
    useForm,
} from "@inertiajs/react";

import { useState } from "react";

function Index({ users, roles }) {
    const { can } = usePermission();

    const [open, setOpen] = useState(false);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const {
        data,
        setData,
        patch,
        processing,
    } = useForm({
        roles: [],
    });

    const deleteUser = (id) => {

        if (confirm("Are you sure?")) {

            router.delete(
                route("users.destroy", id)
            );
        }
    };

    /**
     * Open role modal
     */
    const openRoleModal = (user) => {

        setSelectedUser(user);

        setData(
            "roles",
            user.roles || []
        );

        setOpen(true);
    };

    /**
     * Toggle role
     */
    const toggleRole = (roleName) => {

        if (data.roles.includes(roleName)) {

            setData(
                "roles",
                data.roles.filter(
                    role => role !== roleName
                )
            );

        } else {

            setData(
                "roles",
                [...data.roles, roleName]
            );
        }
    };

    /**
     * Save roles
     */
    const submitRoles = () => {

        patch(
            route(
                "users.assign-role",
                selectedUser.id
            ),
            {
                preserveScroll: true,

                onSuccess: () => {

                    setOpen(false);

                    setSelectedUser(null);
                },
            }
        );
    };

    return (
        <>
            <Head title="Users" />

            <div>

                {/* Header */}
                <div className="
                    flex items-center justify-between mb-6
                ">

                    <div>

                        <h1 className="
                            text-2xl font-bold text-gray-800
                        ">
                            Users
                        </h1>

                        <p className="
                            text-sm text-gray-500
                        ">
                            Manage system users
                        </p>

                    </div>
                    {can('users.create') && (
                        
                        <Link
                        href={route("users.create")}
                        className="
                        bg-indigo-600 hover:bg-indigo-700
                        text-white px-4 py-2 rounded-xl
                        "
                        >
                        Add User
                    </Link>
                    )}

                </div>

                {/* Table */}
                <div className="
                    bg-white rounded-2xl
                    shadow-sm border overflow-hidden
                ">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="
                                bg-gray-50 border-b
                            ">

                                <tr>

                                    <th className="px-6 py-4 text-left">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Roles
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

                                {users.data.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="
                                            border-b hover:bg-gray-50
                                        "
                                    >

                                        <td className="px-6 py-4">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>

                                        {/* Roles */}
                                        <td className="px-6 py-4">

                                            <div className="
                                                flex flex-wrap gap-2
                                            ">

                                                {user.roles?.length > 0 ? (

                                                    user.roles.map(role => (

                                                        <span
                                                            key={role}
                                                            className="
                                                                px-3 py-1
                                                                rounded-full
                                                                text-xs
                                                                bg-indigo-100
                                                                text-indigo-700
                                                                font-medium
                                                            "
                                                        >
                                                            {role}
                                                        </span>

                                                    ))

                                                ) : (

                                                    <span className="
                                                        text-sm text-gray-400
                                                    ">
                                                        No roles
                                                    </span>

                                                )}

                                            </div>

                                        </td>

                                        <td className="
                                            px-6 py-4 text-sm text-gray-500
                                        ">
                                            {user.created_at}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="
                                                flex items-center gap-4
                                            ">
                                                {can('users.assign.role') && (
                        
                                                    <button
                                                    onClick={() =>
                                                        openRoleModal(user)
                                                    }
                                                    className="
                                                    text-green-600
                                                    "
                                                    >
                                                    Roles
                                                </button>
                                                )}
                                                {can('users.edit') && (
                        
                                                    <Link
                                                    href={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                    className="
                                                    text-indigo-600
                                                    "
                                                    >
                                                    Edit
                                                </Link>
                                                )}
                                                {can('users.delete') && (
                        
                                                    <button
                                                    onClick={() =>
                                                        deleteUser(user.id)
                                                    }
                                                    className="
                                                        text-red-600
                                                    "
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

                </div>

                {/* Role Modal */}
                {open && (

                    <div className="
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/40
                    ">

                        <div className="
                            bg-white w-full max-w-lg
                            rounded-2xl p-6
                        ">

                            <div className="
                                flex items-center justify-between mb-6
                            ">

                                <div>

                                    <h2 className="
                                        text-xl font-bold
                                    ">
                                        Assign Roles
                                    </h2>

                                    <p className="
                                        text-sm text-gray-500
                                    ">
                                        {selectedUser?.name}
                                    </p>

                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                >
                                    ✕
                                </button>

                            </div>

                            <div className="
                                grid grid-cols-2 gap-3
                            ">

                                {roles.map(role => (

                                    <label
                                        key={role.id}
                                        className="
                                            border rounded-xl p-3
                                            flex items-center gap-3
                                            cursor-pointer
                                            hover:bg-gray-50
                                        "
                                    >

                                        <input
                                            type="checkbox"
                                            checked={data.roles.includes(
                                                role.name
                                            )}
                                            onChange={() =>
                                                toggleRole(role.name)
                                            }
                                        />

                                        <span>
                                            {role.name}
                                        </span>

                                    </label>

                                ))}

                            </div>

                            <div className="
                                flex justify-end gap-3 mt-6
                            ">

                                <button
                                    onClick={() => setOpen(false)}
                                    className="
                                        border px-4 py-2 rounded-xl
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={processing}
                                    onClick={submitRoles}
                                    className="
                                        bg-indigo-600 text-white
                                        px-5 py-2 rounded-xl
                                    "
                                >
                                    Save Roles
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

export default Index;