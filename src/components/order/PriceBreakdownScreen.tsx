import { useState } from 'react';
import { ArrowLeft, ChevronDown, Info, ShoppingBag, Sparkles, Shield, Check } from 'lucide-react';

interface PriceBreakdownScreenProps {
  orderData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function PriceBreakdownScreen({ orderData, onNext, onBack }: PriceBreakdownScreenProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Calculate pricing
  const tailorBasePrice = orderData.selectedTailor?.basePrice || 1500;
  
  // Calculate customization charges
  const customizations = orderData.outfitDetails?.customizations || {};
  let customizationTotal = 0;
  
  const customizationPrices: Record<string, Record<string, number>> = {
    sleeveLength: {
      'full': 0,
      'half': 0,
      'sleeveless': 100,
      '3/4': 50
    },
    neckStyle: {
      'round': 0,
      'v-neck': 150,
      'collar': 200,
      'boat': 100,
      'halter': 250
    },
    embroidery: {
      'none': 0,
      'light': 500,
      'medium': 1000,
      'heavy': 2000
    },
    lining: {
      'none': 0,
      'partial': 300,
      'full': 600
    },
    pockets: {
      'none': 0,
      'side': 150,
      'front': 200,
      'both': 300
    }
  };

  // Calculate customization charges
  Object.keys(customizations).forEach(key => {
    const value = customizations[key];
    if (customizationPrices[key] && customizationPrices[key][value] !== undefined) {
      customizationTotal += customizationPrices[key][value];
    }
  });

  // Add material charges if provided
  if (orderData.outfitDetails?.materialProvided === 'no') {
    customizationTotal += orderData.outfitDetails?.materialCost || 0;
  }

  const subtotal = tailorBasePrice + customizationTotal;
  const expressDeliveryCharge = expressDelivery ? 500 : 0; // ₹500 for 24-48 hour delivery
  const platformFee = Math.round(subtotal * 0.10); // 10% platform fee
  const gst = Math.round((subtotal + expressDeliveryCharge) * 0.18); // 18% GST
  const finalTotal = subtotal + expressDeliveryCharge + platformFee + gst;

  const handleProceedToPayment = () => {
    const pricingData = {
      tailorBasePrice,
      customizationCharges: customizationTotal,
      expressDeliveryCharge,
      expressDelivery,
      subtotal,
      platformFee,
      gst,
      finalTotal,
      priceLocked: true,
      lockedAt: new Date().toISOString()
    };

    onNext({ pricing: pricingData });
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
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-[#7A1F1F]" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-[#7A1F1F]">Order Summary</h1>
            <p className="text-xs text-[#7A1F1F]/70 mt-1">Review your pricing</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        <div className="max-w-md mx-auto space-y-4">
          {/* Total Amount Card - Hero Element */}
          <div className="relative bg-gradient-to-br from-[#D4AF37] via-[#C5A028] to-[#B8941F] rounded-3xl p-8 shadow-2xl border border-white/30 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-1 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <p className="text-white/95 text-xs font-semibold tracking-widest uppercase">Total Amount</p>
              <div className="py-2">
                <p className="text-6xl font-black text-white tracking-tight drop-shadow-lg">₹{finalTotal}</p>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-md border border-white/30 shadow-lg">
                <Check className="w-4 h-4 text-white" />
                <p className="text-white text-xs font-semibold">100% Upfront Payment</p>
              </div>
            </div>
          </div>

          {/* Tailor Info Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#7A1F1F] via-[#8A2626] to-[#9A2F2F] p-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm tracking-wide">Selected Tailor</h3>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-b from-white to-gray-50/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-bold text-[#7A1F1F] text-lg leading-tight">{orderData.selectedTailor?.name}</p>
                  <p className="text-sm text-[#7A1F1F]/70 mt-1.5 leading-snug">{orderData.selectedTailor?.shopName}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} className="text-[#D4AF37] text-sm drop-shadow-sm">★</span>
                      ))}
                    </div>
                    <span className="text-xs text-[#7A1F1F]/60 ml-1 font-medium">(4.8)</span>
                  </div>
                </div>
                <div className="text-right bg-gradient-to-br from-[#FFF8E7] via-[#FFF4D6] to-[#FFE4B5] rounded-xl px-4 py-3.5 border border-[#D4AF37]/30 shadow-md">
                  <p className="text-xs text-[#7A1F1F]/70 mb-1.5 font-medium">Base Price</p>
                  <p className="text-2xl font-black text-[#D4AF37] tracking-tight">₹{tailorBasePrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Express Delivery Option - NEW COMPETITIVE FEATURE */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="expressDelivery"
                  checked={expressDelivery}
                  onChange={(e) => setExpressDelivery(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-[#D4AF37] text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
                />
                <div className="flex-1">
                  <label htmlFor="expressDelivery" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#7A1F1F] text-base">⚡ Express Delivery</h3>
                      <span className="px-2 py-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white text-[10px] font-bold rounded-full">
                        24-48 HRS
                      </span>
                    </div>
                    <p className="text-xs text-[#7A1F1F]/70 leading-relaxed">
                      Get your order stitched and delivered within 24-48 hours. Priority queue + guaranteed rush processing.
                    </p>
                  </label>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-sm font-semibold text-[#7A1F1F]">Express Charge:</span>
                    <span className="text-lg font-black text-[#D4AF37]">₹500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown - Collapsible */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full p-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-[#FFF8E7] hover:via-[#FFF4D6] hover:to-white transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 via-[#C5A028]/15 to-[#D4AF37]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <Info className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[#7A1F1F] text-sm">Price Breakdown</h3>
                  <p className="text-xs text-[#7A1F1F]/60 mt-0.5 font-medium">Detailed cost information</p>
                </div>
              </div>
              <div className={`transform transition-all duration-300 ${showBreakdown ? 'rotate-180' : ''} group-hover:scale-110`}>
                <ChevronDown className="w-5 h-5 text-[#7A1F1F]/70" />
              </div>
            </button>

            {showBreakdown && (
              <div className="px-5 pb-6 border-t-2 border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="space-y-5 pt-5">
                  {/* Base Charges Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
                      <p className="text-[10px] font-bold text-[#7A1F1F]/50 uppercase tracking-widest">Base Charges</p>
                      <div className="h-px flex-1 bg-gradient-to-l from-[#D4AF37]/30 to-transparent"></div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white/80 transition-colors">
                      <span className="text-sm text-[#7A1F1F]/90 font-medium">Tailor Stitching</span>
                      <span className="font-bold text-[#7A1F1F] text-base">₹{tailorBasePrice}</span>
                    </div>

                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white/80 transition-colors">
                      <span className="text-sm text-[#7A1F1F]/90 font-medium">Customization Charges</span>
                      <span className="font-bold text-base">
                        {customizationTotal > 0 ? (
                          <span className="text-[#7A1F1F]">₹{customizationTotal}</span>
                        ) : (
                          <span className="text-green-600 text-sm font-bold px-2.5 py-1 bg-green-50 rounded-full">Free</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-3.5 px-4 border-t-2 border-dashed border-gray-300 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                    <span className="text-sm font-bold text-[#7A1F1F]">Subtotal</span>
                    <span className="font-black text-[#7A1F1F] text-xl">₹{subtotal}</span>
                  </div>

                  {/* Additional Charges Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
                      <p className="text-[10px] font-bold text-[#7A1F1F]/50 uppercase tracking-widest">Additional Charges</p>
                      <div className="h-px flex-1 bg-gradient-to-l from-[#D4AF37]/30 to-transparent"></div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white/80 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#7A1F1F]/90 font-medium">Platform Fee</span>
                        <span className="text-[10px] text-[#7A1F1F]/60 font-semibold px-1.5 py-0.5 bg-gray-100 rounded">(10%)</span>
                      </div>
                      <span className="font-bold text-[#7A1F1F] text-base">₹{platformFee}</span>
                    </div>

                    {expressDelivery && (
                      <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#FFF5D6] to-white border border-[#D4AF37]/20">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#7A1F1F] font-semibold">⚡ Express Delivery</span>
                          <span className="text-[9px] text-white font-bold px-1.5 py-0.5 bg-[#D4AF37] rounded">RUSH</span>
                        </div>
                        <span className="font-bold text-[#D4AF37] text-base">₹{expressDeliveryCharge}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white/80 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#7A1F1F]/90 font-medium">GST</span>
                        <span className="text-[10px] text-[#7A1F1F]/60 font-semibold px-1.5 py-0.5 bg-gray-100 rounded">(18%)</span>
                      </div>
                      <span className="font-bold text-[#7A1F1F] text-base">₹{gst}</span>
                    </div>
                  </div>

                  {/* Final Total */}
                  <div className="flex justify-between items-center pt-5 mt-4 border-t-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#FFF8E7] via-[#FFF4D6] to-[#FFEDC4] rounded-2xl p-5 shadow-inner">
                    <div>
                      <p className="text-xs text-[#7A1F1F]/70 mb-1 font-semibold uppercase tracking-wide">Total Amount</p>
                      <p className="text-lg font-black text-[#7A1F1F]">You Pay</p>
                    </div>
                    <span className="text-4xl font-black text-[#D4AF37] drop-shadow-sm">₹{finalTotal}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Details - Collapsible */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <button
              onClick={() => setShowOrderDetails(!showOrderDetails)}
              className="w-full p-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-[#FFF8E7] hover:via-[#FFF4D6] hover:to-white transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A1F1F]/20 via-[#9A2F2F]/15 to-[#7A1F1F]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <ShoppingBag className="w-5 h-5 text-[#7A1F1F]" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-[#7A1F1F] text-sm">Order Details</h3>
                  <p className="text-xs text-[#7A1F1F]/60 mt-0.5 font-medium">View specifications</p>
                </div>
              </div>
              <div className={`transform transition-all duration-300 ${showOrderDetails ? 'rotate-180' : ''} group-hover:scale-110`}>
                <ChevronDown className="w-5 h-5 text-[#7A1F1F]/70" />
              </div>
            </button>

            {showOrderDetails && (
              <div className="px-5 pb-5 border-t-2 border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="grid grid-cols-2 gap-3 pt-5">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3.5 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] text-[#7A1F1F]/60 mb-1.5 font-bold uppercase tracking-wide">Order Type</p>
                    <p className="text-sm font-bold text-[#7A1F1F] capitalize">{orderData.orderType}</p>
                  </div>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3.5 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] text-[#7A1F1F]/60 mb-1.5 font-bold uppercase tracking-wide">Category</p>
                    <p className="text-sm font-bold text-[#7A1F1F] capitalize">{orderData.category}</p>
                  </div>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3.5 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] text-[#7A1F1F]/60 mb-1.5 font-bold uppercase tracking-wide">Style</p>
                    <p className="text-sm font-bold text-[#7A1F1F]">{orderData.style}</p>
                  </div>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3.5 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] text-[#7A1F1F]/60 mb-1.5 font-bold uppercase tracking-wide">Delivery</p>
                    <p className="text-sm font-bold text-[#7A1F1F]">{orderData.selectedTailor?.deliveryTime || '5-7 days'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Proceed to Payment Button */}
          <button
            onClick={handleProceedToPayment}
            className="w-full py-5 rounded-2xl font-black text-white text-lg shadow-2xl transition-all duration-300 bg-gradient-to-r from-[#7A1F1F] via-[#9A2F2F] to-[#D4AF37] hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)] hover:from-[#8A2F2F] hover:via-[#AA3F3F] hover:to-[#E4BF47] transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <span className="tracking-wide">Proceed to Payment</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Security Badge */}
          <div className="relative bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-5 border-2 border-green-200/60 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-transparent"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-green-900 tracking-wide">100% Secure Payment</p>
                <p className="text-xs text-green-700 mt-1 font-semibold">Money-back guarantee • End-to-end encrypted</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
