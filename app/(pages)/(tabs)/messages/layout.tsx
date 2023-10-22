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
            <div className="flex flex-col w-[14rem] py-2 h-screen bg-slate-100 animate-pulse"></div>
          }
        >
          <MessageTabs />
        </Suspense>
        <Suspense
          fallback={
            <div className="flex flex-col w-[20rem] bg-slate-200 animate-pulse">
              <header className="w-full h-24 px-4 pt-4 pb-6 border-b border-white/30">
                <div className="relative w-full h-12 bg-white animate-pulse"></div>
              </header>
              <main className="flex flex-col flex-1 w-full h-full">
                <div className="flex items-center justify-center flex-1 w-full overflow-hidden">
                  <div className="w-full h-[36rem]">
                    <div className="flex flex-col w-full h-full">
                      {Array(5)
                        .fill([])
                        .map((_, index) => {
                          return (
                            <div
                              key={index}
                              className={`w-full px-4 py-5 transition bg-slate-100 animate-pulse group relative`}
                            >
                              <div className="flex items-center justify-between w-full gap-2">
                                <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse" />
                                <div className="flex flex-col items-center justify-center flex-1 w-full p-1 overflow-hidden text-white">
                                  <div className="flex items-center justify-between w-full h-12 bg-slate-200 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </main>
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
