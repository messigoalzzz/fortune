import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import GameCategoryNav from "@/components/GameCategoryNav";
import WinnersBoard from "@/components/WinnersBoard";
import AcceptCarousel from "@/components/AcceptCarousel";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WorthReading from "@/components/WorthReading";
import GameCardsSection from "@/components/GameCardsSection";

// Legacy mock data (kept for reference; not used in rendering).
/*
const popularCards: GameCard[] = [
  { id: 1, image: "/popular/1.webp", title: "Leprechaun Luck" },
  { id: 2, image: "/popular/2.webp", title: "Hot Hit" },
  { id: 3, image: "/popular/3.webp", title: "Gods of Egypt" },
  { id: 4, image: "/popular/4.webp", title: "Coin Rush" },
  { id: 5, image: "/popular/5.webp", title: "Twin Wins" },
  { id: 6, image: "/popular/6.webp", title: "Greek Opulence" },
  { id: 7, image: "/popular/7.webp", title: "Double Vegas Twin" },
  { id: 8, image: "/popular/8.webp", title: "Tropical Temptation" },
];

const gameCards: GameCard[] = [
  { id: 1, image: "/new/icon1.webp", title: "Arcane Treasures", badge: "New" },
  { id: 2, image: "/new/icon2.webp", title: "Aztecs Adventure" },
  { id: 3, image: "/new/icon3.webp", title: "BANK BUSTRIX" },
  { id: 4, image: "/new/icon4.webp", title: "Bar Bonanza" },
  { id: 5, image: "/new/icon5.webp", title: "Bewitched" },
  { id: 6, image: "/new/icon6.webp", title: "Big Heads" },
  { id: 7, image: "/new/icon7.webp", title: "Blazing Wild" },
  { id: 8, image: "/new/icon8.webp", title: "X Rush" },
];

const featuredCards: GameCard[] = [
  { id: 1, image: "/featured/1.webp", title: "Amazonia" },
  { id: 2, image: "/featured/2.webp", title: "Deuces Wild Multi Hand" },
  { id: 3, image: "/featured/3.webp", title: "Amore High Limit" },
  { id: 4, image: "/featured/4.webp", title: "The Line X2" },
  { id: 5, image: "/featured/5.webp", title: "Gods of Egypt" },
  { id: 6, image: "/featured/6.webp", title: "Harvest Of Riches" },
  { id: 7, image: "/featured/7.webp", title: "Jackpot Trigger" },
  { id: 8, image: "/featured/8.webp", title: "Castle Of Horror" },
];
*/

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BannerCarousel />
        <GameCategoryNav />

        <GameCardsSection />

        <WorthReading />

        <WinnersBoard />

        <AcceptCarousel />

        <About />
      </main>
      <Footer />
    </div>
  );
}
