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
  // "/banner1.mp4",
  // "/banner2.mp4",
  "/banner3.mp4",
];

const bannerTexts = [
  // "/banner-text1.webp",
  // "/banner-text2.webp",
  "/banner-text3.webp",
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
          dynamicBullets: false,
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
              {banner.endsWith(".mp4") ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover banner-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`Banner video ${index + 1}`}
                >
                  <source src={banner} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover banner-image"
                  priority={index === 0}
                  sizes="100vw"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-start pl-12 pr-6 md:pl-20 md:pr-10 lg:pl-28 lg:pr-12">
                <div className="flex flex-col items-start gap-5 -translate-y-8 md:-translate-y-10 lg:-translate-y-12 pointer-events-none">
                  <Image
                    src={bannerTexts[index]}
                    alt={`Banner text ${index + 1}`}
                    width={700}
                    height={280}
                    className="h-auto w-[260px] sm:w-[360px] md:w-[460px] lg:w-[560px] max-h-[200px] max-w-full"
                    style={{ maxHeight: "200px", maxWidth: "100%" }}
                    priority={index === 0}
                  />
                  <div className="flex flex-wrap items-center gap-6 pointer-events-auto ml-4 md:ml-6 lg:ml-8">
                    <a
                      href="#"
                      className="highlight-button text-lg shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <div aria-hidden="true" />
                      <span>Sign Up</span>
                    </a>
                    <a
                      href="#"
                      className="text-lg font-semibold text-white underline underline-offset-4 decoration-white/80 transition-colors duration-200 hover:text-white/80"
                    >
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .banner-swiper .swiper-pagination {
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: min(320px, 70%);
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 4px 10px;
          border-radius: 999px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(6px);
        }

        .banner-swiper .swiper-pagination-bullet {
          flex: 0 0 33.333%;
          width: 33.333%;
          height: 6px;
          margin: 0 !important;
          border-radius: 999px;
          background: transparent !important;
          border: 1px solid transparent;
          opacity: 0 !important;
          box-shadow: none;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          background: transparent !important;
          border-color: rgba(255, 255, 255, 0.95);
          opacity: 1 !important;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        @keyframes highlight-button-border-anim {
          0%,
          10% {
            transform: translateX(-100%);
          }
          30%,
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes highlight-button-fill-anim {
          0%,
          10% {
            -webkit-mask-position: right;
            mask-position: right;
          }
          30% {
            -webkit-mask-position: left;
            mask-position: left;
          }
          100% {
            -webkit-mask-position: left;
            mask-position: left;
          }
        }

        .highlight-button {
          align-items: center;
          background-image: linear-gradient(270deg, #a541ff, #3fbbfe);
          border: 0;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          font-weight: 500;
          height: 2.75em;
          justify-content: center;
          min-width: 11.25em;
          outline: none;
          overflow: hidden;
          position: relative;
          -webkit-user-select: none;
          user-select: none;
        }

        .highlight-button:hover > div:before {
          background-image: linear-gradient(270deg, #a541ff, #3fbbfe);
          border-radius: 5px;
          bottom: 2px;
          content: "";
          left: 2px;
          -webkit-mask-image: none !important;
          mask-image: none !important;
          position: absolute;
          right: 2px;
          top: 2px;
        }

        .highlight-button:before {
          animation: highlight-button-border-anim 5s linear infinite;
          animation-delay: 2s;
          background-image: linear-gradient(
            270deg,
            transparent,
            hsla(0, 0%, 100%, 0.7),
            hsla(0, 0%, 100%, 0.7),
            transparent
          );
          bottom: 0;
          content: "";
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(-100%);
        }

        .highlight-button > span {
          color: #fff;
          padding: 0 1rem;
          position: relative;
        }

        .highlight-button > div {
          background-color: #111;
          border-radius: 7px;
          pointer-events: none;
        }

        .highlight-button > div,
        .highlight-button > div:before {
          bottom: 2px;
          content: "";
          left: 2px;
          position: absolute;
          right: 2px;
          top: 2px;
        }

        .highlight-button > div:before {
          animation: highlight-button-fill-anim 5s linear infinite;
          animation-delay: 2s;
          background-image: linear-gradient(270deg, #a541ff, #3fbbfe);
          border-radius: 5px;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            transparent,
            #fff,
            #fff,
            transparent,
            transparent
          );
          mask-image: linear-gradient(
            90deg,
            transparent,
            transparent,
            #fff,
            #fff,
            transparent,
            transparent
          );
          -webkit-mask-position: left;
          mask-position: left;
          -webkit-mask-size: 500% 100%;
          mask-size: 500% 100%;
        }
      `}</style>
    </section>
  );
}
