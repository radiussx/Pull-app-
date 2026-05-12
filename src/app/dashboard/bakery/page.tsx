"use client";

import { useEffect, useState } from "react";

interface PullItem {
  itemName: string;
  pullRequired: number;
  category: string;
}

export default function BakeryPage() {

  const [items, setItems] =
    useState<PullItem[]>([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("pullData") || "[]"
      );

    // FILTER BAKERY ITEMS
    const bakeryItems =
      saved.filter(
        (item: PullItem) =>
          item.category === "Bakery" &&
          item.pullRequired >= 1
      );

    // REMOVE DUPLICATES
    const latestMap = new Map();

    bakeryItems.forEach((item: PullItem) => {

      latestMap.set(
        item.itemName,
        item
      );

    });

    const filtered =
      Array.from(latestMap.values());

    setItems(filtered);

  }, []);

  return (

    <div className="min-h-screen bg-black text-white px-4 pt-5 pb-28">

      <h1 className="text-3xl font-bold mb-6">
        Bakery Pulls
      </h1>

      {/* CHART */}

      <div className="bg-zinc-900 rounded-3xl p-5 mb-6">

        <h2 className="text-2xl font-bold mb-5">
          Pull Chart
        </h2>

        <div className="space-y-5">

          {items.map((item, index) => (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium">
                  {item.itemName}
                </span>

                <span className="text-green-500 font-bold text-sm">
                  {item.pullRequired}
                </span>

              </div>

              <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-600"
                  style={{
                    width: `${Math.min(item.pullRequired * 15, 100)}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-zinc-900 rounded-3xl p-5">

        <h2 className="text-2xl font-bold mb-5">
          Pull Table
        </h2>

        <div className="space-y-3">

          {items.map((item, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-black rounded-2xl p-4"
            >

              <span className="text-sm">
                {item.itemName}
              </span>

              <span className="text-green-500 font-bold text-lg">
                {item.pullRequired}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* NAV */}

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 h-20 flex items-center justify-around z-50">

        <a
          href="/dashboard"
          className="flex flex-col items-center text-zinc-400 text-[10px]"
        >
          <span className="text-lg">🏠</span>
          Dashboard
        </a>

        <a
          href="/deck"
          className="flex flex-col items-center text-zinc-400 text-[10px]"
        >
          <span className="text-lg">📦</span>
          Deck
        </a>

        <a
          href="/dashboard/bakery"
          className="flex flex-col items-center text-green-500 text-[10px] font-bold"
        >
          <span className="text-lg">🥐</span>
          Bakery
        </a>

        <a
          href="/dashboard/breakfast"
          className="flex flex-col items-center text-zinc-400 text-[10px]"
        >
          <span className="text-lg">🍳</span>
          Breakfast
        </a>

        <a
          href="/dashboard/milk"
          className="flex flex-col items-center text-zinc-400 text-[10px]"
        >
          <span className="text-lg">🥛</span>
          Milk
        </a>

      </div>
// =========================
  // LOGOUT
  // =========================
  const logout = () => {

    localStorage.removeItem("user");

    router.push("/login");
  };
    </div>
  );
}