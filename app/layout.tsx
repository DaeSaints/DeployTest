import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/global/Navbar";
import LeftSidebar from "@/components/global/LeftSidebar";
import RightSideBar from "@/components/global/RightSideBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Umonics LMS",
  description: "Created by interns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex flex-col w-full min-h-screen bg-slate-50">
          {children}
        </main>
      </body>
    </html>
  );
}
