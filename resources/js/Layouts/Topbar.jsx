// import { Menu,  ChevronDown } from "lucide-react";

// import {
//     Link,
//     usePage,
// } from "@inertiajs/react";

// import { useState } from "react";

// export default function Topbar({
//     toggleSidebar,
// }) {
//     const { auth } = usePage().props;

//     const [open, setOpen] = useState(false);

//     return (
//         <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">

//             {/* Left */}
//             <div className="flex items-center gap-3">

//                 <button
//                     onClick={toggleSidebar}
//                     className="md:hidden"
//                 >
//                     <Menu size={24} />
//                 </button>

//                 <h2 className="font-semibold text-gray-800">
//                     Dashboard
//                 </h2>
//             </div>

//             {/* Right */}
//             <div className="flex items-center gap-4">

            

//                 {/* Profile Dropdown */}
//                 <div className="relative">

//                     <button
//                         onClick={() => setOpen(!open)}
//                         className="flex items-center gap-2"
//                     >
//                         <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">

//                             {auth.user.name.charAt(0)}

//                         </div>

//                         <div className="hidden md:block text-left">

//                             <div className="text-sm font-medium">
//                                 {auth.user.name}
//                             </div>

                           
//                         </div>

//                         <ChevronDown
//                             size={18}
//                             className={`transition-transform duration-200 ${open ? "rotate-180" : ""
//                                 }`}
//                         />
//                     </button>

//                     {/* Dropdown */}
//                     {open && (
//                         <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

//                             <Link
//                                 href="/profile"
//                                 className="block px-4 py-3 hover:bg-gray-100"
//                             >
//                                 Profile
//                             </Link>

//                             <Link
//                                 href="/logout"
//                                 method="post"
//                                 as="button"
//                                 className="block w-full text-left px-4 py-3 hover:bg-gray-100"
//                             >
//                                 Logout
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// }

import { Menu, ChevronDown, Languages } from "lucide-react";
import {
    Link,
    usePage,
} from "@inertiajs/react";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "@/i18n";

export default function Topbar({ toggleSidebar }) {

    const { auth } = usePage().props;

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    const languages = [
        {
            code: "en",
            name: "English",
            flag: "🇺🇸",
        },
        {
            code: "fa",
            name: "فارسی",
            flag: "🇦🇫",
        },
        {
            code: "pa",
            name: "پښتو",
            flag: "🇦🇫",
        },
    ];

    const currentLang = localStorage.getItem("lang") || "en";

    const changeLanguage = (lang) => {

        localStorage.setItem("lang", lang);

        i18n.changeLanguage(lang);

        window.location.href = `?lang=${lang}`;
    };

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">

            {/* Left */}
            <div className="flex items-center gap-3">

                <button
                    onClick={toggleSidebar}
                    className="md:hidden"
                >
                    <Menu size={24} />
                </button>

                <h2 className="font-semibold text-gray-800">
                    {t('Dashboard')}
                </h2>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Language Dropdown */}
                <div className="relative">

                    <button
                        onClick={() => setLangOpen(!langOpen)}
                        className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                    >
                        <Languages size={18} />

                        <span className="hidden md:block text-sm font-medium">
                            {
                                languages.find(
                                    (l) => l.code === currentLang
                                )?.flag
                            }
                        </span>

                        <ChevronDown
                            size={16}
                            className={`transition-transform ${langOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {langOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() =>
                                        changeLanguage(lang.code)
                                    }
                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left
                                        
                                        ${currentLang === lang.code
                                            ? "bg-indigo-50 text-indigo-600"
                                            : ""
                                        }
                                    `}
                                >
                                    <span>{lang.flag}</span>

                                    <span className="text-sm">
                                        {lang.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">

                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2"
                    >
                        <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">

                            {auth.user.name.charAt(0)}

                        </div>

                        <div className="hidden md:block text-left">

                            <div className="text-sm font-medium">
                                {auth.user.name}
                            </div>
                        </div>

                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

                            <Link
                                href="/profile"
                                className="block px-4 py-3 hover:bg-gray-100"
                            >
                                Profile
                            </Link>

                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}