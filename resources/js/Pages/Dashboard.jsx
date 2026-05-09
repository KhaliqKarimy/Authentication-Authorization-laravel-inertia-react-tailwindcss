import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

function Dashboard() {

    return (
        <>
            <Head title='Dashboard' />

        <div>

            <h1 className="text-2xl font-bold text-gray-800">
                Dashboard
            </h1>

        </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <DashboardLayout children={page} />
);

export default Dashboard;