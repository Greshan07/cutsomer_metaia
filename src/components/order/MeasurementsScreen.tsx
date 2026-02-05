import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Ruler, ChevronDown, Save, Check, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';

interface MeasurementsScreenProps {
  category?: string;
  style?: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

// Measurement field configuration
type MeasurementField = {
  key: string;
  label: string;
  required: boolean;
};

// Define measurement fields based on clothing type
const getMeasurementFields = (category: string, style: string): MeasurementField[] => {
  const normalizedStyle = style.toLowerCase();
  const normalizedCategory = category.toLowerCase();
  
  // MEN - Bottom Wear (Check this FIRST to avoid conflicts)
  if (normalizedCategory.includes('men') && 
      (normalizedStyle.includes('pant') || 
       normalizedStyle.includes('trouser') || 
       normalizedStyle.includes('jeans') || 
       normalizedStyle.includes('chinos') ||
       normalizedStyle.includes('short') ||
       normalizedStyle.includes('pyjama') ||
       normalizedStyle.includes('dhoti'))) {
    return [
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'thigh', label: 'Thigh', required: true },
      { key: 'knee', label: 'Knee', required: true },
      { key: 'bottomOpening', label: 'Bottom Opening', required: true },
      { key: 'outseamLength', label: 'Outseam Length', required: true },
      { key: 'inseamLength', label: 'Inseam Length', required: true },
      { key: 'rise', label: 'Rise', required: true },
      { key: 'seat', label: 'Seat', required: false },
    ];
  }
  
  // MEN - Shirt / T-Shirt / Kurta (but NOT Kurta-Pyjama)
  if (normalizedCategory.includes('men') && 
      !normalizedStyle.includes('pyjama') &&
      (normalizedStyle.includes('shirt') || 
       normalizedStyle.includes('t-shirt') || 
       (normalizedStyle.includes('kurta') && !normalizedStyle.includes('kurta-pyjama')))) {
    return [
      { key: 'chest', label: 'Chest', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'armhole', label: 'Armhole', required: true },
      { key: 'shirtLength', label: 'Shirt Length', required: true },
      { key: 'neck', label: 'Neck', required: true },
      { key: 'bicep', label: 'Bicep', required: false },
      { key: 'cuffOpening', label: 'Cuff Opening', required: false },
    ];
  }
  
  // MEN - Blazer / Jacket / Waistcoat
  if (normalizedCategory.includes('men') && 
      (normalizedStyle.includes('blazer') || 
       normalizedStyle.includes('jacket') || 
       normalizedStyle.includes('waistcoat'))) {
    return [
      { key: 'chest', label: 'Chest', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'jacketLength', label: 'Jacket Length', required: true },
      { key: 'lapelStyle', label: 'Lapel Style', required: false },
    ];
  }
  
  // MEN - Suit (2-Piece / 3-Piece)
  if (normalizedCategory.includes('men') && normalizedStyle.includes('suit')) {
    return [
      { key: 'chest', label: 'Chest', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'jacketLength', label: 'Jacket Length', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'thigh', label: 'Thigh', required: true },
      { key: 'knee', label: 'Knee', required: true },
      { key: 'bottomOpening', label: 'Bottom Opening', required: true },
      { key: 'outseamLength', label: 'Outseam Length', required: true },
      { key: 'inseamLength', label: 'Inseam Length', required: true },
      { key: 'rise', label: 'Rise', required: true },
    ];
  }
  
  // MEN - Sherwani / Ethnic Wear
  if (normalizedCategory.includes('men') && 
      (normalizedStyle.includes('sherwani') || 
       normalizedStyle.includes('pathani') || 
       normalizedStyle.includes('kurta-pyjama') || 
       normalizedStyle.includes('angarkha'))) {
    return [
      { key: 'chest', label: 'Chest', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'length', label: 'Length', required: true },
      { key: 'neck', label: 'Neck', required: true },
    ];
  }
  
  // WOMEN - Bottom Wear (Check FIRST)
  if (normalizedCategory.includes('women') && 
      (normalizedStyle.includes('pant') || 
       normalizedStyle.includes('palazzo') || 
       normalizedStyle.includes('salwar') || 
       normalizedStyle.includes('legging'))) {
    return [
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'thigh', label: 'Thigh', required: true },
      { key: 'length', label: 'Length', required: true },
      { key: 'bottomOpening', label: 'Bottom Opening', required: true },
    ];
  }
  
  // WOMEN - Blouse
  if (normalizedCategory.includes('women') && normalizedStyle.includes('blouse')) {
    return [
      { key: 'bust', label: 'Bust', required: true },
      { key: 'underbust', label: 'Underbust', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'blouseLength', label: 'Blouse Length', required: true },
      { key: 'frontNeckDepth', label: 'Front Neck Depth', required: true },
      { key: 'backNeckDepth', label: 'Back Neck Depth', required: true },
    ];
  }
  
  // WOMEN - Kurti / Top / Tunic / Shirt
  if (normalizedCategory.includes('women') && 
      (normalizedStyle.includes('kurti') || 
       normalizedStyle.includes('top') || 
       normalizedStyle.includes('tunic') || 
       normalizedStyle.includes('shirt'))) {
    return [
      { key: 'bust', label: 'Bust', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'kurtiLength', label: 'Kurti Length', required: true },
    ];
  }
  
  // WOMEN - Skirt / Lehenga
  if (normalizedCategory.includes('women') && 
      (normalizedStyle.includes('skirt') || 
       (normalizedStyle.includes('lehenga') && !normalizedStyle.includes('choli')))) {
    return [
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'skirtLength', label: 'Skirt Length', required: true },
    ];
  }
  
  // WOMEN - Dress / Gown / Jumpsuit
  if (normalizedCategory.includes('women') && 
      (normalizedStyle.includes('dress') || 
       normalizedStyle.includes('gown') || 
       normalizedStyle.includes('jumpsuit') ||
       normalizedStyle.includes('co-ord'))) {
    return [
      { key: 'bust', label: 'Bust', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'dressLength', label: 'Dress Length', required: true },
    ];
  }
  
  // WOMEN - Anarkali / Sharara / Gharara / Salwar Kameez / Lehenga Choli
  if (normalizedCategory.includes('women') && 
      (normalizedStyle.includes('anarkali') || 
       normalizedStyle.includes('sharara') || 
       normalizedStyle.includes('gharara') || 
       normalizedStyle.includes('kameez') ||
       normalizedStyle.includes('choli'))) {
    return [
      { key: 'bust', label: 'Bust', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'length', label: 'Length', required: true },
      { key: 'flare', label: 'Flare', required: false },
    ];
  }
  
  // KIDS - Bottom Wear (Check FIRST)
  if ((normalizedCategory.includes('child') || normalizedCategory.includes('kid')) && 
      (normalizedStyle.includes('pant') || normalizedStyle.includes('short'))) {
    return [
      { key: 'waist', label: 'Waist', required: true },
      { key: 'hip', label: 'Hip', required: true },
      { key: 'length', label: 'Length', required: true },
    ];
  }
  
  // KIDS - Top Wear
  if ((normalizedCategory.includes('child') || normalizedCategory.includes('kid')) && 
      (normalizedStyle.includes('shirt') || 
       normalizedStyle.includes('t-shirt') || 
       normalizedStyle.includes('kurta') || 
       normalizedStyle.includes('top'))) {
    return [
      { key: 'chest', label: 'Chest', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'length', label: 'Length', required: true },
    ];
  }
  
  // KIDS - Ethnic / Party Wear
  if ((normalizedCategory.includes('child') || normalizedCategory.includes('kid')) && 
      (normalizedStyle.includes('ethnic') || 
       normalizedStyle.includes('sherwani') || 
       normalizedStyle.includes('lehenga') || 
       normalizedStyle.includes('ghagra') || 
       normalizedStyle.includes('suit') || 
       normalizedStyle.includes('dress') || 
       normalizedStyle.includes('gown'))) {
    return [
      { key: 'chest', label: 'Chest', required: true },
      { key: 'waist', label: 'Waist', required: true },
      { key: 'shoulder', label: 'Shoulder', required: true },
      { key: 'sleeveLength', label: 'Sleeve Length', required: true },
      { key: 'length', label: 'Length', required: true },
    ];
  }
  
  // Default fallback (should rarely be used)
  console.warn(`No specific measurements found for category: ${category}, style: ${style}`);
  return [
    { key: 'chest', label: 'Chest', required: true },
    { key: 'waist', label: 'Waist', required: true },
    { key: 'shoulder', label: 'Shoulder', required: true },
    { key: 'length', label: 'Length', required: true },
  ];
};

export function MeasurementsScreen({ category = 'Men', style = 'Shirt', onNext, onBack }: MeasurementsScreenProps) {
  const fields = getMeasurementFields(category, style);
  
  // Try to load saved measurements from localStorage
  const getSavedMeasurements = () => {
    try {
      const saved = localStorage.getItem(`measurements_${category}_${style}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading saved measurements:', error);
    }
    return null;
  };
  
  // Initialize measurements state with all possible fields
  const [measurements, setMeasurements] = useState<Record<string, string>>(() => {
    const saved = getSavedMeasurements();
    const initialState: Record<string, string> = {};
    fields.forEach(field => {
      initialState[field.key] = saved?.[field.key] || '';
    });
    return initialState;
  });

  const [requestTailorAssist, setRequestTailorAssist] = useState(false);
  const [fitPreference, setFitPreference] = useState('Regular');
  const [showFitPreference, setShowFitPreference] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [measurementMode, setMeasurementMode] = useState<'new' | 'saved'>('new');
  const [showMeasurementOptions, setShowMeasurementOptions] = useState(false);

  // Get all saved measurements for this category
  const getAllSavedMeasurements = () => {
    const savedMeasurements: { key: string; label: string; data: any }[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('measurements_')) {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          const parts = key.replace('measurements_', '').split('_');
          const cat = parts[0];
          const stl = parts.slice(1).join(' ');
          savedMeasurements.push({
            key,
            label: `${cat} - ${stl}`,
            data
          });
        }
      }
    } catch (error) {
      console.error('Error loading saved measurements:', error);
    }
    return savedMeasurements;
  };

  const savedMeasurementsList = getAllSavedMeasurements();

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements({ ...measurements, [field]: value });
    setValidationError(''); // Clear validation error when user starts typing
  };

  // Save measurements to localStorage
  const handleSaveMeasurements = () => {
    try {
      localStorage.setItem(`measurements_${category}_${style}`, JSON.stringify(measurements));
      setShowSaveConfirmation(true);
      setTimeout(() => setShowSaveConfirmation(false), 2000);
    } catch (error) {
      console.error('Error saving measurements:', error);
    }
  };

  // Load saved measurements
  const handleLoadSavedMeasurements = () => {
    const saved = getSavedMeasurements();
    if (saved) {
      setMeasurements(saved);
    }
  };

  // Validate required measurements
  const validateMeasurements = (): boolean => {
    // If using saved measurements, skip validation (trust the saved data)
    if (measurementMode === 'saved') {
      setValidationError('');
      return true;
    }
    
    const requiredFields = fields.filter(f => f.required);
    const emptyFields = requiredFields.filter(field => !measurements[field.key] || measurements[field.key].trim() === '');
    
    if (emptyFields.length > 0 && !requestTailorAssist) {
      const fieldNames = emptyFields.map(f => f.label).join(', ');
      setValidationError(`Please fill in required fields: ${fieldNames}`);
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleNext = () => {
    if (validateMeasurements() || requestTailorAssist) {
      // Save measurements automatically before proceeding
      handleSaveMeasurements();
      onNext({ measurements: { ...measurements, fitPreference }, requestTailorAssist });
    }
  };

  // Separate required and optional fields
  const requiredFields = fields.filter(f => f.required);
  const optionalFields = fields.filter(f => !f.required);
  
  // Check if there are saved measurements
  const hasSavedMeasurements = getSavedMeasurements() !== null;

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
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Measurements</h1>
          <p className="text-sm text-[#7A1F1F]/70 mt-1">{category} - {style}</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40">
            <Ruler className="w-3.5 h-3.5 text-[#7A1F1F]" />
            <span className="text-xs font-medium text-[#7A1F1F]">
              {requiredFields.length} required + {optionalFields.length} optional fields
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="space-y-5">
          {/* Measurement Mode Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Measurement Source</label>
            <button
              onClick={() => setShowMeasurementOptions(!showMeasurementOptions)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 text-[#7A1F1F] text-left flex items-center justify-between hover:bg-white transition-all"
            >
              <span className="font-medium">
                {measurementMode === 'new' ? '+ Add New Measurements' : '📋 Use Saved Measurements'}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showMeasurementOptions ? 'rotate-180' : ''}`} />
            </button>
            
            {showMeasurementOptions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border-2 border-[#D4AF37]/30 overflow-hidden z-20 max-h-64 overflow-y-auto">
                {/* Add New Option */}
                <button
                  onClick={() => {
                    setMeasurementMode('new');
                    setShowMeasurementOptions(false);
                    // Clear all measurements for new entry
                    const emptyState: Record<string, string> = {};
                    fields.forEach(field => {
                      emptyState[field.key] = '';
                    });
                    setMeasurements(emptyState);
                  }}
                  className={`w-full px-4 py-3.5 text-left hover:bg-[#D4AF37]/10 transition-colors border-b border-[#D4AF37]/20 ${
                    measurementMode === 'new' ? 'bg-[#D4AF37]/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-[#7A1F1F]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#7A1F1F]">Add New Measurements</div>
                      <div className="text-xs text-[#7A1F1F]/60">Enter measurements manually</div>
                    </div>
                  </div>
                </button>

                {/* Saved Measurements List */}
                {savedMeasurementsList.length > 0 ? (
                  <>
                    <div className="px-4 py-2 bg-[#D4AF37]/5">
                      <span className="text-xs font-semibold text-[#7A1F1F]/70">SAVED MEASUREMENTS</span>
                    </div>
                    {savedMeasurementsList.map((saved) => (
                      <button
                        key={saved.key}
                        onClick={() => {
                          setMeasurementMode('saved');
                          setShowMeasurementOptions(false);
                          // Load the saved measurements
                          const loadedData: Record<string, string> = {};
                          fields.forEach(field => {
                            loadedData[field.key] = saved.data[field.key] || '';
                          });
                          setMeasurements(loadedData);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#D4AF37]/10 transition-colors border-b border-[#D4AF37]/10 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                            <Ruler className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#7A1F1F]">{saved.label}</div>
                            <div className="text-xs text-[#7A1F1F]/60">
                              {Object.keys(saved.data).filter(k => saved.data[k]).length} measurements saved
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-xs text-[#7A1F1F]/60">No saved measurements yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#7A1F1F]/20"></div>
            <span className="text-xs text-[#7A1F1F]/50">MEASUREMENT FIELDS</span>
            <div className="flex-1 h-px bg-[#7A1F1F]/20"></div>
          </div>

          {/* Required Measurements */}
          {requiredFields.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F1F]"></div>
                <span className="text-sm font-semibold text-[#7A1F1F]">Required Measurements</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {requiredFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-[#7A1F1F] mb-2">
                      {field.label} (inches) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A1F1F]/60 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="0"
                        value={measurements[field.key] || ''}
                        onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                        className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Optional Measurements */}
          {optionalFields.length > 0 && (
            <>
              <div className="flex items-center gap-2 mt-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm font-semibold text-[#7A1F1F]">Optional Measurements</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {optionalFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-[#7A1F1F] mb-2">
                      {field.label} (inches)
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A1F1F]/60 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="0"
                        value={measurements[field.key] || ''}
                        onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                        className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Fit Preference (for shirts, pants, blazers) */}
          {(style.toLowerCase().includes('shirt') || 
            style.toLowerCase().includes('pant') || 
            style.toLowerCase().includes('trouser') ||
            style.toLowerCase().includes('blazer') ||
            style.toLowerCase().includes('jacket')) && (
            <div className="relative">
              <label className="block text-xs font-medium text-[#7A1F1F] mb-2">Fit Preference</label>
              <button
                onClick={() => setShowFitPreference(!showFitPreference)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#D4AF37]/30 bg-white/80 text-[#7A1F1F] text-left flex items-center justify-between"
              >
                <span>{fitPreference}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFitPreference ? 'rotate-180' : ''}`} />
              </button>
              {showFitPreference && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border-2 border-[#D4AF37]/30 overflow-hidden z-10">
                  {['Slim', 'Regular', 'Loose'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFitPreference(option);
                        setShowFitPreference(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#D4AF37]/10 text-[#7A1F1F] transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Request Tailor Assistance */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/70 border border-[#D4AF37]/30">
            <div>
              <span className="text-sm font-medium text-[#7A1F1F] block">Request Tailor Assistance</span>
              <span className="text-xs text-[#7A1F1F]/60">Tailor will take measurements at pickup</span>
            </div>
            <button
              onClick={() => setRequestTailorAssist(!requestTailorAssist)}
              className={`w-14 h-7 rounded-full transition-all ${
                requestTailorAssist ? 'bg-[#D4AF37]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                requestTailorAssist ? 'translate-x-7' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          {/* Info Box */}
          <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <p className="text-xs text-[#7A1F1F]/80 leading-relaxed">
              💡 Your measurements will be saved for future orders. You can update them anytime from your profile.
            </p>
          </div>
          
          {/* Validation Error */}
          {validationError && (
            <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300">
              <p className="text-xs text-red-600 font-medium">
                ⚠️ {validationError}
              </p>
            </div>
          )}

          {/* Save Confirmation */}
          {showSaveConfirmation && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Measurements saved successfully!</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          {/* Save Measurements Button */}
          <button
            onClick={handleSaveMeasurements}
            className="w-full py-3 rounded-2xl border-2 border-[#D4AF37] bg-white text-[#7A1F1F] font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10 transition-all"
          >
            <Save className="w-5 h-5" />
            Save for Future Use
          </button>

          {/* Continue Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}