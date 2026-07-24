"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <title>Application error | Jivesh Lakhani</title>
        <main className="mx-auto flex min-h-screen w-[min(calc(100%-2rem),73.75rem)] flex-col items-start justify-center">
          <p className="font-mono text-xs tracking-[0.08em] text-signal uppercase">Application error</p>
          <h1 className="my-5 max-w-220 text-[clamp(3rem,8vw,6.25rem)] leading-none font-medium tracking-[-0.07em]">
            The portfolio couldn’t load correctly.
          </h1>
          <button
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-signal px-5 text-sm font-semibold text-paper"
            type="button"
            onClick={() => unstable_retry()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
