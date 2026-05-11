"use client";

import { useEffect, useState } from "react";

interface PullItem {
  itemName: string;
  pullRequired: number;
  category: string;
}

export default function MilkPage() {

  const [items, setItems] =
    useState<PullItem[]>([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("pullData") || "[]"
      );

    const milkItems =
      saved.filter(
        (item: PullItem) =>
          item.category === "Milk" &&
          item.pullRequired >= 1
      );

    const latestMap = new Map();

    milkItems.forEach((item: PullItem) => {

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
        Milk Pulls
      </h1>

      <div className="space-y-4">

        {items.map((item, index) => (

          <div
            key={index}
            className="bg-zinc-900 rounded-3xl p-5"
          >

            <div className="flex justify-between mb-3">

              <span className="text-sm font-medium">
                {item.itemName}
              </span>

              <span className="text-green-500 font-bold">
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
  );
}