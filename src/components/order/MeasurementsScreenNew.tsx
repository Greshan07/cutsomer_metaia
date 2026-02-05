import { useState, useEffect } from 'react';
import { ArrowLeft, User, Ruler, Info, AlertCircle, Check, Save, Upload } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { getMeasurementConfig, calculateCustomizationPrice, type MeasurementField, type CustomizationOption } from '../../config/measurementConfig';

interface MeasurementsScreenProps {
  category?: string;
  style?: string;
  orderData?: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

type MeasurementEntry = 'manual' | 'agent';

export function MeasurementsScreen({ category = '', style = '', orderData, onNext, onBack }: MeasurementsScreenProps) {
  const [entryMethod, setEntryMethod] = useState<MeasurementEntry | null>(null);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [profileName, setProfileName] = useState('');

  // Get configuration for current dress type
  const config = getMeasurementConfig(category, style);

  // Initialize customizations with default values
  useEffect(() => {
    if (config) {
      const defaultCustomizations: Record<string, string> = {};
      config.customizations.forEach((custom) => {
        if (custom.defaultValue) {
          defaultCustomizations[custom.key] = custom.defaultValue;
        }
      });
      setCustomizations(defaultCustomizations);
    }

    // Load saved profiles from localStorage
    const saved = localStorage.getItem('savedMeasurementProfiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }
  }, [config]);

  // Validate measurement value
  const validateMeasurement = (field: MeasurementField, value: string): string | null => {
    if (!value && field.required) {
      return `${field.label} is required`;
    }

    const numValue = parseFloat(value);
    if (value && isNaN(numValue)) {
      return 'Please enter a valid number';
    }

    if (field.min && numValue < field.min) {
      return `Minimum ${field.min}${field.unit}`;
    }

    if (field.max && numValue > field.max) {
      return `Maximum ${field.max}${field.unit}`;
    }

    return null;
  };

  // Handle measurement input change
  const handleMeasurementChange = (key: string, value: string, field: MeasurementField) => {
    setMeasurements({ ...measurements, [key]: value });
    
    // Validate
    const error = validateMeasurement(field, value);
    if (error) {
      setErrors({ ...errors, [key]: error });
    } else {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
  };

  // Handle customization change
  const handleCustomizationChange = (key: string, value: string) => {
    setCustomizations({ ...customizations, [key]: value });
  };

  // Calculate total customization price
  const customizationPrice = config ? calculateCustomizationPrice(config.customizations, customizations) : 0;

  // Validate all measurements
  const validateAll = (): boolean => {
    if (!config) return false;

    const newErrors: Record<string, string> = {};
    let isValid = true;

    config.measurements.forEach((field) => {
      const error = validateMeasurement(field, measurements[field.key]);
      if (error) {
        newErrors[field.key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle next
  const handleNext = () => {
    if (entryMethod === 'agent') {
      // Skip validation for agent method
      onNext({
        measurements: {
          entryMethod: 'agent',
          customizations,
          customizationPrice,
        },
      });
      return;
    }

    if (validateAll()) {
      onNext({
        measurements: {
          entryMethod: 'manual',
          values: measurements,
          customizations,
          customizationPrice,
        },
      });
    }
  };

  // Save profile
  const handleSaveProfile = () => {
    if (!profileName.trim()) return;

    const newProfile = {
      id: Date.now().toString(),
      name: profileName,
      category,
      style,
      measurements,
      customizations,
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedProfiles, newProfile];
    setSavedProfiles(updated);
    localStorage.setItem('savedMeasurementProfiles', JSON.stringify(updated));
    
    setShowSaveDialog(false);
    setProfileName('');
  };

  // Load profile
  const handleLoadProfile = (profile: any) => {
    setMeasurements(profile.measurements);
    setCustomizations(profile.customizations);
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-[#7A1F1F] mb-2">Configuration Not Found</h2>
          <p className="text-gray-600 mb-4">
            Measurement configuration for {category} - {style} is not available.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#7A1F1F] text-white rounded-lg hover:bg-[#D4AF37] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Entry method selection screen
  if (!entryMethod) {
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
            <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Measurement Entry</h1>
            <p className="text-sm text-[#7A1F1F]/70 mt-1">Choose how to provide measurements</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-6 mt-6">
          <div className="space-y-4">
            {/* Manual Entry Option */}
            <div
              onClick={() => setEntryMethod('manual')}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-[#D4AF37]"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A1F1F] to-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#7A1F1F] mb-1">Enter Manually</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    I have my measurements ready and want to enter them now
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[#7A1F1F]/70">
                    <Check className="w-4 h-4" />
                    <span>Instant processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Entry Option */}
            <div
              onClick={() => setEntryMethod('agent')}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-[#D4AF37]"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#7A1F1F] flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#7A1F1F] mb-1">Tailor / Agent Will Take</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Delivery agent or tailor will measure at pickup/visit
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[#7A1F1F]/70">
                    <Check className="w-4 h-4" />
                    <span>Professional measurement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm text-blue-800">
              <p className="font-medium mb-1">Measurement Guide</p>
              <p className="text-xs text-blue-700">
                For manual entry, ensure measurements are taken with a flexible measuring tape. 
                For best results, have someone help you measure.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Agent method screen
  if (entryMethod === 'agent') {
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
            <button onClick={() => setEntryMethod(null)} className="text-[#7A1F1F] hover:text-[#D4AF37] transition-colors">
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
            <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Agent Measurement</h1>
            <p className="text-sm text-[#7A1F1F]/70 mt-1">Select customization preferences</p>
          </div>
        </div>

        {/* Content - Only Customizations */}
        <div className="relative z-10 px-6 pb-24">
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#7A1F1F]">Measurements</h3>
                <p className="text-sm text-gray-600">Will be taken by tailor/agent</p>
              </div>
            </div>
          </div>

          {/* Customizations */}
          {config.customizations.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-[#7A1F1F] mb-4">Customization Options</h3>
              <div className="space-y-6">
                {config.customizations.map((custom) => (
                  <CustomizationField
                    key={custom.key}
                    customization={custom}
                    value={customizations[custom.key] || ''}
                    onChange={(value) => handleCustomizationChange(custom.key, value)}
                  />
                ))}
              </div>

              {customizationPrice > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-700">Customization Charges:</span>
                    <span className="text-[#D4AF37]">₹{customizationPrice}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg z-20">
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-[#7A1F1F] to-[#D4AF37] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Continue to Tailor Selection
          </button>
        </div>
      </div>
    );
  }

  // Manual entry screen
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
          <button onClick={() => setEntryMethod(null)} className="text-[#7A1F1F] hover:text-[#D4AF37] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="w-10 h-10 object-contain"
          />
          <button
            onClick={() => setShowSaveDialog(true)}
            className="text-[#7A1F1F] hover:text-[#D4AF37] transition-colors"
            title="Save Profile"
          >
            <Save className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Enter Measurements</h1>
          <p className="text-sm text-[#7A1F1F]/70 mt-1">{category} - {style}</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-32">
        {/* Load Saved Profile */}
        {savedProfiles.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <h3 className="text-lg font-semibold text-[#7A1F1F] mb-3">Load Saved Profile</h3>
            <div className="space-y-2">
              {savedProfiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleLoadProfile(profile)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-[#D4AF37]/10 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-[#7A1F1F]">{profile.name}</p>
                      <p className="text-xs text-gray-500">{profile.category} - {profile.style}</p>
                    </div>
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Measurements */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-[#7A1F1F] mb-4">Body Measurements</h3>
          <div className="space-y-4">
            {config.measurements.map((field) => (
              <MeasurementField
                key={field.key}
                field={field}
                value={measurements[field.key] || ''}
                error={errors[field.key]}
                onChange={(value) => handleMeasurementChange(field.key, value, field)}
              />
            ))}
          </div>
        </div>

        {/* Customizations */}
        {config.customizations.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#7A1F1F] mb-4">Customization Options</h3>
            <div className="space-y-6">
              {config.customizations.map((custom) => (
                <CustomizationField
                  key={custom.key}
                  customization={custom}
                  value={customizations[custom.key] || ''}
                  onChange={(value) => handleCustomizationChange(custom.key, value)}
                />
              ))}
            </div>

            {customizationPrice > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-gray-700">Customization Charges:</span>
                  <span className="text-[#D4AF37]">₹{customizationPrice}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg z-20">
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#7A1F1F] to-[#D4AF37] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Continue to Tailor Selection
        </button>
      </div>

      {/* Save Profile Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-[#7A1F1F] mb-4">Save Measurement Profile</h3>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter profile name (e.g., My Regular Shirt)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setProfileName('');
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={!profileName.trim()}
                className="flex-1 px-4 py-3 bg-[#7A1F1F] text-white rounded-lg hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Measurement Input Field Component
function MeasurementField({ field, value, error, onChange }: {
  field: MeasurementField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
        <span className="text-gray-500 ml-1">({field.unit})</span>
      </label>
      <input
        type="number"
        step="0.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <div className="mt-1 flex items-center space-x-1 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {field.min && field.max && !error && (
        <p className="mt-1 text-xs text-gray-500">
          Range: {field.min}-{field.max}{field.unit}
        </p>
      )}
    </div>
  );
}

// Customization Field Component
function CustomizationField({ customization, value, onChange }: {
  customization: CustomizationOption;
  value: string;
  onChange: (value: string) => void;
}) {
  if (customization.type === 'radio' || customization.type === 'toggle') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">{customization.label}</label>
        <div className="space-y-2">
          {customization.options.map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                value === option.value
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={customization.key}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-gray-800">{option.label}</span>
              </div>
              {option.price !== undefined && option.price !== 0 && (
                <span className={`text-sm font-medium ${option.price > 0 ? 'text-[#D4AF37]' : 'text-green-600'}`}>
                  {option.price > 0 ? '+' : ''}₹{option.price}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (customization.type === 'select') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{customization.label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
        >
          {customization.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              {option.price !== undefined && option.price !== 0 && ` (${option.price > 0 ? '+' : ''}₹${option.price})`}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
}
