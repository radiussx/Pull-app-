"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {

  const [username, setUsername] =
    useState("");

  useEffect(() => {

    const user =
      localStorage.getItem("user") || "";

    setUsername(user);

  }, []);

  return (

    <ProtectedRoute>

      <div className="min-h-screen bg-black text-white pb-28">

        {/* HEADER */}

        <div className="px-5 pt-8">

          {/* LOGO */}

          <div className="flex justify-center mb-6">

            <img
              src="https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/2048px-Starbucks_Corporation_Logo_2011.svg.png"
              alt="Starbucks"
              className="w-24 h-24 rounded-full"
            />

          </div>

          {/* TITLE */}

          <div className="text-center">

            <h1 className="text-3xl font-bold mb-2">
              Welcome {username}
            </h1>

            <p className="text-green-500 text-lg font-semibold mb-3">
              Starbucks Store #650 Dupont
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed px-2">
              Pull & Inventory Tracking System designed
              to simplify daily inventory management,
              pull calculations, and production tracking.
            </p>

          </div>

        </div>

        {/* MAIN CARDS */}

        <div className="px-4 mt-8 space-y-4">

          {/* DECK */}

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">

            <h2 className="text-2xl font-bold text-green-500 mb-3">
              Deck View
            </h2>

            <p className="text-zinc-300 text-sm leading-7">
              Enter current On Hand inventory counts here.
              <br /><br />
              The system automatically calculates pull counts
              using target inventory values.
              <br /><br />
              All other pages update automatically from the
              values entered in Deck.
            </p>

          </div>

          {/* BAKERY */}

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">

            <h2 className="text-2xl font-bold text-yellow-400 mb-3">
              Bakery View
            </h2>

            <p className="text-zinc-300 text-sm leading-7">
              Shows Bakery items requiring pulls.
              <br /><br />
              Only items with pull counts greater than
              or equal to 1 appear.
              <br /><br />
              Charts and pull tables update automatically.
            </p>

          </div>

          {/* BREAKFAST */}

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">

            <h2 className="text-2xl font-bold text-orange-400 mb-3">
              Breakfast View
            </h2>

            <p className="text-zinc-300 text-sm leading-7">
              Displays Breakfast pull requirements.
              <br /><br />
              Helps improve production planning and
              morning pull visibility.
            </p>

          </div>

          {/* MILK */}

          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">

            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              Milk View
            </h2>

            <p className="text-zinc-300 text-sm leading-7">
              Tracks milk inventory and transfer requirements.
              <br /><br />
              Updates automatically from inventory entered
              through the Deck page.
            </p>

          </div>

        </div>

        {/* FOOTER */}

        <div className="text-center mt-10 text-zinc-500 text-xs px-6">

          Starbucks Pull & Inventory Tracking System

        </div>

        {/* MOBILE NAVIGATION */}

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 h-20 flex items-center justify-around z-50">

          <a
            href="/dashboard"
            className="flex flex-col items-center text-green-500 text-xs font-bold"
          >
            <span>🏠</span>
            Dashboard
          </a>

          <a
            href="/deck"
            className="flex flex-col items-center text-zinc-400 text-xs"
          >
            <span>📦</span>
            Deck
          </a>

          <a
            href="/dashboard/bakery"
            className="flex flex-col items-center text-zinc-400 text-xs"
          >
            <span>🥐</span>
            Bakery
          </a>

          <a
            href="/dashboard/breakfast"
            className="flex flex-col items-center text-zinc-400 text-xs"
          >
            <span>🍳</span>
            Breakfast
          </a>

          <a
            href="/dashboard/milk"
            className="flex flex-col items-center text-zinc-400 text-xs"
          >
            <span>🥛</span>
            Milk
          </a>

        </div>

      </div>
      // =========================
  // LOGOUT
  // =========================
  const logout = () => {

    localStorage.removeItem("user");

    router.push("/login");
  };

    </ProtectedRoute>
  );
}