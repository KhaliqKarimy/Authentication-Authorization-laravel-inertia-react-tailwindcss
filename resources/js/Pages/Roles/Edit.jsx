import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({
    role,
    permissions
}) {

    const { data, setData, put, processing, errors } = useForm({

        name: role.name,

        permissions: role.permissions.map(
            permission => permission.name
        ),
    });

    const submit = (e) => {

        e.preventDefault();

        put(route('roles.update', role.id));
    };

    const togglePermission = (permissionName) => {

        if (
            data.permissions.includes(permissionName)
        ) {

            setData(
                'permissions',
                data.permissions.filter(
                    item => item !== permissionName
                )
            );

        } else {

            setData(
                'permissions',
                [
                    ...data.permissions,
                    permissionName
                ]
            );
        }
    };

    const toggleGroup = (groupPermissions) => {

        const permissionNames = groupPermissions.map(
            permission => permission.name
        );

        const allSelected = permissionNames.every(
            permission =>
                data.permissions.includes(permission)
        );

        if (allSelected) {

            setData(
                'permissions',
                data.permissions.filter(
                    permission =>
                        !permissionNames.includes(permission)
                )
            );

        } else {

            setData(
                'permissions',
                [
                    ...new Set([
                        ...data.permissions,
                        ...permissionNames
                    ])
                ]
            );
        }
    };

    return (
        <>
            <Head title="Edit Role" />

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-6">

                    <h1 className="text-2xl font-bold">
                        Edit Role
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage role permissions
                    </p>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    {/* Role Name */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <label className="block text-sm font-medium mb-2">
                            Role Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData(
                                    'name',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                rounded-xl
                                border-gray-300
                                focus:ring-indigo-500
                                focus:border-indigo-500
                            "
                        />

                        {errors.name && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.name}
                            </div>
                        )}

                    </div>

                    {/* Permissions */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between mb-6">

                            <div>
                                <h2 className="text-lg font-semibold">
                                    Permissions
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Assign permissions to role
                                </p>
                            </div>

                            <div className="text-sm text-gray-500">
                                {data.permissions.length} selected
                            </div>

                        </div>

                        <div className="space-y-6">

                            {Object.entries(permissions).map(
                                ([group, items]) => {

                                    const allSelected = items.every(
                                        permission =>
                                            data.permissions.includes(
                                                permission.name
                                            )
                                    );

                                    return (
                                        <div
                                            key={group}
                                            className="
                                                border
                                                rounded-2xl
                                                overflow-hidden
                                            "
                                        >

                                            {/* Group Header */}
                                            <div
                                                className="
                                                    bg-gray-50
                                                    px-5
                                                    py-4
                                                    flex
                                                    items-center
                                                    justify-between
                                                    border-b
                                                "
                                            >

                                                <div>

                                                    <h3 className="font-semibold capitalize">
                                                        {group}
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        {
                                                            items.length
                                                        } permissions
                                                    </p>

                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleGroup(items)
                                                    }
                                                    className="
                                                        text-sm
                                                        text-indigo-600
                                                        font-medium
                                                    "
                                                >
                                                    {allSelected
                                                        ? 'Unselect All'
                                                        : 'Select All'}
                                                </button>

                                            </div>

                                            {/* Permissions */}
                                            <div
                                                className="
                                                    grid
                                                    grid-cols-1
                                                    md:grid-cols-2
                                                    lg:grid-cols-3
                                                    gap-4
                                                    p-5
                                                "
                                            >

                                                {items.map(permission => (

                                                    <label
                                                        key={permission.id}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            border
                                                            rounded-xl
                                                            p-3
                                                            hover:bg-gray-50
                                                            cursor-pointer
                                                            transition
                                                        "
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                data.permissions.includes(
                                                                    permission.name
                                                                )
                                                            }
                                                            onChange={() =>
                                                                togglePermission(
                                                                    permission.name
                                                                )
                                                            }
                                                            className="
                                                                rounded
                                                                border-gray-300
                                                                text-indigo-600
                                                                focus:ring-indigo-500
                                                            "
                                                        />

                                                        <div>

                                                            <div className="font-medium text-sm">
                                                                {permission.name}
                                                            </div>

                                                        </div>

                                                    </label>

                                                ))}

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">

                        <button
                            disabled={processing}
                            className="
                                bg-indigo-600
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                font-medium
                                hover:bg-indigo-700
                                transition
                            "
                        >
                            Update Role
                        </button>

                    </div>

                </form>

            </div>
        </>
    );
}

Edit.layout = page => (
    <DashboardLayout children={page} />
);