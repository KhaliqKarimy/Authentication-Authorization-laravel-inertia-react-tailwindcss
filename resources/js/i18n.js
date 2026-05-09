import React from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "@lang/en.json";
import fa from "@lang/fa.json";
import pa from "@lang/pa.json";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: en,
            },
            fa: {
                translation: fa,
            },
            pa: {
                translation: pa,
            },
        },
        lng: localStorage.getItem("lang") || "en", // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });
export default i18n;
