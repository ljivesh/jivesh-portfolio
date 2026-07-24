"use client";

export function PrintButton() {
  return (
    <button className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-signal px-5 text-sm font-semibold text-[#06101a] transition hover:-translate-y-0.5 hover:bg-signal-bright" type="button" onClick={() => window.print()}>
      Print or save as PDF
    </button>
  );
}
