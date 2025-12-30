'use client';

import React, { useEffect, useRef } from 'react';

interface ShootingStarsProps {
  trailColor?: string;
  frequency?: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({
  trailColor = 'rgba(34, 211, 238, 0.6)',
  frequency = 2000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createShootingStar = () => {
      const startX = Math.random() * canvas.width * 0.5;
      const startY = Math.random() * canvas.height * 0.3;
      
      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 3 + 4,
        opacity: 1,
        angle: Math.PI / 4 + Math.random() * 0.2 - 0.1,
      });
    };

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastSpawnRef.current > frequency) {
        if (Math.random() < 0.5) {
          createShootingStar();
        }
        lastSpawnRef.current = timestamp;
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;

        if (star.opacity <= 0) return false;

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        
        gradient.addColorStop(0, trailColor.replace(/[\d.]+\)$/g, `${star.opacity})`));
        gradient.addColorStop(1, trailColor.replace(/[\d.]+\)$/g, '0)'));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate(0);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trailColor, frequency]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ShootingStars;


