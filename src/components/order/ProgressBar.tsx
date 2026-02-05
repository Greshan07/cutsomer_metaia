interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-[#7A1F1F]/10 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
