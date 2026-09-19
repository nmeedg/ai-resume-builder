import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "TailrCV",
  description: "TailrCV",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
