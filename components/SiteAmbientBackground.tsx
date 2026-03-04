"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function SiteAmbientBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoCanPlay = () => {
    if (videoFailed) return;
    if (!videoReady) {
      setVideoReady(true);
    }
    const video = videoRef.current;
    if (!video) return;

    // Start playback when possible; don't lock into fallback image on transient play errors.
    void video.play().catch(() => undefined);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center mt-[-200px]">
      <div className="relative h-[max(1100px,100vh)] w-[max(2400px,100vw)] max-w-none md:h-[max(1600px,100vh)]">
        <Image
          src="/banner-length.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 md:object-top ${
            videoReady && !videoFailed ? "opacity-0" : "opacity-90"
          }`}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 md:object-top ${
            videoReady && !videoFailed ? "opacity-90" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/banner-length.jpg"
          aria-hidden="true"
          onCanPlay={handleVideoCanPlay}
          onLoadedData={handleVideoCanPlay}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src="/banner-length.mp4" type="video/mp4" />
          <source src="/banner-length.mov" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(120%_92%_at_50%_0%,rgba(37,68,122,0.08)_0%,rgba(8,12,24,0.35)_58%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-b from-transparent via-[#060b16]/85 to-[var(--background)]" />
      </div>
    </div>
  );
}
