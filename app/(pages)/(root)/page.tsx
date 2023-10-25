import LoginComponent from "@/components/pages/login/login-component";

export default function Home() {
  return (
    <section className="flex flex-1 w-full h-full">
      <article className="flex-[0.5] bg-main-400 flex justify-start items-center px-20 drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-start justify-center gap-4 text-5xl font-bold text-left text-white">
          <h1 className="drop-shadow-md">Knowles</h1>
          <h1 className="drop-shadow-md">Training</h1>
          <h1 className="drop-shadow-md">Institute</h1>
        </div>
      </article>
      <article className="relative flex items-center justify-center flex-1 py-8 shadow-inner">
        <div className="absolute rounded-full w-60 h-60 bg-main-400 blur-[150px] bottom-7 left-8" />
        <div className="absolute rounded-full w-40 h-40 bg-main-300 blur-[100px] top-7 right-8" />
        <div className="z-10 flex flex-col items-center justify-center flex-1 gap-4">
          <LoginComponent />
        </div>
      </article>
    </section>
  );
}
