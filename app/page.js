"use client";

import React, { useState, useRef } from "react";

const beatsData = [
  {
    id: 1,
    title: "Midnight Drip",
    price: 29.99,
    tag: "Trap / Dark",
    description: "Dark, atmospheric trap beat with heavy 808s and haunting melodies.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Velvet Nights",
    price: 49.99,
    tag: "R&B / Smooth",
    description: "Smooth and luxurious R&B vibe perfect for late night vocals.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

export default function BeatStore() {
  const [loading, setLoading] = useState(null);
  const [currentBeat, setCurrentBeat] = useState(null);
  const audioRef = useRef(null);

  const handleCheckout = async (beat) => {
    setLoading(beat.id);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ beat })
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  const playBeat = (beat) => {
    setCurrentBeat(beat);
    if (audioRef.current) {
      audioRef.current.src = beat.audio;
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* HERO */}
      <div className="p-8 border-b border-zinc-800">
        <h1 className="text-5xl font-bold tracking-widest">iLoveCooly</h1>
        <p className="text-gray-400 mt-2">Different frequency. Different outcome.</p>
        <p className="mt-4 text-sm text-gray-500">Only1Living Music Group</p>
      </div>

      {/* LABEL */}
      <div className="p-8 bg-zinc-950 border-b border-zinc-800">
        <h2 className="text-2xl font-semibold">01LMG</h2>
        <p className="text-gray-400 mt-2 max-w-xl">
          Only1Living Music Group — a creative house for boundary-pushing sound and distinct artistic identity.
        </p>
      </div>

      {/* BEAT STORE */}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Beat Store</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beatsData.map((beat) => (
            <div key={beat.id} className="bg-zinc-900 rounded-2xl p-4 hover:scale-105 transition">
              
              <h2 className="text-xl font-semibold">{beat.title}</h2>
              <p className="text-sm text-gray-400">{beat.tag}</p>
              <p className="mt-2 text-gray-300">{beat.description}</p>

              <button
                onClick={() => playBeat(beat)}
                className="mt-3 px-4 py-2 bg-white text-black rounded"
              >
                Play
              </button>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">${beat.price}</span>
                <button
                  onClick={() => handleCheckout(beat)}
                  className="bg-white text-black px-4 py-2 rounded"
                >
                  Buy
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL PLAYER */}
      <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 p-4 flex items-center justify-between">
        <p className="text-sm">
          {currentBeat ? currentBeat.title : "No track playing"}
        </p>
        <audio ref={audioRef} controls className="w-1/2" />
      </div>
    </div>
  );
}