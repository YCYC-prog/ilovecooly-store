"use client";

import { useState, useRef } from "react";

const beatsData = [
  {
    id: 1,
    title: "Midnight Drip",
    price: 29.99,
    tag: "Drake Type Beat, Dark Trap",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Eclipse",
    price: 29.99,
    tag: "Epic Trap Instrumental",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Toxic Love",
    price: 49.99,
    tag: "Emotional Vibes",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function Home() {
  const [currentBeat, setCurrentBeat] = useState(null);
  const audioRef = useRef(null);

  const playBeat = (beat) => {
    setCurrentBeat(beat);
    if (audioRef.current) {
      audioRef.current.src = beat.audio;
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(circle_at_center,#111,#000)] px-6 pb-32">

      {/* HERO */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold tracking-widest">iLoveCooly</h1>
        <p className="mt-3 text-gray-400 text-lg">Not made for everyone.</p>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 mb-6 justify-center text-sm">
        {["Genre", "Mood", "BPM", "Key"].map((item) => (
          <div
            key={item}
            className="px-4 py-2 bg-[#111] border border-zinc-700 rounded hover:border-yellow-500 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>

      {/* STORE */}
      <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#111] to-black border border-zinc-800 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">

        {beatsData.map((beat, i) => (
          <div
            key={beat.id}
            className="relative flex items-center justify-between px-6 py-4 border-b border-zinc-800 hover:bg-[#111] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition"
          >

            {/* GOLD STREAK */}
            {i === 0 && (
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 blur-sm"></div>
            )}

            {/* LEFT */}
            <div className="flex items-center gap-4 z-10">
              <button
                onClick={() => playBeat(beat)}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-200 to-white text-black flex items-center justify-center shadow-md"
              >
                ▶
              </button>

              <div>
                <p className="font-semibold text-white">{beat.title}</p>
                <p className="text-xs text-gray-400">{beat.tag}</p>

                {/* FAKE WAVEFORM */}
                <div className="mt-2 h-[4px] w-40 bg-gradient-to-r from-yellow-400 via-gray-400 to-transparent opacity-60 rounded"></div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 z-10">
              <span className="text-sm font-semibold text-gray-300">
                ${beat.price}
              </span>

              <button className="px-3 py-1 text-xs border border-gray-600 rounded text-gray-300 hover:border-white">
                Lease
              </button>

              <button className="px-5 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:brightness-110 transition">
                Buy
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* PLAYER */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black to-[#111] border-t border-zinc-800 px-6 py-4 flex items-center justify-between">

        <div>
          <p className="text-sm text-white">
            {currentBeat ? currentBeat.title : "No track playing"}
          </p>
        </div>

        <div className="w-1/2">
          <audio ref={audioRef} controls className="w-full" />
        </div>

        <button className="px-5 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold">
          BUY
        </button>

      </div>

    </div>
  );
}