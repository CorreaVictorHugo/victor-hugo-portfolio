import { useEffect, useRef, useState } from 'react';

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
}

export function RandomLetterSwap({
  label,
  className = '',
  staggerDuration = 0.025,
}: RandomLetterSwapProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState(label);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  useEffect(() => {
    if (!isHovered) return;

    let iteration = 0;
    const intervalId = setInterval(() => {
      setDisplay(
        label
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return label[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration > label.length) {
        clearInterval(intervalId);
        setDisplay(label);
      }
    }, Math.max(10, Math.round(staggerDuration * 1000)));

    return () => clearInterval(intervalId);
  }, [isHovered, label, staggerDuration]);

  /* Outside hover the real label renders directly, so no reset state is needed. */
  const text = isHovered ? display : label;

  return (
    <span
      ref={ref}
      className={`random-letter-swap ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-block', minWidth: `${label.length}ch` }}
    >
      {text}
    </span>
  );
}
