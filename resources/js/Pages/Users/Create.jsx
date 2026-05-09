import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create() {

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                toast.success(t('User created successfully.'));
                reset();
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => toast.error(error));
            }
        });
    };

    return (
        <>
        <div className="m-auto w-full">
           <Head title="Create User" />
            <h1 className="text-2xl font-bold mb-6">
                Create User
            </h1>

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

                {/* Button */}
                <button
                    disabled={processing}
                    className="bg-indigo-600 text-black border shadow-sm mt-2  px-6 py-3 rounded-xl w-full hover:bg-indigo-700 transition"
                >
                    {processing ? "Saving..." : "Create User"}
                </button>

            </form>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);