"use client";

import { useState, useRef } from "react";

const beatsData = [
  {
    id: 1,
    title: "Midnight Drip",
    price: 29.99,
    tag: "Trap / Dark",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Velvet Nights",
    price: 49.99,
    tag: "R&B / Smooth",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

export default function Home() {
  const [currentBeat, setCurrentBeat] = useState(null);
  const [queue, setQueue] = useState([]);
  const audioRef = useRef(null);

  const playBeat = (beat) => {
    setCurrentBeat(beat);
    if (audioRef.current) {
      audioRef.current.src = beat.audio;
      audioRef.current.play();
    }
  };

  const addToQueue = (beat) => {
    setQueue((prev) => [...prev, beat]);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const next = queue[0];
    setQueue(queue.slice(1));
    playBeat(next);
  };

  return (
    <div className="min-h-screen text-white pb-28 px-6 bg-[radial-gradient(circle_at_top,#1a1a1a,#000000)]">

      {/* HERO */}
      <div className="py-12 border-b border-zinc-800">
        <h1 className="text-5xl font-bold tracking-widest text-white">
          iLoveCooly
        </h1>

        <p className="mt-3 text-lg text-gray-300 tracking-wide">
          Not made for everyone.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Only1Living Music Group
        </p>
      </div>

      {/* STORE */}
      <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-200">
          Beat Store
        </h2>

        <div className="rounded-xl overflow-hidden border border-zinc-800 bg-gradient-to-b from-[#111] to-[#000] shadow-[0_0_40px_rgba(0,0,0,0.8)]">

          {beatsData.map((beat) => (
            <div
              key={beat.id}
              className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 hover:bg-[#111] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => playBeat(beat)}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-200 to-white text-black flex items-center justify-center shadow-md"
                >
                  ▶
                </button>

                <div>
                  <p className="font-semibold text-white">{beat.title}</p>
                  <p className="text-xs text-gray-400">{beat.tag}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                <span className="text-sm font-semibold text-gray-200">
                  ${beat.price}
                </span>

                <button
                  onClick={() => addToQueue(beat)}
                  className="px-3 py-1 text-xs border border-gray-600 rounded text-gray-300 hover:border-white"
                >
                  Queue
                </button>

                <button className="px-5 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:brightness-110 transition">
                  Buy
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* PLAYER */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black to-[#111] border-t border-zinc-800 px-6 py-4 flex items-center justify-between shadow-[0_-5px_30px_rgba(0,0,0,0.8)]">

        <div>
          <p className="text-sm text-white">
            {currentBeat ? currentBeat.title : "No track playing"}
          </p>
          <p className="text-xs text-gray-500">Queue: {queue.length}</p>
        </div>

        <div className="flex items-center gap-4 w-1/2">
          <button
            onClick={playNext}
            className="px-3 py-1 border border-gray-600 rounded text-gray-300"
          >
            Next
          </button>

          <audio ref={audioRef} controls className="w-full" />
        </div>

        <button className="px-5 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-[0_0_10px_rgba(212,175,55,0.4)]">
          BUY
        </button>

      </div>

    </div>
  );
}