export default function CardsGrid() {
  const cards = [
    {
      title: "幸运转盘",
      category: "热门游戏",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      players: "1.2K",
    },
    {
      title: "黄金矿工",
      category: "经典老虎机",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      players: "856",
    },
    {
      title: "水果派对",
      category: "轻松休闲",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      players: "2.3K",
    },
    {
      title: "龙虎大战",
      category: "真人娱乐",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      players: "654",
    },
    {
      title: "星际探险",
      category: "冒险游戏",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      players: "923",
    },
    {
      title: "宝石消除",
      category: "益智游戏",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      players: "1.5K",
    },
    {
      title: "疯狂赛车",
      category: "竞速游戏",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      players: "789",
    },
    {
      title: "梦幻森林",
      category: "奇幻冒险",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      players: "1.1K",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--background-elevated)]">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            热门游戏推荐
          </h2>
          <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
            精选最受欢迎的游戏，每一款都经过精心挑选
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              {/* 背景渐变 */}
              <div
                className="absolute inset-0"
                style={{ background: card.gradient }}
              ></div>

              {/* 光效 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
              </div>

              {/* 内容 */}
              <div className="relative z-10 p-6 h-64 flex flex-col justify-between">
                {/* 顶部 */}
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium mb-3">
                    {card.category}
                  </span>
                </div>

                {/* 底部 */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-white/90 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span>{card.players} 在线</span>
                    </div>
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-all duration-200">
                      立即游玩
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-primary text-lg">
            查看全部游戏
          </button>
        </div>
      </div>
    </section>
  );
}

