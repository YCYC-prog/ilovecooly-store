"use client";

import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

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
  const waveformRef = useRef(null);
  const waveSurfer = useRef(null);

  // INIT WAVEFORM
  useEffect(() => {
    if (!waveformRef.current) return;

    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#444",
      progressColor: "#d4af37",
      cursorColor: "#d4af37",
      barWidth: 2,
      height: 60,
    });

    return () => waveSurfer.current.destroy();
  }, []);

  // PLAY TRACK
  const playBeat = (beat) => {
    setCurrentBeat(beat);
    waveSurfer.current.load(beat.audio);

    waveSurfer.current.once("ready", () => {
      waveSurfer.current.play();
    });
  };

  // HOVER PREVIEW (5 sec)
  const previewBeat = (beat) => {
    waveSurfer.current.load(beat.audio);

    waveSurfer.current.once("ready", () => {
      waveSurfer.current.play();

      setTimeout(() => {
        waveSurfer.current.pause();
      }, 5000);
    });
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
            onMouseEnter={() => previewBeat(beat)}
            className="relative flex items-center justify-between px-6 py-4 border-b border-zinc-800 hover:bg-[#111] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition cursor-pointer"
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

      {/* WAVEFORM PLAYER */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black to-[#111] border-t border-zinc-800 px-6 py-4">

        <div className="mb-2 text-sm text-gray-400">
          {currentBeat ? currentBeat.title : "Hover or select a beat"}
        </div>

        <div ref={waveformRef}></div>

      </div>

    </div>
  );
}