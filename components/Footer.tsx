export default function Footer() {
  const trustBadges = [
    {
      id: "secure",
      viewBox: "0 300 130 98",
      hoverViewBox: "130 300 130 98",
      width: 130,
      height: 98,
    },
    {
      id: "provably-fair",
      viewBox: "0 100 130 98",
      hoverViewBox: "130 100 130 98",
      width: 130,
      height: 98,
    },
    {
      id: "slotland-entertainment",
      viewBox: "0 400 200 90",
      hoverViewBox: "210 400 200 90",
      width: 200,
      height: 90,
    },
    {
      id: "responsible-gaming",
      viewBox: "0 200 172 90",
      hoverViewBox: "182 200 172 90",
      width: 172,
      height: 90,
    },
    {
      id: "18age",
      viewBox: "0 0 90 90",
      hoverViewBox: "100 0 90 90",
      width: 90,
      height: 90,
    },
  ];

  const footerColumns = [
    [
      { name: "Terms and Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Promotions", href: "#" },
      { name: "Worth Reading", href: "#" },
    ],
    [
      { name: "Responsible Gaming", href: "#" },
      { name: "Provably Fair Explained", href: "#" },
      { name: "Payment Methods", href: "#" },
      { name: "Support", href: "#" },
    ],
    [
      { name: "Affiliate Program", href: "#" },
      { name: "About Us", href: "#" },
      { name: "Crypto Lotto", href: "#" },
      { name: "VIP Program", href: "#" },
    ],
  ];
  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      iconClass: "bg-[url('/facebook.svg')] after:bg-[url('/facebook.svg')]",
    },
    {
      label: "X",
      href: "#",
      iconClass: "bg-[url('/twitter.svg')] after:bg-[url('/twitter.svg')]",
    },
  ];

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)]">
      <div className="container-custom">
        <div className="py-[30px] flex justify-around items-center flex-wrap gap-8">
          {trustBadges.map((badge) => {
            const [x, y] = badge.viewBox.split(" ").map(Number);
            const [hx, hy] = badge.hoverViewBox.split(" ").map(Number);
            
            return (
              <div
                key={badge.id}
                className="relative flex items-center justify-center group cursor-pointer"
                style={{
                  width: `${badge.width}px`,
                  height: `${badge.height}px`,
                }}
              >
                <div
                  className="w-full h-full bg-no-repeat transition-opacity duration-300 group-hover:opacity-0"
                  style={{
                    backgroundImage: "url('/badges.svg')",
                    backgroundPosition: `${-x}px ${-y}px`,
                    backgroundSize: "410px 490px",
                  }}
                />
                <div
                  className="absolute inset-0 w-full h-full bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: "url('/badges.svg')",
                    backgroundPosition: `${-hx}px ${-hy}px`,
                    backgroundSize: "410px 490px",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="my-4 flex items-center gap-2">
          <div className="hidden sm:block h-px flex-1 bg-[var(--border)]" />
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#818283] bg-center bg-no-repeat bg-contain ${link.iconClass} after:pointer-events-none after:absolute after:inset-0 after:block after:rounded-full after:bg-[#57caff] after:bg-center after:bg-no-repeat after:bg-contain after:content-[''] after:[clip-path:circle(0_at_50%)] [@media(hover:hover)]:hover:after:animate-[footer-social-hover_1s_ease_both] focus-visible:after:animate-[footer-social-hover_1s_ease_both]`}
                aria-label={link.label}
              >
                <span className="sr-only">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="hidden sm:block h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="max-w-2xl py-[30px] mx-auto gap-8 flex justify-between text-center md:text-left">
          {footerColumns.map((column, index) => (
            <ul key={index} className="space-y-1">
              {column.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-200 text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="my-6 text-center text-[13px] text-[var(--foreground-muted)]">
          Copyright © 2025 Slotland Entertainment S.A., All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
