import usePermission from "@/Hooks/UsePermission";
import { Link, usePage } from "@inertiajs/react";

import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    ShoppingCart,
    Receipt,
} from "lucide-react";


const menus = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "Users",
        href: "/users",
        icon: Users,
        permission: "users.view",
    },

    {
        title: "Roles",
        href: "/roles",
        icon: ShieldCheck,
        permission: "roles.view",
    },

   
];

export default function Sidebar() {

    const { url } = usePage();

    const { can, isSuperAdmin } =
        usePermission();

    /**
     * Filter menus by permission
     */
    const visibleMenus = menus.filter(
        (menu) => {

            /**
             * Public menu
             */
            if (!menu.permission) {
                return true;
            }

            /**
             * Super admin bypass
             */
            if (isSuperAdmin) {
                return true;
            }

            return can(menu.permission);
        }
    );

    return (

        <aside className="
            w-64 bg-white border-r border-gray-200
            flex flex-col h-screen
        ">

            {/* Logo */}
            <div className="
                h-16 flex items-center px-6 border-b
            ">

                <h1 className="
                    text-xl font-bold text-indigo-600
                ">
                    ERP System
                </h1>

            </div>

            {/* Navigation */}
            <nav className="
                flex-1 p-4 space-y-2 overflow-y-auto
            ">

                {visibleMenus.map((menu) => {

                    const Icon = menu.icon;

                    const active =
                        url.startsWith(menu.href);

                    return (

                        <Link
                            key={menu.title}
                            href={menu.href}
                            className={`
                                group
                                flex items-center gap-3
                                px-4 py-3 rounded-xl
                                transition-all duration-200

                                ${
                                    active
                                        ? `
                                            bg-indigo-50
                                            text-indigo-600
                                            shadow-sm
                                          `
                                        : `
                                            text-gray-600
                                            hover:bg-gray-100
                                            hover:text-gray-900
                                          `
                                }
                            `}
                        >

                            <Icon
                                size={20}
                                className="
                                    shrink-0
                                "
                            />

                            <span className="font-medium">
                                {menu.title}
                            </span>

                        </Link>

                    );
                })}

            </nav>

        </aside>
    );
}