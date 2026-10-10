import type { Metadata, Viewport } from "next";
import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kauansantos.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Kauan Santos",
  description: "Front-end developer. A portfolio built by a crew of pixel minions, full of secrets.",
  openGraph: {
    title: "Kauan Santos",
    description: "A lane where minions build every block. Full of secrets.",
    url: SITE,
    siteName: "Kauan Santos",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Kauan Santos", description: "A lane where minions build every block. Full of secrets." },
  other: { psst: "the word is lanecrasher. say it in all chat." },
};

export const viewport: Viewport = { themeColor: "#0a0d10", width: "device-width", initialScale: 1 };

// Runs before paint: language, whether blocks should be built, and whether the intro was seen.
const boot = `(function(){var d=document.documentElement;try{if(localStorage.getItem('lane:lang')==='pt'){d.dataset.lang='pt';d.lang='pt-BR'}}catch(e){}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-build');
try{if(localStorage.getItem('lane:intro')==='1'&&!/[?&]intro/.test(location.search))d.dataset.intro='seen'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
