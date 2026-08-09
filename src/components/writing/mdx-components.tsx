import type { AnchorHTMLAttributes, ReactNode } from "react";

type HeadingProps = { children?: ReactNode };
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode };

function idFromChildren(children: ReactNode) { return String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"); }

export const mdxComponents = {
  h2: ({ children }: HeadingProps) => <h2 id={idFromChildren(children)}>{children}</h2>,
  h3: ({ children }: HeadingProps) => <h3 id={idFromChildren(children)}>{children}</h3>,
  a: ({ href, children }: LinkProps) => <a href={href} className="text-signal underline underline-offset-4">{children}</a>,
};
