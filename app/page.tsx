import { Hero } from "@/components/Hero";
import { Shop } from "@/components/Shop";
import { HeroCard } from "@/components/HeroCard";
import { Matches } from "@/components/Matches";
import { Season } from "@/components/Season";
import { Contact } from "@/components/Contact";
import { Footer, Toast } from "@/components/Footer";
import { Companion } from "@/components/Companion";
import { Minimap } from "@/components/Minimap";
import { GameEvents } from "@/components/GameEvents";
import { PROFILE } from "@/lib/content";
import { getSeason } from "@/lib/github";

export const revalidate = 21600;

export default async function Home() {
  const season = await getSeason(PROFILE.github);
  return (
    <>
      <Hero />
      <main>
        <Shop />
        <HeroCard />
        <Matches />
        <Season initial={season} />
        <Contact />
      </main>
      <Footer />
      <Companion />
      <Minimap />
      <Toast />
      <GameEvents />
    </>
  );
}
