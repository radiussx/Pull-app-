"use client";

import { useEffect, useState } from "react";

type Props = {
  item: string;
  current: number;
  target: number;
};

export default function InventoryCard({
  item,
  current,
  target,
}: Props) {
  const storageKey = `inventory-${item}`;

  const [count, setCount] = useState(current);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedValue = sessionStorage.getItem(storageKey);

    if (savedValue) {
      setCount(Number(savedValue));
    }
  }, []);

  const saveInventory = () => {
    sessionStorage.setItem(storageKey, String(count));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const toPull = target - count;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">

      <h2 className="text-2xl font-semibold text-white mb-5">
        {item}
      </h2>

      <div className="space-y-4">

        <div>
          <label className="text-zinc-400 text-sm">
            Current Inventory
          </label>

          <input
            type="number"
            value={count}
            onChange={(e) =>
              setCount(Number(e.target.value))
            }
            className="w-full mt-1 bg-black border border-zinc-700 rounded-lg p-3 text-white"
          />
        </div>

        <div className="flex justify-between text-lg">
          <span className="text-zinc-400">
            Target
          </span>

          <span className="text-white font-semibold">
            {target}
          </span>
        </div>

        <div className="flex justify-between text-xl">
          <span className="text-green-400 font-bold">
            To Pull
          </span>

          <span className="text-green-400 font-bold">
            {toPull > 0 ? toPull : 0}
          </span>
        </div>

        <button
          onClick={saveInventory}
          className="w-full bg-green-700 hover:bg-green-800 transition p-3 rounded-xl font-semibold"
        >
          Save Pull
        </button>

        {saved && (
          <p className="text-green-400 text-center">
            Saved Successfully
          </p>
        )}

      </div>
    </div>
  );
}