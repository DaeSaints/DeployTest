import SideBarMessages from "@/components/pages/messages/messages-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 w-full h-full">
      <SideBarMessages />
      {children}
    </section>
  );
}
