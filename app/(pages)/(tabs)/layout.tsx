import Navbar from "@/components/global/Navbar";
import LeftSidebar from "@/components/global/LeftSidebar";
import RightSideBar from "@/components/global/RightSideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <section className="flex flex-1 w-full h-full">
        <LeftSidebar />
        <article className="flex-[4] flex justify-center items-center bg-slate-100 h-full">
          {children}
        </article>
        <RightSideBar />
      </section>
    </main>
  );
}
