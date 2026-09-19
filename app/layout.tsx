import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Tailrcv - Tailor Your Resume to Any Job Offer",
  description: "AI adapts your resume to any job offer. Fill your profile once, generate tailored resumes instantly",
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
