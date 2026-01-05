"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

// 导入 Swiper 样式
import "swiper/css";
import "swiper/css/pagination";

interface Article {
  id: number;
  thumbnail: string;
  thumbnailOverlay?: string;
  title: string;
  description: string;
  readMoreLink: string;
}

const articles: Article[] = [
  {
    id: 1,
    thumbnail: "/worth-reading/luxury-car.webp",
    thumbnailOverlay: "Luxury Lifestyle 2",
    title: "Top 3 Ultra-Luxury Cars to Buy After a Jackpot Win",
    description: "You've said 'wen Lambo' for years. Now it's time to ask 'which Lambo?' Here are the 2025 flex-mobiles you can actually buy after you hit the jackpot.",
    readMoreLink: "#",
  },
  {
    id: 2,
    thumbnail: "/worth-reading/jeremy-tan.webp",
    thumbnailOverlay: "Blindfolded. Still Cheating!",
    title: "Jeremy Tan: Can You Cheat Casino Wash Blindfolded?",
    description: "Jeremy takes things to a whole new level by performing a casino wash blindfolded. He can't possibly cheat without even seeing the cards, right?",
    readMoreLink: "#",
  },
  {
    id: 3,
    thumbnail: "/worth-reading/winter-slots.webp",
    thumbnailOverlay: "5 SLOTS FOR WINTER 2025-26",
    title: "5 Slots to Play in Winter 2025-2026 at CryptoSlots",
    description: "Cold weather brings people together. Grab a hot drink and enjoy your guide to five CryptoSlots games that capture the season's frosty highs and illuminated festivities.",
    readMoreLink: "#",
  },
  {
    id: 4,
    thumbnail: "/worth-reading/luxury-car.webp",
    thumbnailOverlay: "Luxury Lifestyle 2",
    title: "Top 3 Ultra-Luxury Cars to Buy After a Jackpot Win",
    description: "You've said 'wen Lambo' for years. Now it's time to ask 'which Lambo?' Here are the 2025 flex-mobiles you can actually buy after you hit the jackpot.",
    readMoreLink: "#",
  },
  {
    id: 5,
    thumbnail: "/worth-reading/jeremy-tan.webp",
    thumbnailOverlay: "Blindfolded. Still Cheating!",
    title: "Jeremy Tan: Can You Cheat Casino Wash Blindfolded?",
    description: "Jeremy takes things to a whole new level by performing a casino wash blindfolded. He can't possibly cheat without even seeing the cards, right?",
    readMoreLink: "#",
  },
  {
    id: 6,
    thumbnail: "/worth-reading/winter-slots.webp",
    thumbnailOverlay: "5 SLOTS FOR WINTER 2025-26",
    title: "5 Slots to Play in Winter 2025-2026 at CryptoSlots",
    description: "Cold weather brings people together. Grab a hot drink and enjoy your guide to five CryptoSlots games that capture the season's frosty highs and illuminated festivities.",
    readMoreLink: "#",
  },
];

export default function WorthReading() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-elevated)]">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            WORTH READING
          </h2>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
            bulletClass: "swiper-pagination-bullet-worth-reading",
            bulletActiveClass: "swiper-pagination-bullet-active-worth-reading",
          }}
          loop={true}
          className="worth-reading-swiper"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <article className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg group">
                {/* 缩略图 */}
                <div className="relative w-full overflow-hidden">
                  <div className="max-w-full h-auto flex items-center justify-center">
                    <Image src={article.thumbnail} alt={article.title} width={1000} height={1000} />
                  </div>
                </div>

                {/* 内容 */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* 标题 */}
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-[var(--foreground-muted)] text-sm md:text-base mb-6 flex-1 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Read More 链接 */}
                  <a
                    href={article.readMoreLink}
                    className="text-[var(--secondary)] font-medium hover:text-[var(--secondary-hover)] transition-colors duration-200 inline-flex items-center gap-2 group/link"
                  >
                    <span>Read More</span>
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .worth-reading-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
          bottom: 0;
        }

        .swiper-pagination-bullet-worth-reading {
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          border-radius: 50% !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active-worth-reading {
          background: var(--primary) !important;
          width: 24px !important;
          border-radius: 5px !important;
          box-shadow: 0 0 10px var(--primary) !important;
        }
      `}</style>
    </section>
  );
}

