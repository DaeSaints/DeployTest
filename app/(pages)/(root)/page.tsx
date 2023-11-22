import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function OptInPage() {
  return (
    <section className="flex flex-col w-full min-h-screen bg-white">
      <header className="backdrop-blur-sm">
        <nav className="bg-white/90">
          <div className="px-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center justify-between w-full">
                <div className="text-2xl font-[800] uppercase text-main-500">
                  Umonics <span className="text-dark-1">Method</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <article className="grid flex-1 w-full grid-cols-5 grid-rows-1 gap-16 px-20 pb-10">
        <div className="col-span-2 rounded-lg shadow-lg bg-main-500"></div>
        <div className="flex flex-col col-span-3">
          <span className="mb-2 text-lg font-medium text-left text-dark-1">
            Join now to get discounted prices just for you
          </span>
          <div className="max-w-2xl mb-8 text-6xl font-extrabold text-main-500">
            Start the Learning Process
          </div>
          <form className="flex flex-col max-w-sm gap-4" action="">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email Address"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Child's Date of Birth</Label>
              <Input type="date" id="dob" />
            </div>
            <div className="flex mt-6">
              <Link href={"/home"}>
                <Button className="px-12 py-8 text-2xl font-bold">
                  Join Now <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </form>
          <div className="grid flex-1 grid-cols-6 grid-rows-1 pt-10">
            <div className="col-span-3"></div>
            <div className="grid grid-cols-5 col-span-3 grid-rows-1 font-black text-white bg-black rounded-xl">
              <div className="flex flex-col items-center justify-center col-span-2">
                <span className="text-base font-bold uppercase">minutes</span>
                <div className="text-8xl">10</div>
              </div>
              <div className="flex items-center justify-center col-span-1 text-6xl">
                :
              </div>
              <div className="flex flex-col items-center justify-center col-span-2">
                <span className="text-base font-bold uppercase">seconds</span>
                <div className="text-8xl">00</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
