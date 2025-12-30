'use client';

import React, { useEffect, useRef } from 'react';

interface StarsBackgroundProps {
  starDensity?: number;
  twinkleProbability?: number;
  starColor?: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

const StarsBackground: React.FC<StarsBackgroundProps> = ({
  starDensity = 150,
  twinkleProbability = 0.3,
  starColor = 'rgba(255, 255, 255, 0.8)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      const area = canvas.width * canvas.height;
      const numStars = Math.floor((area / 10000) * starDensity);

      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() < twinkleProbability ? Math.random() * 0.02 + 0.01 : 0,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        if (star.twinkleSpeed > 0) {
          star.twinklePhase += star.twinkleSpeed;
          star.opacity = 0.5 + Math.sin(star.twinklePhase) * 0.5;
        }

        ctx.fillStyle = starColor.replace(/[\d.]+\)$/g, `${star.opacity})`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [starDensity, twinkleProbability, starColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarsBackground;


