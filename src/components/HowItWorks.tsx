import { ClipboardList, Ruler, UserCheck, Package, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  isDarkMode?: boolean;
}

export function HowItWorks({ isDarkMode = false }: HowItWorksProps) {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Choose Design',
      description: 'Select from our extensive catalog or upload your own design',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Ruler,
      title: 'Take Measurements',
      description: 'Easy guided process to capture your perfect measurements',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: UserCheck,
      title: 'Select Tailor',
      description: 'Choose from 500+ verified expert tailors near you',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Package,
      title: 'Track & Receive',
      description: 'Real-time tracking and free home delivery',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className={`backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 ${
      isDarkMode 
        ? 'bg-white/10 border-[#D4AF37]/30' 
        : 'bg-white/80 border-[#D4AF37]/20'
    }`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`} />
        <h3 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>
          How It Works
        </h3>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={index} 
              className="flex items-start gap-4 group animate-[fadeInUp_0.5s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Number & Icon */}
              <div className="relative flex-shrink-0">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${
                  isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#7A1F1F]'
                } text-white text-xs font-bold flex items-center justify-center shadow-md`}>
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h4 className={`text-base font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-[#7A1F1F]'
                }`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className={`absolute left-7 top-16 w-0.5 h-8 ${
                  isDarkMode ? 'bg-[#D4AF37]/30' : 'bg-[#7A1F1F]/20'
                }`} style={{ marginLeft: '28px' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className={`mt-6 pt-6 border-t ${
        isDarkMode ? 'border-[#D4AF37]/20' : 'border-[#7A1F1F]/10'
      }`}>
        <p className={`text-center text-sm ${
          isDarkMode ? 'text-white/80' : 'text-[#7A1F1F]/80'
        }`}>
          Ready to get started?
        </p>
      </div>
    </div>
  );
}
