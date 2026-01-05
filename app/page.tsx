import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CardsGrid from "@/components/CardsGrid";
import WinnersBoard from "@/components/WinnersBoard";
import AcceptCarousel from "@/components/AcceptCarousel";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WorthReading from "@/components/WorthReading";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BannerCarousel />
        <CardsGrid />

        <WorthReading />

        <WinnersBoard />

        <AcceptCarousel />

        <About />
      </main>
      <Footer />
    </div>
  );
}

