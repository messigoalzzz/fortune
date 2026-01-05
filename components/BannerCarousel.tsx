"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// 导入 Swiper 样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideContent {
  title: string;
  subtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  gradient: string;
}

const slides: SlideContent[] = [
  {
    title: "欢迎来到全新体验",
    subtitle: "探索创新的在线娱乐平台，享受前所未有的游戏体验",
    primaryCTA: "立即开始",
    secondaryCTA: "了解更多",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "百万奖金等你赢取",
    subtitle: "参与每日活动，获得丰厚奖励和专属福利",
    primaryCTA: "查看活动",
    secondaryCTA: "规则说明",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "超过 1000+ 精彩游戏",
    subtitle: "从经典到创新，总有一款适合你",
    primaryCTA: "探索游戏",
    secondaryCTA: "热门推荐",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "安全可靠，公平透明",
    subtitle: "采用区块链技术，保证每一次游戏的公正性",
    primaryCTA: "验证公平性",
    secondaryCTA: "技术说明",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden"
              style={{
                background: slide.gradient,
              }}
            >
              {/* 抽象光效背景 */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* 内容 */}
              <div className="container-custom relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {slide.subtitle}
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <button className="btn btn-primary text-lg px-8 py-4 w-full md:w-auto">
                    {slide.primaryCTA}
                  </button>
                  <button className="btn btn-secondary text-lg px-8 py-4 w-full md:w-auto bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20">
                    {slide.secondaryCTA}
                  </button>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* 左上角装饰 */}
                <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 border-t-4 border-l-4 border-white/20 rounded-tl-3xl"></div>
                {/* 右下角装饰 */}
                <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 border-b-4 border-r-4 border-white/20 rounded-br-3xl"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

