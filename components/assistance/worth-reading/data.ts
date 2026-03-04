export type WorthReadingCategory = 'casino' | 'crypto' | 'fun-zone' | 'games'

export interface WorthReadingArticle {
  id: string
  title: string
  excerpt: string
  image: string
  href: string
  categories: WorthReadingCategory[]
}

export const worthReadingArticles: WorthReadingArticle[] = [
  {
    id: 'spring-2026-slots',
    title: '5 Slots to Play in Spring 2026 at FortuneX',
    excerpt:
      "This spring, there's a slot for every occasion, from blossom-peeping to racing down the hill after a giant wheel of cheese. Yes, really. Celebrate the season with my hand-picked selection.",
    image: '/assistance/5-slots-to-play-in-spring-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'ultra-luxury-cars',
    title: 'Top 3 Ultra-Luxury Cars to Buy After a Jackpot Win',
    excerpt:
      "You've said \"wen Lambo\" for years. Now it's time to ask \"which Lambo?\" Here are the 2025 flex-mobiles you can actually buy after you hit the jackpot.",
    image: '/assistance/top-3-luxury-cars-to-buy-after-jackpot-win-banner-desktop.webp',
    href: '#',
    categories: ['fun-zone'],
  },
  {
    id: 'jeremy-blindfolded',
    title: 'Jeremy Tan: Can You Cheat Casino Wash Blindfolded?',
    excerpt:
      "Jeremy takes things to a whole new level by performing a casino wash blindfolded. He can't possibly cheat without even seeing the cards, right?",
    image: '/assistance/can-you-cheat-casino-wash-blindfolded-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'winter-2025-2026-slots',
    title: '5 Slots to Play in Winter 2025-2026 at FortuneX',
    excerpt:
      "Cold weather brings people together. Grab a hot drink and enjoy your guide to five FortuneX games that capture the season's frosty highs and illuminated festivities.",
    image: '/assistance/5-slots-to-play-in-winter-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'biggest-lottery-winners',
    title: 'Biggest Lottery Winners & Where They Are Now',
    excerpt:
      "Picture this: you wake up with a fortune. What's your first move? In this series, we explore the most fun ways your gambling fortunes can be spent - starting with the biggest lottery winners.",
    image: '/assistance/biggest-lottery-winners-where-they-are-now-banner-desktop.webp',
    href: '#',
    categories: ['fun-zone'],
  },
  {
    id: 'fall-2025-slots',
    title: '5 Slots to Play in Fall 2025 at FortuneX',
    excerpt:
      "Spooky season, harvest season, cuffing season: fall is a time with many nicknames. Play your way through all sides of its personality with my guide to FortuneX' top 5 slots of fall 2025.",
    image: '/assistance/5-slots-to-play-in-fall-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'pyramid-plunder-review',
    title: 'FortuneX Game Review: Pyramid Plunder High Limit',
    excerpt:
      "Your mission in Pyramid Plunder High Limit: excavate the riches buried in the sand. But does this fan-favorite video slot live up to the hype? I gave it a spin - here's what I dug up.",
    image: '/assistance/pyramid-plunder-high-limit-slot-review-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'jeremy-strangers',
    title: 'Jeremy Tan: Why You Should Never Gamble with Strangers',
    excerpt:
      "Card games are all about luck and skill-at least, that's what we like to believe. But what if the skill isn't yours... and the luck was never real to begin with?",
    image: '/assistance/why-you-should-never-gamble-with-strangers-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'summer-2025-slots',
    title: '5 Slots to Play in Summer 2025 at FortuneX',
    excerpt:
      "Dun dun... Dun dun... Let's dive into shark-infested waters, soar with high-flyers, and dunk into SummerSlam - all while spinning the best summer reels!",
    image: '/assistance/5-slots-to-play-in-summer-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'share-my-win',
    title: '#ShareMyWin: Answering Your Questions',
    excerpt:
      "Hitting a big win is a thrill - whether it's a win multiplier or a huge cash prize. But what if you want to capture the moment and share it, or even just save it for yourself? Cue the #ShareMyWin feature!",
    image: '/assistance/sharemywin-answering-your-questions-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'vpn-choose-2026',
    title: 'How to Choose a VPN in 2026',
    excerpt:
      "How do you choose the right VPN from endless options of providers? Find the one that fits your needs without overpaying for features you don't need.",
    image: '/assistance/how-to-choose-a-vpn-in-2025-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'vpn-need-one',
    title: 'What Is a VPN and Do You Need One?',
    excerpt:
      "With the surge in the popularity of VPNs, you might be wondering whether it's time to jump on board. But what exactly does a VPN do, how can it benefit you, and which one should you opt for?",
    image: '/assistance/what-is-a-vpn-and-do-you-need-one-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'provably-fair-3',
    title: 'Provably Fair 3: Diverse Implementations',
    excerpt:
      "In the previous parts, we've delved into the definition of Provably Fair, the pros and cons of the technology, the basics of how it works, and the concept of hashing. Now, to provide you with a more...",
    image: '/assistance/provably-fair-diverse-implementations-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'provably-fair-2',
    title: 'Provably Fair 2: The Basics & Hashing',
    excerpt:
      'In the first part of this series, we explored the potential risks involved in gaming and discussed the pros and cons of both the traditional middleman approach, relying on third-party certificates, and the...',
    image: '/assistance/provably-fair-the-basics-and-hashing-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'provably-fair-1',
    title: 'Provably Fair 1: An Introduction',
    excerpt:
      "Have you ever questioned the fairness of an online casino? How can you be sure that the games aren't manipulated and that the outcomes are truly random? These questions must have crossed every...",
    image: '/assistance/provably-fair-an-introduction-banner-desktop.webp',
    href: '#',
    categories: ['casino'],
  },
  {
    id: 'crypto-basics-2',
    title: "Crypto Basics 2: Bitcoin's Predecessors",
    excerpt:
      "Before Bitcoin changed everything, early attempts at digital money paved the way. This ultimate guide uncovers their stories. Which breakthroughs led to Bitcoin's rise?",
    image: '/assistance/bitcoins-predecessors-banner-desktop.webp',
    href: '#',
    categories: ['crypto'],
  },
  {
    id: 'crypto-basics-1',
    title: 'Crypto Basics 1: The Journey from Gold to Fiat to Crypto',
    excerpt:
      'Cryptocurrencies were first created as a means for people to have complete control over their money, without going through banks or third parties. But how did this concept evolve into a whole new asset...',
    image: '/assistance/the-journey-from-gold-to-fiat-to-crypto-banner-desktop.webp',
    href: '#',
    categories: ['crypto'],
  },
  {
    id: 'bank-bust-review',
    title: 'FortuneX Game Review: Bank Bust',
    excerpt:
      "What happens when Slotland Entertainment saddles up for the Old West? No tumbleweeds here - it's high noon, and Bank Bust is ready to shoot its shot. Will it hit the bullseye or miss the mark?",
    image: '/assistance/bank-bust-slot-review-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'spring-2025-slots',
    title: '5 Slots to Play in Spring 2025 at FortuneX',
    excerpt:
      "This spring, I'm virtually taking you all around the world, to the movies - and even to the year 2030. Let's see what slots fit these events best!",
    image: '/assistance/5-slots-to-play-in-spring-2025-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'zodiac-high-limit-review',
    title: 'FortuneX Game Review: Zodiac High Limit',
    excerpt:
      "A celestial slot where the Element Wheel spins in a hypnotic dance, promising heart-pounding payouts in the thousands. I've tried Zodiac High Limit, with bets up to $480.",
    image: '/assistance/game-review-zodiac-high-limit-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
  {
    id: 'lost-world-high-limit-review',
    title: 'FortuneX Game Review: Lost World High Limit',
    excerpt:
      "I tried playing Lost World High Limit, a dinosaur slot with bets starting at $20 per spin. From unique Free Spins to a Devour Bonus, here's what the game is like - plus my honest verdict.",
    image: '/assistance/game-review-lost-world-high-limit-banner-desktop.webp',
    href: '#',
    categories: ['games'],
  },
]

export const worthReadingCategoryLabels: Record<WorthReadingCategory, string> = {
  casino: 'Casino',
  crypto: 'Crypto',
  'fun-zone': 'Fun Zone',
  games: 'Games',
}

