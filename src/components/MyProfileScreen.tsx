import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Edit2, Camera, Ruler, Save, X, Trash2, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { BottomNav } from './BottomNav';

interface MyProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function MyProfileScreen({ onBack, onNavigate }: MyProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);
  const [selectedMeasurementCategory, setSelectedMeasurementCategory] = useState<'top' | 'bottom' | 'ethnic' | 'formal'>('top');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('profileImage') || '';
  });
  
  // Load profile data from authenticated user
  const [profileData, setProfileData] = useState(() => {
    const user = authAPI.getCurrentUser();
    if (user) {
      // Get additional profile data from separate storage
      const saved = localStorage.getItem('userProfile');
      const additionalData = saved ? JSON.parse(saved) : {};
      
      return {
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: additionalData.address || '',
        dateOfBirth: additionalData.dateOfBirth || '',
        gender: additionalData.gender || ''
      };
    }
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: ''
    };
  });

  // Convert date format for display
  const formatDateForDisplay = (date: string) => {
    if (!date) return '';
    if (date.includes('-')) {
      // If it's in YYYY-MM-DD format, convert to DD/MM/YYYY
      const parts = date.split('-');
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return date;
  };

  // Convert date format for input
  const formatDateForInput = (date: string) => {
    if (!date) return '';
    if (date.includes('/')) {
      // If it's in DD/MM/YYYY format, convert to YYYY-MM-DD
      const parts = date.split('/');
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date;
  };

  // Load measurements from localStorage
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem('profileMeasurements');
    return saved ? JSON.parse(saved) : {
      top: {},
      bottom: {},
      ethnic: {},
      formal: {}
    };
  });

  // Save profile data to localStorage
  const saveProfileData = () => {
    try {
      // Save additional profile data
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // Update the main user object as well
      const user = authAPI.getCurrentUser();
      if (user) {
        const updatedUser = {
          ...user,
          name: profileData.name,
          phone: profileData.phone,
          email: profileData.email
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      setShowSaveConfirmation(true);
      setTimeout(() => setShowSaveConfirmation(false), 2000);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
        
        // Update user object with image
        const user = authAPI.getCurrentUser();
        if (user) {
          const updatedUser = { ...user, profileImage: base64String };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        setShowSaveConfirmation(true);
        setTimeout(() => setShowSaveConfirmation(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save measurements to localStorage
  const saveMeasurements = () => {
    try {
      // Filter out empty measurements before saving
      const filteredMeasurements = { ...measurements };
      Object.keys(filteredMeasurements).forEach(category => {
        const categoryData = filteredMeasurements[category];
        const filtered: Record<string, string> = {};
        Object.entries(categoryData).forEach(([key, value]) => {
          if (value && value.toString().trim() !== '') {
            filtered[key] = value.toString();
          }
        });
        filteredMeasurements[category] = filtered;
      });
      
      localStorage.setItem('profileMeasurements', JSON.stringify(filteredMeasurements));
      setMeasurements(filteredMeasurements);
      setShowSaveConfirmation(true);
      setTimeout(() => setShowSaveConfirmation(false), 2000);
      setIsEditingMeasurements(false);
    } catch (error) {
      console.error('Error saving measurements:', error);
    }
  };

  // Delete measurements category
  const deleteMeasurementCategory = () => {
    const updatedMeasurements = { ...measurements };
    updatedMeasurements[selectedMeasurementCategory] = {};
    setMeasurements(updatedMeasurements);
    setIsEditingMeasurements(false); // Exit edit mode after delete
    try {
      localStorage.setItem('profileMeasurements', JSON.stringify(updatedMeasurements));
      setShowDeleteConfirmation(true);
      setTimeout(() => setShowDeleteConfirmation(false), 2000);
    } catch (error) {
      console.error('Error deleting measurements:', error);
    }
  };

  // Update individual measurement
  const updateMeasurement = (label: string, value: string) => {
    const updatedMeasurements = { ...measurements };
    updatedMeasurements[selectedMeasurementCategory] = {
      ...updatedMeasurements[selectedMeasurementCategory],
      [label]: value
    };
    setMeasurements(updatedMeasurements);
  };

  // Get measurements for current category
  const getCurrentMeasurements = () => {
    const categoryMeasurements = measurements[selectedMeasurementCategory] || {};
    return Object.entries(categoryMeasurements).map(([label, value]) => ({
      label,
      value: value ? `${value} inches` : 'Not set'
    }));
  };

  // Define default measurement fields for each category
  const getDefaultMeasurementFields = () => {
    const isFemale = profileData.gender === 'Female';
    
    const defaultFields = {
      top: isFemale ? [
        'Bust', 'Shoulder Width', 'Sleeve Length', 'Armhole', 
        'Blouse Length', 'Front Neck Depth', 'Back Neck Depth', 'Bust Point to Point'
      ] : [
        'Chest', 'Shoulder Width', 'Sleeve Length', 'Armhole', 
        'Shirt Length', 'Collar Size'
      ],
      bottom: isFemale ? [
        'Waist', 'Hip', 'Thigh', 'Knee', 
        'Ankle Opening', 'Inseam Length', 'Outseam Length', 'Rise'
      ] : [
        'Waist', 'Hip', 'Thigh', 'Knee', 
        'Ankle Opening', 'Inseam Length', 'Outseam Length', 'Seat'
      ],
      ethnic: isFemale ? [
        'Bust', 'Waist', 'Hip', 'Shoulder Width', 
        'Blouse Length', 'Sleeve Length', 'Lehenga Length', 'Saree Fall Length'
      ] : [
        'Chest', 'Waist', 'Shoulder Width', 'Kurta Length', 
        'Sleeve Length', 'Pyjama Length'
      ],
      formal: isFemale ? [
        'Bust', 'Waist', 'Hip', 'Shoulder Width', 
        'Dress Length', 'Sleeve Length', 'Underbust', 'Armhole'
      ] : [
        'Chest', 'Waist', 'Shoulder Width', 'Jacket Length', 
        'Sleeve Length', 'Pant Length', 'Collar Size', 'Seat'
      ]
    };
    
    return defaultFields[selectedMeasurementCategory] || [];
  };

  // Get measurements to display (either existing or default fields)
  const getMeasurementsToDisplay = () => {
    const categoryMeasurements = measurements[selectedMeasurementCategory] || {};
    const hasExistingMeasurements = Object.keys(categoryMeasurements).length > 0;
    
    if (isEditingMeasurements) {
      // In edit mode, show all default fields
      const defaultFields = getDefaultMeasurementFields();
      return defaultFields.map(label => ({
        label,
        value: categoryMeasurements[label] || '',
        rawValue: categoryMeasurements[label] || ''
      }));
    } else if (hasExistingMeasurements) {
      // In view mode with data, show existing measurements
      return Object.entries(categoryMeasurements).map(([label, value]) => ({
        label,
        value: value ? `${value} inches` : 'Not set',
        rawValue: value
      }));
    } else {
      // In view mode without data, return empty array (will show empty state)
      return [];
    }
  };

  const currentMeasurements = getCurrentMeasurements();
  const displayMeasurements = getMeasurementsToDisplay();

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
          <button onClick={() => onNavigate('home')} className="text-[#7A1F1F] hover:text-[#D4AF37] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="w-10 h-10 object-contain"
          />
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#7A1F1F] hover:text-[#D4AF37] transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        
        <h1 className="text-2xl font-serif text-[#7A1F1F] mt-4">My Profile</h1>
        <p className="text-sm text-[#7A1F1F]/70 mt-1">Manage your personal information</p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-14 h-14 text-white" />
              )}
            </div>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="profile-image-upload" 
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#7A1F1F] flex items-center justify-center border-2 border-white shadow-lg hover:bg-[#5A1515] transition-colors cursor-pointer"
            >
              <Camera className="w-5 h-5 text-white" />
            </label>
          </div>
          <h2 className="text-xl font-semibold text-[#7A1F1F] mt-4">{profileData.name}</h2>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          {/* Name */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]/20">
            <label className="text-xs font-semibold text-[#7A1F1F]/60 uppercase mb-2 block">Full Name</label>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#D4AF37]" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="flex-1 bg-transparent text-[#7A1F1F] font-medium outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] transition-colors"
                />
              ) : (
                <p className="flex-1 text-[#7A1F1F] font-medium">{profileData.name}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]/20">
            <label className="text-xs font-semibold text-[#7A1F1F]/60 uppercase mb-2 block">Phone Number</label>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#D4AF37]" />
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="flex-1 bg-transparent text-[#7A1F1F] font-medium outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] transition-colors"
                />
              ) : (
                <p className="flex-1 text-[#7A1F1F] font-medium">{profileData.phone}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]/20">
            <label className="text-xs font-semibold text-[#7A1F1F]/60 uppercase mb-2 block">Email Address</label>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#D4AF37]" />
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="flex-1 bg-transparent text-[#7A1F1F] font-medium outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] transition-colors"
                />
              ) : (
                <p className="flex-1 text-[#7A1F1F] font-medium">{profileData.email}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]/20">
            <label className="text-xs font-semibold text-[#7A1F1F]/60 uppercase mb-2 block">Address</label>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37] mt-1" />
              {isEditing ? (
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  rows={2}
                  className="flex-1 bg-transparent text-[#7A1F1F] font-medium outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] transition-colors resize-none"
                />
              ) : (
                <p className="flex-1 text-[#7A1F1F] font-medium">{profileData.address}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]/20">
            <label className="text-xs font-semibold text-[#7A1F1F]/60 uppercase mb-2 block">Date of Birth</label>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              {isEditing ? (
                <input
                  type="date"
                  value={formatDateForInput(profileData.dateOfBirth)}
                  onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className="flex-1 bg-transparent text-[#7A1F1F] font-medium outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] transition-colors py-1 cursor-pointer"
                  style={{
                    colorScheme: 'light',
                  }}
                />
              ) : (
                <p className="flex-1 text-[#7A1F1F] font-medium">{formatDateForDisplay(profileData.dateOfBirth)}</p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#D4AF37]/20">
            <label className="text-xs font-semibold text-[#7A1F1F]/60 uppercase mb-2 block">Gender</label>
            {isEditing ? (
              <div className="flex gap-3">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setProfileData({ ...profileData, gender })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      profileData.gender === gender
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white'
                        : 'bg-white/60 text-[#7A1F1F] border border-[#D4AF37]/30'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[#7A1F1F] font-medium">{profileData.gender}</p>
            )}
          </div>

          {/* Saved Measurements */}
          <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-2xl p-5 border-2 border-[#D4AF37]/30 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-lg font-semibold text-white">Saved Measurements</h3>
            </div>
            
            {/* Measurement Type Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedMeasurementCategory('top')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedMeasurementCategory === 'top'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white/10 text-white/70 border border-[#D4AF37]/20'
                }`}
              >
                Top
              </button>
              <button
                onClick={() => setSelectedMeasurementCategory('bottom')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedMeasurementCategory === 'bottom'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white/10 text-white/70 border border-[#D4AF37]/20'
                }`}
              >
                Bottom
              </button>
              <button
                onClick={() => setSelectedMeasurementCategory('ethnic')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedMeasurementCategory === 'ethnic'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white/10 text-white/70 border border-[#D4AF37]/20'
                }`}
              >
                Ethnic
              </button>
              <button
                onClick={() => setSelectedMeasurementCategory('formal')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedMeasurementCategory === 'formal'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white/10 text-white/70 border border-[#D4AF37]/20'
                }`}
              >
                Formal
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {displayMeasurements.length > 0 ? (
                displayMeasurements.map((measurement, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-[#D4AF37]/20">
                    <p className="text-xs text-white/70 mb-1">{measurement.label}</p>
                    {isEditingMeasurements ? (
                      <input
                        type="number"
                        value={measurement.rawValue || ''}
                        onChange={(e) => updateMeasurement(measurement.label, e.target.value)}
                        placeholder="0"
                        className="w-full bg-white/20 text-white font-semibold text-base px-2 py-1 rounded-lg outline-none border border-[#D4AF37]/40 focus:border-[#D4AF37]"
                      />
                    ) : (
                      <p className="text-base font-semibold text-white">{measurement.value}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-white/60 text-sm">No measurements saved for this category</p>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2 mt-4">
              {isEditingMeasurements ? (
                <>
                  <button 
                    onClick={saveMeasurements}
                    className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-white font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Measurements
                  </button>
                  <button 
                    onClick={() => setIsEditingMeasurements(false)}
                    className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditingMeasurements(true)}
                    className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-white font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Update Measurements
                  </button>
                  {currentMeasurements.length > 0 && (
                    <button 
                      onClick={deleteMeasurementCategory}
                      className="w-full py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-white font-semibold transition-all flex items-center justify-center gap-2 border border-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Category
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={() => saveProfileData()}
            className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Save Changes
          </button>
        )}
        
        {/* Save Confirmation */}
        {showSaveConfirmation && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">Saved successfully!</span>
          </div>
        )}
        
        {/* Delete Confirmation */}
        {showDeleteConfirmation && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-medium">Deleted successfully!</span>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab="profile" 
        onNavigate={onNavigate} 
        isDarkMode={false}
      />
    </div>
  );
}