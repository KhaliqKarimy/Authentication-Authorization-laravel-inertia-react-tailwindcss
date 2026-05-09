import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ user }) {

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
              <>
            <Head title="Edit Users" />
        <div className="max-w-2xl">

            <h1 className="text-2xl font-bold mb-6">
                Edit User
            </h1>
            <Link
            href={route('users.index')}
            >
                Back
            </Link>
            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-2xl shadow border space-y-4"
            >

                {/* Name */}
                <div>
                    <label className="text-sm text-gray-600">
                        Name
                    </label>

                    <input
                        className="w-full mt-1 border rounded-xl p-3"
                        value={data.name}
                        onChange={(e) =>
                            setData("name", e.target.value)
                        }
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm text-gray-600">
                        Email
                    </label>

                    <input
                        className="w-full mt-1 border rounded-xl p-3"
                        value={data.email}
                        onChange={(e) =>
                            setData("email", e.target.value)
                        }
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="text-sm text-gray-600">
                        Password
                    </label>

                    <input
                        type="password"
                        className="w-full mt-1 border rounded-xl p-3"
                        value={data.password}
                        onChange={(e) =>
                            setData("password", e.target.value)
                        }
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
                </div>

               

                <button
                    disabled={processing}
                    className="bg-indigo-600 text-black px-6 py-3 rounded-xl w-full"
                >
                    Update User
                </button>

            </form>
            </div>
            </>
    );
}

Edit.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);