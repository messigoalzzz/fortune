"use client";

import Image from "next/image";

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
}

export default function CardsGrid({ 
  title = "NEW", 
  cards, 
  columns = 4 
}: CardsGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-elevated)]">
      <div className="container-custom">
        {/* 标题 - 左上角对齐 */}
        {title && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide">
              {title}
            </h2>
          </div>
        )}

        {/* 卡片网格 */}
        <div 
          className="cards-grid gap-4 md:gap-6"
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
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg">
                  <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-110">
                    <Image
                      src={card.image}
                      alt={card.title || `Game ${card.id}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                    <p className="text-white text-sm md:text-base font-semibold text-center">
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
