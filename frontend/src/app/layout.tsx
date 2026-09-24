import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { InlineScript } from "@/components/InlineScript";
import "./globals.css";

const themeInit = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban",
  description: "A simple project board",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeInit} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
