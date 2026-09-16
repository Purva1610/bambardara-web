const TONES = {
  neutral: 'bg-line/60 text-muted',
  success: 'bg-secondary/10 text-secondary',
  warning: 'bg-[#8a6f3a]/10 text-[#8a6f3a]',
  danger: 'bg-[#a24b3f]/10 text-[#a24b3f]',
  accent: 'bg-accent/15 text-primary-dark',
};

/** Small status/label pill, used for user status, role system badge, audit actions, etc. */
export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium ${TONES[tone] || TONES.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
