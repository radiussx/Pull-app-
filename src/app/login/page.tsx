"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function login() {

    try {

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );

      const data = await response.json();

      if (data.success) {

        // SAVE LOGIN SESSION

        localStorage.setItem(
          "loggedIn",
          "true"
        );

        // SAVE USERNAME

        localStorage.setItem(
          "username",
          username
        );

        // OLD USER STORAGE (KEEPING FOR COMPATIBILITY)

        localStorage.setItem(
          "user",
          username
        );

        // REDIRECT

        router.push("/deck");

      } else {

        alert("Invalid login");
      }

    } catch (error) {

      console.error(error);

      alert("Login failed");

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-[420px] shadow-2xl">

        <div className="mb-10">

          <h1 className="text-white text-5xl font-bold mb-3">
            Starbucks
          </h1>

          <p className="text-zinc-400 text-lg">
            Pull & Inventory System
          </p>

        </div>

        <div className="flex flex-col gap-5">

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="bg-zinc-800 border border-zinc-700 text-white p-4 rounded-2xl outline-none text-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="bg-zinc-800 border border-zinc-700 text-white p-4 rounded-2xl outline-none text-lg"
          />

          <button
            onClick={login}
            disabled={loading}
            className="bg-green-700 hover:bg-green-600 transition-all text-white font-bold p-4 rounded-2xl text-lg"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </div>

      </div>

    </main>
  );
}