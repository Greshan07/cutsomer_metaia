import { useState } from 'react';
import { ArrowLeft, Star, Clock, Award, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';

interface TailorSelectionScreenProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

interface Tailor {
  id: number;
  name: string;
  shopName: string;
  experience: number;
  specialization: string;
  rating: number;
  reviews: number;
  priceRange: string;
  deliveryTime: string;
  sampleImages: string[];
}

export function TailorSelectionScreen({ onNext, onBack }: TailorSelectionScreenProps) {
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);
  const [viewingSamples, setViewingSamples] = useState<Tailor | null>(null);

  const tailors: Tailor[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      shopName: 'Royal Tailors',
      experience: 15,
      specialization: 'Traditional & Western Wear',
      rating: 4.8,
      reviews: 248,
      priceRange: '₹800 - ₹2000',
      deliveryTime: '3-5 days',
      sampleImages: [
        'https://images.unsplash.com/photo-1594938384794-e20a26a89f46?w=400',
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
        'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=400',
        'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400',
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      shopName: 'Elegant Stitches',
      experience: 12,
      specialization: 'Bridal & Party Wear',
      rating: 4.9,
      reviews: 312,
      priceRange: '₹1200 - ₹3000',
      deliveryTime: '5-7 days',
      sampleImages: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
        'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=400',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
        'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=400',
      ]
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      shopName: 'Premium Tailoring',
      experience: 20,
      specialization: 'Suits & Formal Wear',
      rating: 4.7,
      reviews: 195,
      priceRange: '₹1000 - ₹2500',
      deliveryTime: '4-6 days',
      sampleImages: [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
        'https://images.unsplash.com/photo-1594938384794-e20a26a89f46?w=400',
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
        'https://images.unsplash.com/photo-1598915850252-fb07ad1e6768?w=400',
      ]
    },
  ];

  const handleNext = () => {
    if (selectedTailor) {
      onNext({ selectedTailor });
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
        
        <div className="mt-4">
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Select Tailor</h1>
          <p className="text-sm text-[#7A1F1F]/70 mt-1">Choose from available tailors</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        <div className="space-y-4">
          {tailors.map((tailor) => (
            <div
              key={tailor.id}
              className={`w-full p-5 rounded-3xl border-2 transition-all ${
                selectedTailor?.id === tailor.id
                  ? 'border-[#D4AF37] bg-white/90 shadow-xl'
                  : 'border-[#D4AF37]/30 bg-white/70 hover:border-[#D4AF37]/60'
              }`}
            >
              <button
                onClick={() => setSelectedTailor(tailor)}
                className="w-full text-left"
              >
                <div className="flex items-start gap-4">
                  {/* Tailor Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-white font-bold">
                      {tailor.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1">
                    {/* Name & Shop */}
                    <h3 className="font-semibold text-[#7A1F1F] text-lg">{tailor.name}</h3>
                    <p className="text-sm text-[#7A1F1F]/70 mb-2">{tailor.shopName}</p>

                    {/* Experience & Specialization */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs text-[#7A1F1F]/80">{tailor.experience} yrs</span>
                      </div>
                      <span className="text-xs text-[#7A1F1F]/60">•</span>
                      <span className="text-xs text-[#7A1F1F]/80">{tailor.specialization}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-[#D4AF37]/20 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-[#7A1F1F]">{tailor.rating}</span>
                      </div>
                      <span className="text-xs text-[#7A1F1F]/60">({tailor.reviews} reviews)</span>
                    </div>

                    {/* Price & Delivery */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                      <div>
                        <p className="text-xs text-[#7A1F1F]/60">Price Range</p>
                        <p className="text-sm font-semibold text-[#D4AF37]">{tailor.priceRange}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#7A1F1F]/60">Delivery</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#7A1F1F]/70" />
                          <p className="text-sm font-medium text-[#7A1F1F]">{tailor.deliveryTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedTailor?.id === tailor.id && (
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              {/* View Samples Link */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setViewingSamples(tailor);
                }}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-xl text-sm text-[#7A1F1F] font-medium transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                <span>View Sample Work ({tailor.sampleImages.length})</span>
              </button>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedTailor}
          className={`w-full mt-6 py-4 rounded-2xl font-semibold shadow-lg transition-all ${
            selectedTailor
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>

      {/* Sample Work Modal */}
      {viewingSamples && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] overflow-hidden animate-slide-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#C5A028] p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">{viewingSamples.name}</h2>
                <button 
                  onClick={() => setViewingSamples(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/90 text-sm">{viewingSamples.shopName}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span className="text-sm font-semibold">{viewingSamples.rating}</span>
                </div>
                <span className="text-white/80 text-xs">• {viewingSamples.reviews} reviews</span>
              </div>
            </div>

            {/* Sample Images Grid */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
              <h3 className="text-lg font-semibold text-[#7A1F1F] mb-4">Sample Work Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {viewingSamples.sampleImages.map((img, index) => (
                  <div key={index} className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all group">
                    <img
                      src={img}
                      alt={`${viewingSamples.name} sample ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23F5E6D3" width="200" height="200"/%3E%3Ctext fill="%237A1F1F" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESample Work%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Tailor Info Summary */}
              <div className="mt-6 p-4 bg-[#F5E6D3]/50 rounded-xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#7A1F1F]/60 text-xs mb-1">Experience</p>
                    <p className="font-semibold text-[#7A1F1F]">{viewingSamples.experience} years</p>
                  </div>
                  <div>
                    <p className="text-[#7A1F1F]/60 text-xs mb-1">Delivery Time</p>
                    <p className="font-semibold text-[#7A1F1F]">{viewingSamples.deliveryTime}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#7A1F1F]/60 text-xs mb-1">Specialization</p>
                    <p className="font-semibold text-[#7A1F1F]">{viewingSamples.specialization}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#7A1F1F]/60 text-xs mb-1">Price Range</p>
                    <p className="font-semibold text-[#D4AF37] text-base">{viewingSamples.priceRange}</p>
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <button
                onClick={() => {
                  setSelectedTailor(viewingSamples);
                  setViewingSamples(null);
                }}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Select This Tailor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}