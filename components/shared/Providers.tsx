
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Toaster richColors />
        </>
    )
}

export default Providers