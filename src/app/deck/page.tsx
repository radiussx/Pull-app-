"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Item {
  itemId: string;
  name: string;
  category: string;
  image?: string;
  target: number;
}

export default function DeckPage() {

  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [onHandValues, setOnHandValues] = useState<{
    [key: string]: number;
  }>({});

  // =========================
  // LOAD ITEMS
  // =========================

  useEffect(() => {

  const today =
    new Date().toDateString();

  const lastOpenDate =
    sessionStorage.getItem("lastOpenDate");

  // =========================
  // RESET DAILY VALUES
  // =========================

  if (lastOpenDate !== today) {

    // reset inventory values
    sessionStorage.removeItem("onHandValues");

    // reset pull display
    sessionStorage.removeItem("pullData");

    // save today's date
    sessionStorage.setItem(
      "lastOpenDate",
      today
    );
  }

  const loadItems = async () => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=getItems`
      );

      const data =
        await response.json();

      setItems(data);

      const savedValues =
        JSON.parse(
          sessionStorage.getItem("onHandValues") || "{}"
        );

      setOnHandValues(savedValues);

    } catch (error) {

      console.log(error);
    }

    setLoading(false);
  };

  loadItems();

}, []);

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user");

    router.push("/");
  };

  // =========================
  // SAVE INVENTORY
  // =========================

  const saveInventory = async (
    itemId: string,
    target: number
  ) => {

    try {

      const onHand =
        Number(onHandValues[itemId] || 0);

      const pullRequired =
        Math.max(target - onHand, 0);

      const item =
        items.find(
          (i) => i.itemId === itemId
        );

      const itemName =
        item?.name || itemId;

      const category =
        item?.category || "";

      // =========================
      // SAVE TO GOOGLE SHEETS
      // =========================

      const response = await fetch(
        process.env.NEXT_PUBLIC_SCRIPT_URL!,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify({
            action: "saveInventory",

            itemId: itemName,

            onHand,

            pullRequired,

            updatedBy:
              sessionStorage.getItem("username") ||
              "Unknown",

            pullTime: "AM",
          }),
        }
      );

      const result =
        await response.json();

      console.log(result);

      if (result.success) {

        // =========================
        // SAVE CURRENT ON HAND
        // =========================

        const updatedOnHand = {
          ...onHandValues,
          [itemId]: onHand,
        };

        setOnHandValues(updatedOnHand);

        sessionStorage.setItem(
          "onHandValues",
          JSON.stringify(updatedOnHand)
        );

        // =========================
        // FRONTEND DISPLAY DATA
        // ONLY LATEST ENTRY
        // =========================

        let existing =
          JSON.parse(
            sessionStorage.getItem("pullData") || "[]"
          );

        // remove old frontend entry
        existing =
          existing.filter(
            (p: any) =>
              p.itemId !== itemId
          );

        // add latest only
        existing.push({
          itemId,
          itemName,
          pullRequired,
          category,
          onHand,
        });

        sessionStorage.setItem(
          "pullData",
          JSON.stringify(existing)
        );

        alert("Saved Successfully");

      } else {

        alert("Save Failed");
      }

    } catch (error) {

      console.log(error);

      alert("Save Failed");
    }
  };

  // =========================
  // FILTER ITEMS
  // =========================

  const filteredItems =
    items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (

    <ProtectedRoute>

      <div className="min-h-screen bg-black text-white px-4 pt-5 pb-28">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-3xl font-bold">
            Pull Deck
          </h1>

          <button
            onClick={logout}
            className="bg-red-700 px-4 py-2 rounded-xl text-sm font-bold"
          >
            Logout
          </button>

        </div>

        {/* SEARCH */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-base outline-none"
          />

        </div>

        {/* ITEMS */}

        <div className="space-y-5">

          {filteredItems.map((item) => {

            const onHand =
              Number(
                onHandValues[item.itemId] || 0
              );

            const pullRequired =
              Math.max(
                Number(item.target || 0) - onHand,
                0
              );

            return (

              <div
                key={item.itemId}
                className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800"
              >

                <h2 className="text-2xl font-bold mb-2 leading-tight">
                  {item.name}
                </h2>

                <p className="text-zinc-500 text-sm mb-4">
                  {item.category}
                </p>

                {/* TARGET */}

                <div className="flex justify-between items-center mb-2">

                  <p className="text-zinc-400 text-base">
                    Pull Target
                  </p>

                  <p className="text-lg font-bold text-yellow-400">
                    {item.target}
                  </p>

                </div>

                {/* ON HAND */}

                <div className="flex justify-between items-center mb-2">

                  <p className="text-zinc-400 text-base">
                    On Hand
                  </p>

                  <p className="text-blue-400 text-lg font-bold">
                    {onHand}
                  </p>

                </div>

                {/* TO PULL */}

                <div className="flex justify-between items-center mb-5">

                  <p className="text-zinc-400 text-base">
                    To Pull
                  </p>

                  <p className="text-green-500 text-2xl font-bold">
                    {pullRequired}
                  </p>

                </div>

                {/* INPUT */}

                <div className="flex gap-3 items-center">

                  <input
                    type="number"
                    placeholder="Qty"
                    value={
                      onHandValues[item.itemId] || ""
                    }
                    onChange={(e) =>
                      setOnHandValues({
                        ...onHandValues,
                        [item.itemId]:
                          Number(e.target.value),
                      })
                    }
                    className="bg-black border border-zinc-700 rounded-2xl px-4 py-3 text-lg w-24 outline-none"
                  />

                  <button
                    onClick={() =>
                      saveInventory(
                        item.itemId,
                        item.target
                      )
                    }
                    className="flex-1 bg-green-900 active:bg-green-800 py-3 rounded-2xl text-base font-bold"
                  >
                    Save Inventory
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* NAVIGATION */}

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
            className="flex flex-col items-center text-green-500 text-[10px] font-bold"
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
{sessionStorage.getItem("role") === "admin" && (

  <a
    href="/dashboard/admin"
    className="flex flex-col items-center text-red-400 text-xs"
  >
    <span>🛡️</span>
    Admin
  </a>

)}
        </div>

      </div>

    </ProtectedRoute>
  );
}