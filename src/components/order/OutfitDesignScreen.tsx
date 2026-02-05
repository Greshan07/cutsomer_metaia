import { useState } from 'react';
import { ArrowLeft, Upload, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { searchDresses, dressDataset } from '../../data/dressDataset';

interface OutfitDesignScreenProps {
  orderType?: 'fresh' | 'alteration';
  category?: string;
  style?: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function OutfitDesignScreen({ orderType, category, style, onNext, onBack }: OutfitDesignScreenProps) {
  const [formData, setFormData] = useState({
    outfitType: '',
    gender: '',
    fabricProvided: false,
    neckStyle: '',
    sleeveType: '',
    length: '',
    fitPreference: '',
    alterationType: '',
    specialInstructions: '',
    waistStyle: '',
    pocketStyle: '',
    closureType: '',
  });

  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  // Get related inspiration images based on style
  const getInspirationImages = () => {
    if (!style) {
      return [];
    }

    const normalizedStyle = style.toLowerCase().trim();
    console.log('Looking for images for style:', style, 'normalized:', normalizedStyle);
    
    // Combine all dresses for searching
    const allDresses = [...dressDataset.men, ...dressDataset.women, ...dressDataset.kids];
    
    // Try exact match first
    let matchedDress = allDresses.find(dress => 
      dress.name.toLowerCase() === normalizedStyle
    );

    // Try partial match if exact match fails
    if (!matchedDress) {
      matchedDress = allDresses.find(dress => {
        const dressName = dress.name.toLowerCase();
        return dressName.includes(normalizedStyle) || normalizedStyle.includes(dressName);
      });
    }

    if (matchedDress && matchedDress.images.length > 0) {
      console.log('Found match:', matchedDress.name, 'with', matchedDress.images.length, 'images');
      return matchedDress.images.slice(0, 3).map(img => img.url);
    }

    console.log('No match found for:', style);
    // Default images if no match
    return [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      'https://images.unsplash.com/photo-1558769132-cb1aea2f01e2?w=400',
    ];
  };

  const inspirationImages = getInspirationImages();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setReferenceImages(prev => [...prev, ...fileArray]);
      
      // Create preview URLs
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreviewUrls(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const outfitTypes = ['Shirt', 'Blouse', 'Kurti', 'Suit', 'Lehenga', 'Pants', 'Dress', 'Saree Blouse'];
  const genders = ['Men', 'Women', 'Kids'];
  const neckStyles = ['Round', 'V-Neck', 'Collar', 'Boat', 'Square', 'Sweetheart'];
  const sleeveTypes = ['Full Sleeve', 'Half Sleeve', '3/4 Sleeve', 'Sleeveless', 'Cap Sleeve'];
  const lengths = ['Short', 'Medium', 'Long', 'Knee Length', 'Ankle Length'];
  const fitPreferences = ['Slim', 'Regular', 'Loose'];
  const alterationTypes = ['Tightening', 'Loosening', 'Length Change', 'Repair'];
  
  // Bottom wear specific options
  const waistStyles = ['High Waist', 'Mid Waist', 'Low Waist'];
  const pocketStyles = ['Side Pockets', 'Back Pockets', 'No Pockets', 'Hidden Pockets'];
  const closureTypes = ['Zipper', 'Button', 'Elastic', 'Drawstring'];

  // Determine if the selected style is bottom wear
  const normalizedStyle = style?.toLowerCase() || '';
  const isBottomWear = 
    normalizedStyle.includes('pant') || 
    normalizedStyle.includes('trouser') || 
    normalizedStyle.includes('jeans') ||
    normalizedStyle.includes('short') ||
    normalizedStyle.includes('palazzo') ||
    normalizedStyle.includes('salwar') ||
    normalizedStyle.includes('legging') ||
    normalizedStyle.includes('dhoti') ||
    normalizedStyle.includes('chinos');

  // Determine if the selected style has sleeves/neck (top wear, dresses, etc.)
  const hasNeckAndSleeves = 
    normalizedStyle.includes('shirt') ||
    normalizedStyle.includes('blouse') ||
    normalizedStyle.includes('kurti') ||
    normalizedStyle.includes('kurta') ||
    normalizedStyle.includes('dress') ||
    normalizedStyle.includes('gown') ||
    normalizedStyle.includes('top') ||
    normalizedStyle.includes('tunic') ||
    normalizedStyle.includes('jacket') ||
    normalizedStyle.includes('blazer') ||
    normalizedStyle.includes('suit') ||
    normalizedStyle.includes('sherwani') ||
    normalizedStyle.includes('anarkali') ||
    normalizedStyle.includes('kameez');

  const handleNext = () => {
    onNext({ outfitDetails: formData });
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
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Design Requirements</h1>
          <p className="text-sm text-[#7A1F1F]/70 mt-1">{style} design and customization</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="space-y-5">
          {/* Selected Garment - Display Only */}
          {category && style && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]">
              <label className="block text-xs font-medium text-[#7A1F1F]/70 mb-1">Selected Garment</label>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#7A1F1F]">{category}'s</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="font-semibold text-[#D4AF37]">{style}</span>
              </div>
            </div>
          )}

          {/* Inspiration Images */}
          {inspirationImages.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-[#7A1F1F] mb-3">Design Inspiration</label>
              <div className="grid grid-cols-3 gap-3">
                {inspirationImages.map((img, index) => (
                  <div key={index} className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all">
                    <img
                      src={img}
                      alt={`${style} inspiration ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23F5E6D3" width="200" height="200"/%3E%3Ctext fill="%237A1F1F" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Reference Images */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Your Design Reference (Optional)</label>
            <input
              type="file"
              id="reference-upload"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="reference-upload"
              className="w-full py-4 rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-white/60 hover:bg-white/80 hover:border-[#D4AF37] transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-8 h-8 text-[#7A1F1F]/60" />
              <span className="text-sm text-[#7A1F1F]/70">Upload Reference Images</span>
              <span className="text-xs text-[#7A1F1F]/50">Click to select images</span>
            </label>
            
            {/* Image Previews */}
            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Reference ${index + 1}`}
                      className="w-full h-24 object-cover rounded-xl border-2 border-[#D4AF37]/30"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fabric Provided Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/70 border border-[#D4AF37]/30">
            <span className="text-sm font-medium text-[#7A1F1F]">Fabric Provided by Customer</span>
            <button
              onClick={() => setFormData({ ...formData, fabricProvided: !formData.fabricProvided })}
              className={`w-14 h-7 rounded-full transition-all ${
                formData.fabricProvided ? 'bg-[#D4AF37]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                formData.fabricProvided ? 'translate-x-7' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          {orderType === 'fresh' && (
            <>
              {/* Neck Style */}
              {hasNeckAndSleeves && (
                <div>
                  <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Neck Style</label>
                  <select
                    value={formData.neckStyle}
                    onChange={(e) => setFormData({ ...formData, neckStyle: e.target.value })}
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  >
                    <option value="">Select neck style</option>
                    {neckStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sleeve Type */}
              {hasNeckAndSleeves && (
                <div>
                  <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Sleeve Type</label>
                  <select
                    value={formData.sleeveType}
                    onChange={(e) => setFormData({ ...formData, sleeveType: e.target.value })}
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  >
                    <option value="">Select sleeve type</option>
                    {sleeveTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Length</label>
                <select
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                >
                  <option value="">Select length</option>
                  {lengths.map((len) => (
                    <option key={len} value={len}>{len}</option>
                  ))}
                </select>
              </div>

              {/* Fit Preference */}
              <div>
                <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Fit Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {fitPreferences.map((fit) => (
                    <button
                      key={fit}
                      onClick={() => setFormData({ ...formData, fitPreference: fit })}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                        formData.fitPreference === fit
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white'
                          : 'bg-white/70 text-[#7A1F1F] border border-[#D4AF37]/30'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Waist Style */}
              {isBottomWear && (
                <div>
                  <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Waist Style</label>
                  <select
                    value={formData.waistStyle}
                    onChange={(e) => setFormData({ ...formData, waistStyle: e.target.value })}
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  >
                    <option value="">Select waist style</option>
                    {waistStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Pocket Style */}
              {isBottomWear && (
                <div>
                  <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Pocket Style</label>
                  <select
                    value={formData.pocketStyle}
                    onChange={(e) => setFormData({ ...formData, pocketStyle: e.target.value })}
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  >
                    <option value="">Select pocket style</option>
                    {pocketStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Closure Type */}
              {isBottomWear && (
                <div>
                  <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Closure Type</label>
                  <select
                    value={formData.closureType}
                    onChange={(e) => setFormData({ ...formData, closureType: e.target.value })}
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  >
                    <option value="">Select closure type</option>
                    {closureTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          {orderType === 'alteration' && (
            <div>
              <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Alteration Type</label>
              <div className="grid grid-cols-2 gap-2">
                {alterationTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, alterationType: type })}
                    className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                      formData.alterationType === type
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white'
                        : 'bg-white/70 text-[#7A1F1F] border border-[#D4AF37]/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Special Instructions</label>
            <textarea
              placeholder="Add any special requirements or notes..."
              value={formData.specialInstructions}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              rows={4}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] resize-none"
            />
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