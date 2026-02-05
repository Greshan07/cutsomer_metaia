import { useState } from 'react';
import { ArrowLeft, Scissors, Wrench } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';

interface OrderTypeSelectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function OrderTypeSelection({ onNext, onBack }: OrderTypeSelectionProps) {
  const handleTypeSelect = (type: 'fresh' | 'alteration') => {
    onNext({ orderType: type });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #7A1F1F 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-[#7A1F1F] hover:text-[#D4AF37] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="w-6"></div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Select Order Type</h1>
          <p className="text-sm text-[#7A1F1F]/70 mt-1">Choose the service you need</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 250px)' }}>
        <div className="space-y-4">
          {/* Fresh Stitching Card */}
          <button
            onClick={() => handleTypeSelect('fresh')}
            className="w-full p-6 rounded-3xl border-3 transition-all border-[#D4AF37]/30 bg-white/70 hover:border-[#D4AF37] hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#7A1F1F]/10 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37] group-hover:to-[#C5A028] transition-all">
                <Scissors className="w-8 h-8 text-[#7A1F1F]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-[#7A1F1F] mb-1">Fresh Stitching</h3>
                <p className="text-sm text-[#7A1F1F]/70">New garment tailoring from scratch</p>
              </div>
            </div>
          </button>

          {/* Alteration Card */}
          <button
            onClick={() => handleTypeSelect('alteration')}
            className="w-full p-6 rounded-3xl border-3 transition-all border-[#D4AF37]/30 bg-white/70 hover:border-[#D4AF37] hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#7A1F1F]/10 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37] group-hover:to-[#C5A028] transition-all">
                <Wrench className="w-8 h-8 text-[#7A1F1F]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-[#7A1F1F] mb-1">Alteration</h3>
                <p className="text-sm text-[#7A1F1F]/70">Modify existing garments</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}