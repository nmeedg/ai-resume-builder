
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Toaster position="top-center" />
        </>
    )
}

export default Providers