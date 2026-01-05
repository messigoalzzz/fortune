export default function About() {
  return (
    <section className="bg-[#d8d8d8] py-10 md:py-16">
      <div className="container-custom">
        <div className="max-w-[820px]">
          <p className="text-[22px] md:text-[32px] font-semibold tracking-[0.14em] bg-[linear-gradient(90deg,#af39f3,#f746bf,#ec7016)] text-transparent bg-clip-text mb-5 uppercase">
            About CryptoSlots
          </p>

          <h2 className="text-sm md:text-xl lg:text-2xl font-semibold text-[#2f2f2f] leading-snug mb-5">
            Provably Fair Crypto Casino for Bitcoin Slots & Big Wins
          </h2>

          <p className="text-sm md:text-base text-[#5b5b5b] leading-relaxed mb-6">
            CryptoSlots is a next-generation crypto casino designed for players who want real-money action, provably fair games, and complete control over their play....
          </p>

          <a
            href="#"
            className="inline-block text-[#08c] hover:text-[#0f5ec4] underline underline-offset-4 font-semibold text-sm md:text-base transition-colors duration-200"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
}
