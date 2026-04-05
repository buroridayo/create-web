"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface WaveLayer {
  r: number;
  g: number;
  b: number;
  alpha: number;
  amplitude: number;
  frequency: number;
  speed: number;
  yBase: number;
  phase: number;
}

const WAVES: WaveLayer[] = [
  { r: 255, g:   0, b: 255, alpha: 0.22, amplitude:  85, frequency: 0.0095, speed:  0.55, yBase: 0.52, phase: 0 },
  { r:   0, g: 220, b: 255, alpha: 0.18, amplitude:  65, frequency: 0.0145, speed: -0.48, yBase: 0.44, phase: Math.PI * 0.6 },
  { r: 130, g:   0, b: 255, alpha: 0.25, amplitude: 105, frequency: 0.0075, speed:  0.38, yBase: 0.61, phase: Math.PI * 1.2 },
  { r: 255, g:   0, b: 110, alpha: 0.16, amplitude:  50, frequency: 0.0185, speed: -0.72, yBase: 0.37, phase: Math.PI * 0.3 },
  { r:  40, g: 130, b: 255, alpha: 0.14, amplitude:  75, frequency: 0.0120, speed:  0.65, yBase: 0.70, phase: Math.PI * 1.7 },
];

function drawWave(
  ctx: CanvasRenderingContext2D,
  wave: WaveLayer,
  width: number,
  height: number,
) {
  const yPeak = wave.yBase * height;
  const { r, g, b } = wave;

  ctx.beginPath();
  ctx.moveTo(0, height);

  for (let x = 0; x <= width + 2; x += 2) {
    const y = yPeak + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.closePath();

  // Gradient fill: neon at crest → transparent at bottom
  const grad = ctx.createLinearGradient(0, yPeak - wave.amplitude, 0, height);
  grad.addColorStop(0, `rgba(${r},${g},${b},${wave.alpha})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

  ctx.fillStyle = grad;
  ctx.shadowColor = `rgb(${r},${g},${b})`;
  ctx.shadowBlur = 36;
  ctx.fill();

  // Glow crest line
  ctx.beginPath();
  ctx.moveTo(0, yPeak + Math.sin(wave.phase) * wave.amplitude);
  for (let x = 1; x <= width + 2; x += 2) {
    const y = yPeak + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(${r},${g},${b},0.7)`;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = `rgb(${r},${g},${b})`;
  ctx.shadowBlur = 18;
  ctx.stroke();

  ctx.shadowBlur = 0;
}

const BackgroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const waves: WaveLayer[] = WAVES.map((w) => ({ ...w }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement
        ? canvas.parentElement.getBoundingClientRect().height
        : window.innerHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? document.body);

    const tick = () => {
      const { width, height } = canvas;
      if (width === 0 || height === 0) return;

      // Dark base gradient
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#060018");
      bg.addColorStop(0.5, "#0d0028");
      bg.addColorStop(1, "#150010");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      waves.forEach((wave) => {
        wave.phase += wave.speed * 0.018;
        drawWave(ctx, wave, width, height);
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-12 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </main>
  );
};

export default BackgroundWrapper;
