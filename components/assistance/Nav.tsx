'use client';

import { useState } from "react";

function AssistanceNav() {
  const navItems = [
    {
      label: "Provably Fair Explained",
      href: "/provably-fair-explained",
      children: [
        {
          label: "Slot Machines",

        },
        {
          label: 'Video Poker'
        },
        {
          label: 'Multi-Hand Video Poker'
        }, {
          label: 'Keno Games'
        }, {
          label: 'Verification'
        }
      ],
    },
    {
      label: "Worth Reading",
      href: "/worth-reading",
      children: [{
        label: 'Casino'
      }, {
        label: 'Crypto'
      }, {
        label: 'Fun Zone'
      }, {
        label: "Games"
      }]
    },
  ];

  const [activeItem, setActiveItem] = useState<string | null>(null);

const handleToggle = (label: string) => {
  setActiveItem(activeItem === label ? null : label);
};
  return (
    <div className="">
      <ul className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <li key={item.label} className={`border-b border-gray-200 px-4 py-2  bg-[#dadbdc] rounded-md ${activeItem === item.label ? 'bg-[#bbc1c4]' : ''}`}>
            <div className="flex items-center justify-between" onClick={() => handleToggle(item.label)}>
              <a href={item.href} className="block p-2 text-[16px] font-medium text-gray-800 hover:text-primary transition-colors duration-200">{item.label}</a>
              <svg className={`transition-transform duration-200 ${activeItem === item.label ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" /></svg>
            </div>
            {item.children && activeItem === item.label && (
              <ul className="ml-[15px] space-y-1">
                {item.children.map((child) => (
                  <li key={child.label}><a className="block py-[5px] px-[10px] font-normal text-gray-600 hover:text-primary transition-colors duration-200">{child.label}</a></li>
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
