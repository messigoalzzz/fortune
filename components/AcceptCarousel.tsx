"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// 导入 Swiper 样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Cryptocurrency {
  name: string;
  logo: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const cryptocurrencies: Cryptocurrency[] = [
  {
    name: "bitcoin",
    logo: "/accept/bitcoin.svg",
    description: "The original & leading cryptocurrency:",
    features: ["Easy online use, just like USD", "Highest market value", "Most widely accepted"],
  },
  {
    name: "litecoin",
    logo: "/accept/litecoin.svg",
    description: "A low-cost, fast digital currency:",
    features: ["Low fees", "Faster than Bitcoin", "Long-standing and trusted network"],
    recommended: true,
  },
  {
    name: "ethereum",
    logo: "/accept/ethereum.svg",
    description: "The second-largest cryptocurrency:",
    features: ["Second highest market value", "Technologically adaptive", "Quick transactions"],
  },
  {
    name: "monero",
    logo: "/accept/monero.svg",
    description: "The privacy-focused cryptocurrency:",
    features: ["Enhanced user privacy", "Untraceable transactions", "Fast payments"],
  },

  {
    name: "tether",
    logo: "/accept/tether.svg",
    description: "The most popular stablecoin:",
    features: ["Stability due to matching USD value", "Backed by Tether reserves", "Global, fast, and secure"],
  },
  {
    name: "usd-coin",
    logo: "/accept/usd-coin.svg",
    description: "An alternative stablecoin:",
    features: ["Pegged to USD value", "Globally recognized", "Fast & secure payments"],
  },
];

export default function AcceptCarousel() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-card)]">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            WE ACCEPT
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          className="accept-swiper"
        >
          {cryptocurrencies.map((crypto, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg">
                {/* Logo 和名称 */}
                <div className="flex flex-col items-center mb-6 relative">
                  <div className="w-20 h-20 md:w-[320px] md:h-[81px] mb-4 relative">
                    <Image
                      src={crypto.logo}
                      alt={crypto.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative">
                    {crypto.recommended && (
                      <span className="absolute -top-2 -right-16 md:-right-20 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded border-2 border-white uppercase">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                </div>

                {/* 描述 */}
                <p className="text-[var(--foreground-muted)] font-semibold text-sm md:text-base mb-4 text-left">
                  {crypto.description}
                </p>

                {/* 特性列表 */}
                <ul className="flex-1 space-y-2 mb-6">
                  {crypto.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-[var(--foreground)] text-sm md:text-base">
                      <span className="text-[var(--foreground-muted)] mr-2 mt-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn more 按钮 */}
                <button className="w-full px-4 py-3 border-2 border-[var(--foreground)] font-semibold rounded-lg text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 flex items-center justify-center gap-2 group">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    &gt;&gt;
                  </span>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

