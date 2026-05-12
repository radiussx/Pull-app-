"use client";

import { useEffect, useState } from "react";

interface PullItem {
  itemName: string;
  pullRequired: number;
  category: string;
}

export default function BreakfastPage() {

  const [items, setItems] =
    useState<PullItem[]>([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("pullData") || "[]"
      );

    const filtered =
      saved.filter(
        (item: PullItem) =>
          item.category === "Breakfast" &&
          item.pullRequired >= 1
      );

    setItems(filtered);

  }, []);

  return (

    <main className="min-h-dvh bg-black text-white px-5 pt-8 pb-32">

      {/* HEADER */}

      <h1 className="text-4xl font-bold mb-8">
        Breakfast Pulls
      </h1>

      {/* EMPTY */}

      {items.length === 0 && (

        <div className="bg-zinc-900 rounded-3xl p-6 text-center text-zinc-400 mb-6">
          No breakfast pulls right now.
        </div>

      )}

      {/* CHART */}

      <div className="space-y-5 mb-8">

        {items.map((item, index) => (

          <div
            key={index}
            className="bg-zinc-900 rounded-3xl p-5"
          >

            <div className="flex justify-between mb-3">

              <h2 className="text-lg font-bold">
                {item.itemName}
              </h2>

              <span className="text-green-500 font-bold text-lg">
                {item.pullRequired}
              </span>

            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-green-600 rounded-full"
                style={{
                  width: `${Math.min(
                    item.pullRequired * 15,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* TABLE */}

      <div className="bg-zinc-900 rounded-3xl p-5">

        <h2 className="text-2xl font-bold mb-5">
          Pull Table
        </h2>

        <div className="space-y-4">

          {items.map((item, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-black rounded-2xl p-4"
            >

              <div>

                <p className="font-bold text-base">
                  {item.itemName}
                </p>

                <p className="text-zinc-500 text-sm">
                  Breakfast
                </p>

              </div>

              <div className="text-green-500 text-2xl font-bold">
                {item.pullRequired}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* NAV */}

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-black border-t border-zinc-800 flex items-center justify-around z-50">

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
          className="flex flex-col items-center text-zinc-400 text-[10px]"
        >
          <span className="text-lg">🥐</span>
          Bakery
        </a>

        <a
          href="/dashboard/breakfast"
          className="flex flex-col items-center text-green-500 text-[10px] font-bold"
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
    </main>
  );
}