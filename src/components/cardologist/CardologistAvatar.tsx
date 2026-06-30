interface CardologistAvatarProps {
  size?: number;
  className?: string;
}

export function CardologistAvatar({ size = 48, className }: CardologistAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Cardologist"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#1A1A1D" stroke="#C9A962" strokeWidth="1.5" />
      {/* Shoulders / jacket */}
      <path d="M20 85 Q50 70 80 85 L80 100 L20 100 Z" fill="#2C1810" />
      <path d="M25 85 Q50 75 75 85" stroke="#C9A962" strokeWidth="0.5" fill="none" />
      {/* Shirt */}
      <path d="M38 70 L50 85 L62 70 Z" fill="#F5F0E8" />
      {/* Bow tie */}
      <ellipse cx="42" cy="68" rx="5" ry="3" fill="#4A0E1C" />
      <ellipse cx="58" cy="68" rx="5" ry="3" fill="#4A0E1C" />
      <circle cx="50" cy="68" r="2" fill="#C9A962" />
      {/* Neck */}
      <rect x="44" y="58" width="12" height="12" rx="2" fill="#D4A054" opacity="0.8" />
      {/* Face */}
      <ellipse cx="50" cy="48" rx="18" ry="20" fill="#C4956A" />
      {/* Hair */}
      <path d="M32 42 Q50 28 68 42 Q65 35 50 32 Q35 35 32 42" fill="#1A1A1D" />
      {/* Eyes */}
      <ellipse cx="43" cy="47" rx="2.5" ry="3" fill="#1A1A1D" />
      <ellipse cx="57" cy="47" rx="2.5" ry="3" fill="#1A1A1D" />
      <circle cx="44" cy="46" r="1" fill="#F5F0E8" />
      <circle cx="58" cy="46" r="1" fill="#F5F0E8" />
      {/* Smile */}
      <path d="M44 55 Q50 59 56 55" stroke="#1A1A1D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Shaker in hand */}
      <rect x="72" y="55" width="8" height="20" rx="2" fill="#C9A962" opacity="0.9" />
      <rect x="73" y="52" width="6" height="4" rx="1" fill="#B87333" />
      {/* Gold accent ring */}
      <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="0.5" fill="none" opacity="0.5" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#C9A962" />
          <stop offset="50%" stopColor="#D4A054" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
      </defs>
    </svg>
  );
}
