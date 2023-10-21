import MessagesDrawer from "@/components/pages/messages/messages-drawer";
import MessageTabs from "@/components/pages/messages/messages-tabs";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 w-full h-full">
      <div className="flex">
        <Suspense
          fallback={
            <div>
              Loading Message Tabs <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          }
        >
          <MessageTabs />
        </Suspense>
        <Suspense
          fallback={
            <div>
              Loading Message Drawer
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          }
        >
          <MessagesDrawer />
        </Suspense>
      </div>
      {children}
    </section>
  );
}
