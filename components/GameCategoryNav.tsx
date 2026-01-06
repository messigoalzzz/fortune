"use client";

import { useState } from "react";
import Image from "next/image";

interface CategoryItem {
  id: string;
  label: string;
  viewBox: string; // 普通状态的 viewBox
  activeViewBox: string; // 激活状态的 viewBox
  color?: "blue" | "white";
}

export default function GameCategoryNav() {
  const [activeCategory, setActiveCategory] = useState("top-picks");

  const categories: CategoryItem[] = [
    {
      id: "top-picks",
      label: "Top Picks",
      viewBox: "0 420 110 70",
      activeViewBox: "120 420 110 70",
      color: "blue",
    },
    {
      id: "slots",
      label: "Slots",
      viewBox: "0 350 110 70",
      activeViewBox: "120 350 110 70",
      color: "white",
    },
    {
      id: "mega-matrix",
      label: "Mega Matrix",
      viewBox: "0 210 110 70",
      activeViewBox: "120 210 110 70",
      color: "white",
    },
    {
      id: "video-poker-and-keno",
      label: "Poker & Keno",
      viewBox: "0 280 110 70",
      activeViewBox: "120 280 110 70",
      color: "white",
    },
    {
      id: "high-limit",
      label: "High Limit",
      viewBox: "0 70 110 70",
      activeViewBox: "120 70 110 70",
      color: "white",
    },
    {
      id: "jackpot-slot",
      label: "Jackpot Slot",
      viewBox: "0 140 110 70",
      activeViewBox: "120 140 110 70",
      color: "white",
    },
  ];

  return (
    <section className="relative w-full max-w-[1280px] mx-auto py-8 md:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-black/60">
      </div>

      {/* 内容容器 */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 分类导航 */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-4 lg:gap-10">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const iconId = isActive ? `${category.id}-on` : category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex flex-col items-center justify-end transition-all duration-200 hover:scale-110"
                  style={{
                    width: '6.5em',
                    height: '6.5em',
                    backgroundImage: `url(/game.svg#${iconId})`,
                    backgroundSize: '6.5em',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <span
                    className={`text-xs md:text-sm font-medium transition-colors duration-200 mb-1 ${
                      isActive
                        ? "text-[#59caff]"
                        : "text-white"
                    }`}
                  >
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 搜索框 */}
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <input
              type="text"
              placeholder="Search game"
              className="w-full pr-10 focus:outline-none"
              style={{
                background: '#252627',
                border: 0,
                borderRadius: '0.3125em',
                color: '#dadbdc',
                padding: '0.25em 1em',
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-[#dadbdc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}

