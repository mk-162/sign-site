'use client';

import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface Props {
  className?: string;
  stats?: Stat[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  animationDuration?: number;
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
}

function StatItem({
  value,
  suffix = '+',
  label,
  accentColor,
  isVisible,
  animationDuration,
}: Stat & { accentColor?: string; isVisible: boolean; animationDuration: number }) {
  const count = useCountUp(value, animationDuration, isVisible);

  return (
    <div className="flex flex-col items-center px-4 py-6 text-center md:px-8">
      <div
        className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl"
        style={{ color: accentColor || '#3B82F6' }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm font-medium uppercase tracking-wider text-slate-600 md:text-base">
        {label}
      </div>
    </div>
  );
}

export function StatsCounter({
  className,
  stats = [
    { value: 50000, suffix: '+', label: 'Products' },
    { value: 25, suffix: '+', label: 'Years Experience' },
    { value: 10000, suffix: '+', label: 'Happy Customers' },
    { value: 100000, suffix: '+', label: 'Orders Fulfilled' },
  ],
  backgroundColor = '#F8FAFC',
  textColor = '#1E293B',
  accentColor = '#3B82F6',
  animationDuration = 2000,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={clsx('py-12 md:py-16', className)}
      ref={sectionRef}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-200">
          {stats.map((stat, index) => (
            <StatItem
              accentColor={accentColor}
              animationDuration={animationDuration}
              isVisible={isVisible}
              key={index}
              label={stat.label}
              suffix={stat.suffix}
              value={stat.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
