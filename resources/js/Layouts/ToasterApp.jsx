import { Toaster } from "react-hot-toast";



export default function ToasterApp({ children }) {
    return (
        <>
            <Toaster position="top-right" />
            {children}
        </>
    )
}