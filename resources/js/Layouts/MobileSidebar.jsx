import Sidebar from "./Sidebar";

export default function MobileSidebar({
    open,
    setOpen,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">

            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setOpen(false)}
            />

            <div className="relative w-64 h-full bg-white">
                <Sidebar />
            </div>
        </div>
    );
}