import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";

export default function DashboardLayout({
    children,
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <Sidebar />

            <MobileSidebar
                open={open}
                setOpen={setOpen}
            />

            <div className="flex-1 flex flex-col">

                <Topbar
                    toggleSidebar={() => setOpen(true)}
                />

                <main className="p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}