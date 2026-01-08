"use client";

import Image from "next/image";

interface Winner {
  username: string;
  amount: string;
  gameName: string;
  timeAgo: string;
  gameIcon?: string;
}

interface WinnersSection {
  title: string;
  titleColor: "purple" | "red";
  winners: Winner[];
}

const winnersData: WinnersSection[] = [
  {
    title: "LATEST WINNERS",
    titleColor: "purple",
    winners: [
      {
        username: "MEE***",
        amount: "$140.40",
        gameName: "Dragons' Lair",
        timeAgo: "won a minute ago",
        gameIcon: "/game-icons/dragons-lair.webp",
      },
      {
        username: "STU***1",
        amount: "$7.50",
        gameName: "Spheres",
        timeAgo: "won a minute ago",
        gameIcon: "/game-icons/spheres.webp",
      },
      {
        username: "JUS***8",
        amount: "$23.60",
        gameName: "Gangster Affair",
        timeAgo: "won a minute ago",
        gameIcon: "/game-icons/gangster-affair.webp",
      },
      {
        username: "TRI***",
        amount: "$5.00",
        gameName: "Secrets of Atlantis",
        timeAgo: "won a minute ago",
        gameIcon: "/game-icons/secrets-of-atlantis.webp",
      },
      {
        username: "HH1***",
        amount: "$8.25",
        gameName: "Coin Rush",
        timeAgo: "won a minute ago",
        gameIcon: "/game-icons/coin-rush.webp",
      },
    ],
  },
  {
    title: "TOP WINNERS",
    titleColor: "purple",
    winners: [
      {
        username: "BRA***5",
        amount: "$10,000.00",
        gameName: "Jackpot Trigger",
        timeAgo: "won a day ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "JUS***8",
        amount: "$10,020.00",
        gameName: "Jackpot Trigger",
        timeAgo: "won 2 days ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "GNI***",
        amount: "$10,000.00",
        gameName: "Jackpot Trigger",
        timeAgo: "won 11 days ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "KLE***I",
        amount: "$10,110.00",
        gameName: "Jackpot Trigger",
        timeAgo: "won 12 days ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "NIX***G",
        amount: "$10,400.00",
        gameName: "Pyramid Plunder High Limit",
        timeAgo: "won 25 days ago",
        gameIcon: "/game-icons/pyramid-plunder-high-limit.webp",
      },
    ],
  },
  {
    title: "JACKPOT TRIGGER WINS",
    titleColor: "red",
    winners: [
      {
        username: "QUE***E",
        amount: "$1,000,000",
        gameName: "Jackpot Trigger",
        timeAgo: "won on May 11 2024",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "TEC***Z",
        amount: "$100,000",
        gameName: "Jackpot Trigger",
        timeAgo: "won 30 days ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "BRA***5",
        amount: "$10,000",
        gameName: "Jackpot Trigger",
        timeAgo: "won a day ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "ROB***",
        amount: "$1,000",
        gameName: "Jackpot Trigger",
        timeAgo: "won a day ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
      {
        username: "ZAP***",
        amount: "$100",
        gameName: "Jackpot Trigger",
        timeAgo: "won 9 minutes ago",
        gameIcon: "/game-icons/jackpot-trigger.webp",
      },
    ],
  },
];

export default function WinnersBoard() {
  return (
    <section className="py-8 md:py-12 bg-[#dadbdc]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {winnersData.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className=""
            >
              {/* 标题 */}
              <h3
                className={`text-xl md:text-2xl font-bold mb-6 bg-clip-text text-transparent ${
                  section.title === "LATEST WINNERS"
                    ? "bg-gradient-to-r from-[#fe00fb] via-[#3752f7] to-[#fe00fb]"
                    : section.title === "TOP WINNERS"
                    ? "bg-gradient-to-r from-[#a837f7] via-[#fd46ba] to-[#eb710f]"
                    : "bg-gradient-to-r from-[#c40404] via-[#f77637] to-[#c40404]"
                }`}
              >
                {section.title}
              </h3>

              {/* 获奖者列表 */}
              <div className="space-y-4">
                {section.winners.map((winner, winnerIndex) => {
                  const isJackpotSection = section.title === "JACKPOT TRIGGER WINS";
                  
                  return (
                    <div
                      key={winnerIndex}
                      className="flex items-start gap-3 p-0 bg-[#e9eaed] rounded-lg last:mb-0"
                    >
                      {/* 游戏图标 - 固定大小，深色背景 */}
                      <div className="size-[74px] flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image
                            src={winner.gameIcon||'/game-icons/coin-rush.webp'}
                            alt={winner.gameName}
                            width={74}
                            height={74}
                            className="w-full h-full object-cover"
                          />
                      </div>

                      {/* 获奖信息 */}
                      <div className="flex-1 min-w-0">
                        {isJackpotSection ? (
                          // JACKPOT TRIGGER WINS 特殊布局：金额更突出
                          <div className="py-2 flex flex-col justify-between">
                              <span className="text-orange-500 font-bold text-xl md:text-3xl">
                                {winner.amount}
                              </span>
                            <p className="text-gray-600 text-sm md:text-base">
                            {winner.username} {winner.timeAgo}
                            </p>
                          </div>
                        ) : (
                          // LATEST WINNERS 和 TOP WINNERS 的布局 - 按照截图样式
                          <div className="py-2 flex flex-col justify-between">
                            <p className="text-gray-700 text-sm md:text-base md:leading-5">
                              {winner.username} {winner.timeAgo}
                            </p>
                            <p className="text-orange-500 font-bold text-sm md:text-base md:leading-5">
                              {winner.amount}
                            </p>
                            <p className="text-blue-500 text-sm md:text-base md:leading-5">
                              in {winner.gameName}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

