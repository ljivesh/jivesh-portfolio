"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="shell flex min-h-[70vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">Application error</p>
      <h1 className="my-6 max-w-230 text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.07em]">
        Something broke before this page reached production.
      </h1>
      <button className="button-primary mt-3 cursor-pointer" type="button" onClick={reset}>Try again</button>
    </main>
  );
}
