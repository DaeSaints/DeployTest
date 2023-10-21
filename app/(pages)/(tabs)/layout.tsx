import LeftSidebar from "@/components/global/LeftSidebar";
import MiniChat from "@/components/pages/messages/minichat/minichat-main";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-1 w-full h-full">
      <LeftSidebar />
      <article className="flex items-center justify-center flex-[20] bg-slate-100">
        {children}
      </article>
      <MiniChat />
    </section>
  );
}
