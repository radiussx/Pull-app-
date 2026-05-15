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

  // =========================
  // LOGIN
  // =========================

  async function login() {

    try {

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );

      const data =
        await response.json();

      // =========================
      // SUCCESS
      // =========================

      if (data.success) {

        // CLEAR OLD STORAGE

        sessionStorage.clear();

        // SAVE SESSION

        sessionStorage.setItem(
          "loggedIn",
          "true"
        );

        sessionStorage.setItem(
          "username",
          username
        );

        sessionStorage.setItem(
          "user",
          username
        );

        sessionStorage.setItem(
          "role",
          data.role
        );

        sessionStorage.setItem(
          "sessionId",
          data.sessionId
        );

        // REDIRECT

        router.replace("/dashboard");

        return;
      }

      // =========================
      // INVALID LOGIN
      // =========================

      alert("Invalid username or password");

    } catch (error) {

      console.error(error);

      alert("Login failed");

    } finally {

      setLoading(false);
    }
  }

  // =========================
  // ENTER KEY SUPPORT
  // =========================

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (e.key === "Enter") {

      login();
    }
  }

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-5">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-[420px] shadow-2xl">

        {/* LOGO */}

        <div className="flex justify-center mb-6">

          <img
         src="/logo.png"
    alt="Starbucks"
    className="w-28 h-28 object-contain"
          />

        </div>

        {/* TITLE */}

        <div className="mb-10 text-center">

          <h1 className="text-white text-4xl font-bold mb-3">
            Starbucks
          </h1>

          <p className="text-zinc-400 text-lg">
            Pull & Inventory System
          </p>

        </div>

        {/* FORM */}

        <div className="flex flex-col gap-5">

          {/* USERNAME */}

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="bg-zinc-800 border border-zinc-700 text-white p-4 rounded-2xl outline-none text-lg"
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="bg-zinc-800 border border-zinc-700 text-white p-4 rounded-2xl outline-none text-lg"
          />

          {/* LOGIN BUTTON */}

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