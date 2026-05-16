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
  // DEVICE FINGERPRINT
  // =========================

  function generateFingerprint() {

    return btoa(

      JSON.stringify({

        ua: navigator.userAgent,

        width: screen.width,

        height: screen.height,

        timezone:
          Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone,

        language:
          navigator.language,

        platform:
          navigator.platform

      })

    );
  }

  // =========================
  // LOGIN
  // =========================

  async function login() {

    try {

      setLoading(true);

      // =========================
      // DEVICE INFO
      // =========================

      const device =
        navigator.userAgent;

      const fingerprint =
        generateFingerprint();

      // =========================
      // GET IP
      // =========================

      const ipRes = await fetch(
        "https://api.ipify.org?format=json"
      );

      const ipData =
        await ipRes.json();

      const ip =
        ipData.ip;

      // =========================
      // LOGIN REQUEST
      // =========================

      const response = await fetch(

        `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&ip=${encodeURIComponent(ip)}&device=${encodeURIComponent(device)}&fingerprint=${encodeURIComponent(fingerprint)}`

      );

      const data =
        await response.json();

      // =========================
      // SUCCESS
      // =========================

      if (data.success) {

        localStorage.clear();

        localStorage.setItem(
          "loggedIn",
          "true"
        );

        localStorage.setItem(
          "username",
          username
        );

        localStorage.setItem(
          "user",
          username
        );

        localStorage.setItem(
          "role",
          data.role
        );

        localStorage.setItem(
          "sessionId",
          data.sessionId
        );

        // =========================
        // NEW DEVICE ALERT
        // =========================

        if (data.newDevice) {

          alert(
            "New device detected for this account."
          );
        }

        router.replace("/dashboard");

        return;
      }

      // =========================
      // INVALID LOGIN
      // =========================

      alert(
        "Invalid username or password"
      );

    } catch (error) {

      console.error(error);

      alert("Login failed");

    } finally {

      setLoading(false);
    }
  }

  // =========================
  // ENTER SUPPORT
  // =========================

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (e.key === "Enter") {

      login();
    }
  }

  // =========================
  // UI
  // =========================

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