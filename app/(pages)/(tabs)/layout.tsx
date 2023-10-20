import LeftSidebar from "@/components/global/LeftSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 w-full h-full">
      <LeftSidebar />
      <article className="flex items-center justify-center flex-[20] bg-slate-100">
        {children}
      </article>
    </section>
  );
}
