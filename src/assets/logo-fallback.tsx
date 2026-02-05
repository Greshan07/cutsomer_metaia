// Logo fallback component
export const LogoFallback = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#C5A028] rounded-full`}>
    <span className="text-white font-bold text-xl">M</span>
  </div>
);
