"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export interface GameCard {
  id: string | number;
  image: string;
  title?: string;
  badge?: string; // 例如 "New" 标签
}

interface CardsGridProps {
  title?: string;
  cards: GameCard[];
  columns?: number; // 每行显示的卡片数量，默认4
  titleVariant?: "blue" | "pink" | "gold";
}

const TITLE_GRADIENTS = {
  blue: "linear-gradient(90deg,#8130fe,#5b77f9,#4790f9,#10c9fe)",
  pink: "linear-gradient(90deg,#ba3be9,#f546bf,#f85094,#ec6e1f)",
  gold: "linear-gradient(90deg,#ffbd03,#fcf701,#76c908)",
} as const;

function resolveTitleGradient(
  title?: string,
  variant?: keyof typeof TITLE_GRADIENTS
) {
  if (variant) {
    return TITLE_GRADIENTS[variant];
  }

  const normalizedTitle = title?.trim().toLowerCase();
  if (normalizedTitle === "popular") {
    return TITLE_GRADIENTS.blue;
  }
  if (normalizedTitle === "new") {
    return TITLE_GRADIENTS.pink;
  }

  return TITLE_GRADIENTS.gold;
}

function GameImage({
  imgUrl,
  alt,
}: {
  imgUrl: string;
  alt: string;
}) {
  const [src, setSrc] = useState<string | StaticImageData>(imgUrl);

  const handleError = () => {
    if (src !== "/popular/1.webp") {
      setSrc("/popular/1.webp");
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill
      onError={handleError}
      className="object-cover"
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    />
  );
}

export default function CardsGrid({
  title = "NEW",
  cards,
  columns = 4,
  titleVariant,
}: CardsGridProps) {
  const titleGradient = resolveTitleGradient(title, titleVariant);
  const normalizedTitle = title?.trim().toLowerCase();
  const backgroundColor = normalizedTitle === "new" ? "#161718" : undefined;
  return (
    <section 
      className="py-6 md:py-7"
      style={{
        backgroundColor: backgroundColor || "var(--background-elevated)",
      }}
    >
      <div className="container-custom">
        {/* 标题 - 左上角对齐 */}
        {title && (
          <div className="mb-8 md:mb-3">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide w-fit leading-normal text-transparent bg-clip-text"
              style={{
                backgroundImage: titleGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {title}
            </h2>
          </div>
        )}

        {/* 卡片网格 */}
        <div 
          className="cards-grid gap-4 md:gap-4"
          style={{
            '--grid-columns': columns,
          } as React.CSSProperties & { '--grid-columns': number }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative cursor-pointer flex flex-col"
            >
              {/* 白色描边层 - 绝对定位，不挤压内容 */}
              <div className="absolute inset-0 rounded-lg border-[6px] border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
              
              {/* 卡片容器 */}
              <div className="relative w-full rounded-lg transition-all duration-300 overflow-hidden flex flex-col">
                {/* 图片区域 - 上半部分，hover 时图片放大 */}
                <div className="relative w-full aspect-[1/1] overflow-hidden rounded-t-lg">
                  <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-110">
                    <GameImage
                      imgUrl={card.image}
                      alt={card.title || `Game ${card.id}`}
                    />
                  </div>

                  {/* Badge 标签（如果有） */}
                  {card.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg">
                        {card.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* 文字区域 - 下半部分，显示标题 */}
                {card.title && (
                  <div className="w-full px-3 py-3 bg-[#101010] rounded-b-lg">
                    <p className="text-white text-sm md:text-base xl:text-2xl font-semibold text-center">
                      {card.title}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
