import { PageHero } from "@/components/page-hero";
import { GuestbookClient } from "@/components/guestbook/guestbook-client";

export const metadata = { title: "Guestbook", description: "Leave a moderated message in Jivesh Lakhani's portfolio guestbook." };

export default function GuestbookPage() { return <main id="main-content"><PageHero kicker="05 / Public database" title="Guestbook" intro="Leave a message. Once approved, it becomes part of the portfolio's public network log." /><section className="shell section-pad"><GuestbookClient /></section></main>; }
