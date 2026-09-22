import { cn } from "@/lib/utils";

function Loader({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <div
        className={`loader`}
        
      ></div>
    </div>
  );
}

export default Loader;
