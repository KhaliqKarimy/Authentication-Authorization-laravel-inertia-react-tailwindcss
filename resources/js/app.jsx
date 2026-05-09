// import '../css/app.css';
// import './bootstrap';

// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createRoot } from 'react-dom/client';
// import ToasterApp from './Layouts/ToasterApp';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) =>
//         resolvePageComponent(
//             `./Pages/${name}.jsx`,
//             import.meta.glob('./Pages/**/*.jsx'),
//         ),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(
//             <ToasterApp>
//                 <App {...props} />
//             </ToasterApp>
//         );
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });
import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import ToasterApp from "./Layouts/ToasterApp";
import i18n from "./i18n";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// RTL Languages
const rtlLanguages = ["fa", "pa"];

createInertiaApp({

    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),

    setup({ el, App, props }) {

        // current language
        const lang =
            localStorage.getItem("lang") || "en";

        // set i18n language
        i18n.changeLanguage(lang);

        // set html lang
        document.documentElement.lang = lang;

        // set direction
        document.documentElement.dir =
            rtlLanguages.includes(lang)
                ? "rtl"
                : "ltr";

        // optional class for styling
        document.documentElement.classList.remove(
            "rtl",
            "ltr"
        );

        document.documentElement.classList.add(
            rtlLanguages.includes(lang)
                ? "rtl"
                : "ltr"
        );

        const root = createRoot(el);

        root.render(
            <ToasterApp>
                <App {...props} />
            </ToasterApp>
        );
    },

    progress: {
        color: "#4B5563",
    },
});