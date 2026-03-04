'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function AssistanceNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
  ];

  const [activeItem, setActiveItem] = useState<string>('provably-fair-explained');

const handleToggle = (key: string) => {
  setActiveItem( key);
};



const handleSetQuery = (key: string) => {
  console.log(key);
  const params = new URLSearchParams(searchParams.toString());
  params.set('name', key); 
  router.push(pathname + '?' + params.toString());
};
  return (
    <div className="">
      <ul className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <li key={item.key} className={`border-b border-gray-200 px-4 py-2  bg-[#dadbdc] rounded-md ${activeItem === item.key ? 'bg-[#bbc1c4]' : ''}`}>
            <div className="flex items-center justify-between" onClick={() => handleToggle(item.key)}>
              <a href={item.href} className="block p-2 text-[16px] font-medium text-gray-800 hover:text-primary transition-colors duration-200">{item.label}</a>
              <svg className={`transition-transform duration-200 ${activeItem === item.key ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" /></svg>
            </div>
            {item.children && activeItem === item.key && (
              <ul className="ml-[15px] space-y-1">
                {item.children.map((child) => (
                  <li onClick={() => handleSetQuery(child.key)} key={child.key}><span className="block py-[5px] px-[10px] font-normal text-gray-600 hover:text-primary transition-colors duration-200">{child.label}</span></li>
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
