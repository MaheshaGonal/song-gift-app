"use client";

import { useRef, useState } from "react";

type Sample = {
  key: string;
  tabLabel: string;
  who: string;
  brief: string;
  trackName: string;
  trackMeta: string;
  // Replace with a real hosted MP3 URL (Supabase Storage, S3, etc.)
  audioSrc: string;
  caption: string;
};

const SAMPLES: Sample[] = [
  {
    key: "wedding",
    tabLabel: "Wedding",
    who: "For Ritika & Arjun",
    brief:
      '"They met at a college fest, argued about music for two years before dating. Wanted their sangeet entry song to reference that."',
    trackName: '"Do Ajnabi" — folk-fusion, sangeet cut',
    trackMeta: "2:48 · Hindi/English",
    audioSrc: "/samples/wedding-sample.mp3",
    caption: '"...two years of arguing, one lifetime of choosing you."',
  },
  {
    key: "birthday",
    tabLabel: "Birthday",
    who: "For Amma, turning 60",
    brief:
      '"She raised four kids alone after Dad passed. We wanted something that felt like a thank-you, not a birthday jingle."',
    trackName: '"Saans Mein Tu" — acoustic, warm strings',
    trackMeta: "3:10 · Hindi",
    audioSrc: "/samples/birthday-sample.mp3",
    caption: '"...every candle you never got to blow out for yourself."',
  },
  {
    key: "anniversary",
    tabLabel: "Anniversary",
    who: "For Deepak & Sunita, 25 years",
    brief:
      '"He proposed on a rainy platform waiting for a delayed train. Wanted the song to open with that rain."',
    trackName: '"Baarish Wala Station" — EDM-folk blend',
    trackMeta: "3:32 · Hindi/Urdu",
    audioSrc: "/samples/anniversary-sample.mp3",
    caption: '"...still waiting on that platform, twenty-five years on."',
  },
];

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function Player({ sample }: { sample: Sample }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [missing, setMissing] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setMissing(true));
      setPlaying(true);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  }

  return (
    <div className="player">
      <div className="player-row">
        <button className="play-btn" onClick={toggle} aria-label="Play sample">
          {playing ? (
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="6" y="4" width="4" height="16" fill="#2E1B23" />
              <rect x="14" y="4" width="4" height="16" fill="#2E1B23" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 4L20 12L6 20V4Z" fill="#2E1B23" />
            </svg>
          )}
        </button>
        <div className="track-info">
          <div className="name">{sample.trackName}</div>
          <div className="meta">{sample.trackMeta}</div>
        </div>
      </div>
      <div className="progress-wrap">
        <div className="progress-bar" onClick={seek}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="time-row">
          <span>{fmt(current)}</span>
          <span>{duration ? fmt(duration) : sample.trackMeta.split(" ")[0]}</span>
        </div>
      </div>
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setCurrent(a.currentTime);
          setProgress((a.currentTime / a.duration) * 100 || 0);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
      >
        <source src={sample.audioSrc} type="audio/mpeg" />
      </audio>
      {missing && (
        <div className="demo-note">
          No audio file found at {sample.audioSrc} yet — drop a real MP3
          into <code>/public/samples/</code> with that filename.
        </div>
      )}
    </div>
  );
}

export default function DemoPlayers() {
  const [active, setActive] = useState(SAMPLES[0].key);
  const sample = SAMPLES.find((s) => s.key === active)!;

  return (
    <>
      <div className="tabs">
        {SAMPLES.map((s) => (
          <button
            key={s.key}
            className={`tab-btn ${active === s.key ? "active" : ""}`}
            onClick={() => setActive(s.key)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>
      <div className="demo-panels">
        <div className="demo-panel active">
          <div className="demo-grid">
            <div>
              <div className="story-card" style={{ marginBottom: 20 }}>
                <div className="who">{sample.who}</div>
                <div className="brief">{sample.brief}</div>
              </div>
              <Player sample={sample} />
            </div>
            <div className="video-frame">
              <div className="vp">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6 4L20 12L6 20V4Z" fill="#F0E6DC" />
                </svg>
              </div>
              <div className="cap">{sample.caption}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
