import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="shell flex min-h-[70vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">404 / Route not found</p>
      <h1 className="my-6 max-w-230 text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.07em]">This system path doesn&apos;t exist.</h1>
      <Link className="button-primary mt-3" href="/">Back home</Link>
    </main>
  );
}
