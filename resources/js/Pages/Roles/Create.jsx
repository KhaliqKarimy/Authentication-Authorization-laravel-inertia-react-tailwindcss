import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({

        name: '',
        guard_name: 'web',
    });

    const submit = (e) => {

        e.preventDefault();

        post(route('roles.store'));
    };

    return (
        <>
            <Head title="Create Role" />
        <div>

            {/* Header */}
            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Create Role
                </h1>

                <p className="text-sm text-gray-500">
                    Create new system role
                </p>

            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    {/* Role Name */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

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
                            placeholder="Enter role name"
                            className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />

                        {errors.name && (

                            <div className="text-sm text-red-500 mt-1">
                                {errors.name}
                            </div>

                        )}

                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition disabled:opacity-50"
                        >

                            {processing
                                ? 'Creating...'
                                : 'Create Role'}

                        </button>

                    </div>

                </form>

            </div>

            </div>
        </>
    );
}

Create.layout = (page) => (
    <DashboardLayout children={page} />
);