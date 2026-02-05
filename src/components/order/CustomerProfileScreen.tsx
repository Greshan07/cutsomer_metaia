import { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Upload, Camera } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';

interface CustomerProfileScreenProps {
  onNext: (data: any) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function CustomerProfileScreen({ onNext, onBack, currentStep, totalSteps }: CustomerProfileScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    homeAddress: '',
    workAddress: '',
    otherAddress: '',
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.homeAddress.trim()) newErrors.homeAddress = 'At least one address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({ profile: formData });
    }
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
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="mt-4">
          <p className="text-xs text-[#7A1F1F]/60">Step {currentStep} of {totalSteps}</p>
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Customer Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {/* Profile Photo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/80 border-2 border-[#D4AF37] flex items-center justify-center">
              <User className="w-12 h-12 text-[#7A1F1F]/40" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-[#7A1F1F]/60 mt-2">Add Profile Photo (Optional)</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
              />
            </div>
            {errors.fullName && <p className="text-red-600 text-xs mt-1 ml-4">{errors.fullName}</p>}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Contact Number *</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/60 w-5 h-5" />
              <input
                type="tel"
                placeholder="Enter your contact number"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
              />
            </div>
            {errors.contactNumber && <p className="text-red-600 text-xs mt-1 ml-4">{errors.contactNumber}</p>}
          </div>

          {/* Home Address */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Home Address *</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-[#7A1F1F]/60 w-5 h-5" />
              <textarea
                placeholder="Enter your home address"
                value={formData.homeAddress}
                onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                rows={3}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] resize-none"
              />
            </div>
            {errors.homeAddress && <p className="text-red-600 text-xs mt-1 ml-4">{errors.homeAddress}</p>}
          </div>

          {/* Work Address */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Work Address (Optional)</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-[#7A1F1F]/60 w-5 h-5" />
              <textarea
                placeholder="Enter your work address"
                value={formData.workAddress}
                onChange={(e) => setFormData({ ...formData, workAddress: e.target.value })}
                rows={3}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] resize-none"
              />
            </div>
          </div>

          {/* Other Address */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Other Address (Optional)</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-[#7A1F1F]/60 w-5 h-5" />
              <textarea
                placeholder="Enter other address"
                value={formData.otherAddress}
                onChange={(e) => setFormData({ ...formData, otherAddress: e.target.value })}
                rows={3}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
