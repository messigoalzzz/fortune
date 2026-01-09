"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

// 导入 Swiper 样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const banners = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.jpg",
];

export default function BannerCarousel() {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="banner-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
              <Image
                src={banner}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover banner-image"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

