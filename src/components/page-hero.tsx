export function PageHero({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return <header className="page-hero scanlines"><div className="shell relative z-10"><p className="page-kicker">{kicker}</p><h1 className="page-title">{title}</h1><p className="page-intro">{intro}</p></div></header>;
}
