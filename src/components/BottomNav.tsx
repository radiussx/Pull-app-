"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {

  const pathname = usePathname();

  const tabs = [
    {
      name: "Deck",
      path: "/deck",
    },
    {
      name: "Bakery",
      path: "/dashboard/bakery",
    },
    {
      name: "Breakfast",
      path: "/dashboard/breakfast",
    },
    {
      name: "Milk",
      path: "/dashboard/milk",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-zinc-800 flex justify-around py-4 z-50">

      {tabs.map((tab) => (

        <Link
          key={tab.path}
          href={tab.path}
          className={`text-sm font-semibold ${
            pathname === tab.path
              ? "text-green-500"
              : "text-zinc-400"
          }`}
        >
          {tab.name}
        </Link>

      ))}

    </div>
  );
}