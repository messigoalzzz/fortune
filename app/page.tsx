import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import GameCategoryNav from "@/components/GameCategoryNav";
import CardsGrid, { GameCard } from "@/components/CardsGrid";
import WinnersBoard from "@/components/WinnersBoard";
import AcceptCarousel from "@/components/AcceptCarousel";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WorthReading from "@/components/WorthReading";

const gameCards: GameCard[] = [
  {
    id: 1,
    image: "/new/icon1.webp",
    title: "Gods of Egypt",
    badge: "New",
  },
  {
    id: 2,
    image: "/new/icon2.webp",
    title: "Harvest Of Riches",
  },
  {
    id: 3,
    image: "/new/icon3.webp",
    title: "Castle Of Horror",
  },
  {
    id: 4,
    image: "/new/icon4.webp",
    title: "The Line X2",
  },
  {
    id: 5,
    image: "/new/icon5.webp",
    title: "Tropical",
  },
  {
    id: 6,
    image: "/new/icon6.webp",
    title: "Watermelon",
  },
  {
    id: 7,
    image: "/new/icon7.webp",
    title: "Greek Statue",
  },
  {
    id: 8,
    image: "/new/icon8.webp",
    title: "X Game",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BannerCarousel />
        <GameCategoryNav />
        
        <CardsGrid title="NEW" cards={gameCards} columns={4} />

        <WorthReading />

        <WinnersBoard />

        <AcceptCarousel />

        <About />
      </main>
      <Footer />
    </div>
  );
}

