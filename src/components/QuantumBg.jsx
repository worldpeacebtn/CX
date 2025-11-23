import React from "react";

export default function QuantumBg() {
  // Use a very lightweight DOM background, not WebGL
  const bgStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
    backgroundImage: `linear-gradient(180deg, rgba(15,10,40,0.6), rgba(2,4,10,0.5)), url('/mnt/data/Create_a_high-end,_dark-futuristic_logo_for_an_org.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.06,
    mixBlendMode: "screen",
    transform: "scale(1.01)",
    filter: "saturate(1.05) contrast(1.02) blur(0.6px)"
  };

  // If you want to keep the original uploaded path (local testing),
  // replace the url('/assets/bg.png') above with the local path:
  // url('/mnt/data/Create_a_high-end,_dark-futuristic_logo_for_an_org.png')
  // but for production move the image into /public/assets/bg.png

  return <div style={bgStyle} aria-hidden />;
}
