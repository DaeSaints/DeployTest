import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
// import 'react-day-picker/dist/style.css';

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
      <head>
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </head>
      <body className={poppins.className}>
        <main className="flex flex-col w-full min-h-screen bg-slate-50">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
