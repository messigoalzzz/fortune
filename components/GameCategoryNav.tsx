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
  const [activeCategory, setActiveCategory] = useState("Slot");

  const categories: CategoryItem[] = [
    {
      id: "Slot",
      label: "Slot",
      viewBox: "0 0 0 0",
      activeViewBox: "0 0 0 0",
      color: "white",
    },
    {
      id: "Lotto",
      label: "Lotto",
      viewBox: "0 0 0 0",
      activeViewBox: "0 0 0 0",
      color: "white",
    },
    {
      id: "baccarat",
      label: "Baccarat",
      viewBox: "0 0 0 0",
      activeViewBox: "0 0 0 0",
      color: "white",
    },
    {
      id: "fishing",
      label: "Fishing",
      viewBox: "0 0 0 0",
      activeViewBox: "0 0 0 0",
      color: "white",
    },
    {
      id: "fastNumbers",
      label: "Fast Numbers",
      viewBox: "0 0 0 0",
      activeViewBox: "0 0 0 0",
      color: "white",
    },
  ];

  return (
    <section className="relative w-full md:-mb-36 mx-auto py-3 md:py-4 overflow-hidden z-10 md:-translate-y-48">
      <div className="absolute inset-0 bg-black/60">
      </div>

      {/* 内容容器 */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 分类导航 */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-4 lg:gap-10">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const imagePath = isActive 
                ? `/category/${category.id}-active.png` 
                : `/category/${category.id}.png`;
              
              // 根据图片实际尺寸设置：大部分是 140x140，fishing-active 是 140x140
              const imageWidth = '4.5em';
              const imageHeight = '4.5em'; // fishing-active 高度更大
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex flex-col items-center justify-start transition-all duration-200 hover:scale-110"
                  style={{
                    // width: imageWidth,
                    height: 'auto',
                  }}
                >
                  <Image
                    src={imagePath}
                    alt={category.label}
                    width={140}
                    height={140}
                    className="object-cover size-[70px]"
                  />
                  <span
                    className={`text-xs md:text-sm text-nowrap font-medium transition-colors duration-200 mt-2 ${
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

