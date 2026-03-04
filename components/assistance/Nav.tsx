'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function AssistanceNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const nameQuery = searchParams.get('name');

  const getActiveKeyFromPathname = (path: string) => {
    if (path.includes('worth-reading')) return 'worth-reading';
    if (path.includes('support')) return 'support';
    if (path.includes('faq')) return 'faq';
    if (path.includes('about-us')) return 'about-us';
    if (path.includes('responsible-gaming')) return 'responsible-gaming';
    if (path.includes('privacy-policy')) return 'privacy-policy';
    if (path.includes('terms-and-conditions')) return 'terms-and-conditions';
    return 'provably-fair-explained';
  };

  const activeItem = getActiveKeyFromPathname(pathname);

  const navItems = [
    {
      label: "Provably Fair Explained",
      key: 'provably-fair-explained',
      href: "/provably-fair-explained",
      children: [
        {
          label: "Slot Machines",
          key: 'slot-machines'

        },
        {
          label: 'Video Poker',
          key: 'video-poker'
        },
        {
          label: 'Multi-Hand Video Poker',
          key: 'multi-hand-video-poker'
        }, {
          label: 'Keno Games',
          key: 'keno-games'
        }, {
          label: 'Verification',
          key: 'verification'
        }
      ],
    },
    {
      label: "Worth Reading",
      key: 'worth-reading',
      href: "/worth-reading",
      children: [{
        label: 'Casino',
        key: 'casino'
      }, {
        label: 'Crypto',
        key: 'crypto'
      }, {
        label: 'Fun Zone',
        key: 'fun-zone'
      }, {
        label: "Games",
        key: 'games'
      }]
    },
    {
      label: 'Support',
      key: 'support',
      href: '/support',
    },
    {
      label: 'FAQ',
      key: 'faq',
      href: '/faq',
    },
    {
      label: 'About Us',
      key: 'about-us',
      href: '/about-us',
    },
    {
      label: "Responsible Gaming",
      key: 'responsible-gaming',
      href: '/responsible-gaming',
    },
    {
      label: 'Privacy Policy',
      key: 'privacy-policy',
      href: '/privacy-policy',
    }, {
      label: 'Terms and Conditions',
      key: 'terms-and-conditions',
      href: '/terms-and-conditions',
    }
  ];

  const [expandedItem, setExpandedItem] = useState<string>(activeItem);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    const updateScreen = () => setIsSmallScreen(window.innerWidth < 1024);
    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  useEffect(() => {
    setExpandedItem(getActiveKeyFromPathname(pathname));
  }, [pathname]);

  const handleToggle = (key: string, hasChildren?: boolean) => {
    if (isSmallScreen && !mobileExpanded) {
      setMobileExpanded(true);
      return;
    }
    if (!hasChildren) return;
    setExpandedItem((prev) => (prev === key ? '' : key));
  };



  const handleSetQuery = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('name', key);
    router.push(pathname + '?' + params.toString());
  };

  const showOnlyActiveOnMobile = isSmallScreen && !mobileExpanded;
  const visibleNavItems = showOnlyActiveOnMobile
    ? navItems.filter((item) => item.key === activeItem)
    : navItems;

  return (
    <div className="">
      <ul className="flex flex-col space-y-1">
        {visibleNavItems.map((item) => (
          <li
            key={item.key}
            className={`border-b border-gray-200 px-4 py-2 bg-[#dadbdc] rounded-md ${
              activeItem === item.key ? 'bg-[#bbc1c4] border-[#b8bcc0]' : ''
            }`}
          >
            <div className="flex items-center justify-between" onClick={() => handleToggle(item.key, !!item.children)}>
              {showOnlyActiveOnMobile ? (
                <button
                  type="button"
                  onClick={() => setMobileExpanded(true)}
                  className={`block p-2 text-[16px] font-medium transition-colors duration-200 ${
                    activeItem === item.key ? 'text-primary' : 'text-gray-800 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href}
                  className={`block p-2 text-[16px] font-medium transition-colors duration-200 ${
                    activeItem === item.key ? 'text-primary' : 'text-gray-800 hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              )}
              {
                (item.children || showOnlyActiveOnMobile) && <svg className={`transition-transform duration-200 ${expandedItem === item.key && !showOnlyActiveOnMobile ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" /></svg>
              }
            </div>
            {item.children && expandedItem === item.key && !showOnlyActiveOnMobile && (
              <ul className="ml-[15px] space-y-1">
                {item.children.map((child) => (
                  <li onClick={() => handleSetQuery(child.key)} key={child.key}>
                    <span
                      className={`block py-[5px] px-[10px] font-normal transition-colors duration-200 rounded ${
                        activeItem === item.key && nameQuery === child.key
                          ? 'text-primary font-semibold bg-[#cfd3d6]'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      {child.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssistanceNav;
