import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';

interface DressCategorySelectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function DressCategorySelection({ onNext, onBack }: DressCategorySelectionProps) {
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women' | 'Kids'>('Men');

  const menStyles = [
    { name: 'Shirt', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1639372964829-ef91010c2911?w=400' },
    { name: 'T-Shirt', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1759596450534-0a960be607e1?w=400' },
    { name: 'Kurta', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1744551358303-46edae8b374b?w=400' },
    { name: 'Jacket', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1766113492895-2d8711c4b126?w=400' },
    { name: 'Blazer', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1598915850252-fb07ad1e6768?w=400' },
    { name: 'Pants', category: 'Bottom Wear', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400' },
    { name: 'Jeans', category: 'Bottom Wear', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400' },
    { name: 'Suit', category: 'Full Body', image: 'https://images.unsplash.com/photo-1594938384794-e20a26a89f46?w=400' },
    { name: 'Sherwani', category: 'Full Body', image: 'https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?w=400' },
  ];

  const womenStyles = [
    { name: 'Blouse', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400' },
    { name: 'Kurti', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' },
    { name: 'Saree Blouse', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=400' },
    { name: 'Dress', category: 'Full Body', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
    { name: 'Lehenga', category: 'Full Body', image: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=400' },
    { name: 'Anarkali', category: 'Full Body', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400' },
    { name: 'Salwar Kameez', category: 'Full Body', image: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=400' },
    { name: 'Palazzo', category: 'Bottom Wear', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
  ];

  const kidsStyles = [
    { name: 'T-Shirt', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400' },
    { name: 'Shirt', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400' },
    { name: 'Dress', category: 'Full Body', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400' },
    { name: 'Kurta', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=400' },
    { name: 'Shorts', category: 'Bottom Wear', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400' },
    { name: 'Lehenga Choli', category: 'Full Body', image: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=400' },
  ];

  const currentStyles = selectedGender === 'Men' ? menStyles : selectedGender === 'Women' ? womenStyles : kidsStyles;

  const handleStyleSelect = (styleName: string) => {
    onNext({ 
      category: selectedGender, 
      style: styleName 
    });
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
          <h1 className="text-2xl font-serif text-[#7A1F1F]">Select Dress Type</h1>
          <p className="text-sm text-[#7A1F1F]/70 mt-1">Choose what you want to get tailored</p>
        </div>
      </div>

      {/* Gender Tabs */}
      <div className="relative z-10 px-6 mb-4">
        <div className="flex gap-2 p-1 bg-white/60 rounded-2xl">
          {(['Men', 'Women', 'Kids'] as const).map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
                selectedGender === gender
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white shadow-md'
                  : 'text-[#7A1F1F]/70 hover:text-[#7A1F1F]'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Categories Grid */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        <div className="grid grid-cols-2 gap-4">
          {currentStyles.map((style) => (
            <button
              key={style.name}
              onClick={() => handleStyleSelect(style.name)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23F5E6D3" width="200" height="200"/%3E%3Ctext fill="%237A1F1F" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + style.name + '%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-3 bg-white/90">
                <h3 className="text-base font-semibold text-[#7A1F1F] text-center">{style.name}</h3>
                <p className="text-xs text-[#7A1F1F]/60 text-center mt-0.5">{style.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
