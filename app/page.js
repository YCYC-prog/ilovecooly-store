"use client";

import { useState, useRef } from "react";

const beatsData = [
  {
    id: 1,
    title: "Midnight Drip",
    price: 29.99,
    tag: "Trap / Dark",
    description: "Dark, atmospheric trap beat.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Velvet Nights",
    price: 49.99,
    tag: "R&B / Smooth",
    description: "Smooth late-night R&B vibe.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
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
    <div style={{ background: "black", color: "white", minHeight: "100vh", padding: "20px" }}>

      <h1 style={{ fontSize: "40px" }}>iLoveCooly</h1>
      <p style={{ color: "gray" }}>Different frequency. Different outcome.</p>
      <p style={{ color: "gray" }}>Only1Living Music Group</p>

      <h2 style={{ marginTop: "30px" }}>Beat Store</h2>

      {beatsData.map((beat) => (
        <div key={beat.id} style={{ marginTop: "20px", padding: "15px", border: "1px solid gray" }}>
          
          <h3>{beat.title}</h3>
          <p>{beat.tag}</p>
          <p>{beat.description}</p>

          <button onClick={() => playBeat(beat)}>Play</button>

          <p>${beat.price}</p>

        </div>
      ))}

      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", background: "#111", padding: "10px" }}>
        <p>{currentBeat ? currentBeat.title : "No track playing"}</p>
        <audio ref={audioRef} controls />
      </div>

    </div>
  );
}