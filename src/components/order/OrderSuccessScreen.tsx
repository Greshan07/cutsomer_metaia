import { useState } from 'react';
import { Check, Package, Clock, MapPin, User, Phone, Mail, Scissors, FileText, Download, Home } from 'lucide-react';

interface OrderSuccessScreenProps {
  orderData: any;
  onComplete: () => void;
}

export function OrderSuccessScreen({ orderData, onComplete }: OrderSuccessScreenProps) {
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  // Generate order details
  const orderNumber = 'MET' + Date.now().toString().slice(-8);
  const orderDate = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const estimatedDeliveryDays = orderData.selectedTailor?.deliveryTime?.match(/\d+/)?.[0] || 10;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + parseInt(estimatedDeliveryDays));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #7A1F1F 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen overflow-y-auto pb-6">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#C5A028] px-6 pt-12 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl animate-scale-in">
              <Check className="w-12 h-12 text-[#D4AF37]" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h1>
          <p className="text-white/90 text-sm">Thank you for your order</p>
          <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <p className="text-white text-xs">Order ID: <span className="font-bold">{orderNumber}</span></p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 -mt-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-3xl shadow-xl p-5 mb-4 border-2 border-[#D4AF37]/30">
            <h2 className="text-lg font-bold text-[#7A1F1F] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              Order Summary
            </h2>
            
            {/* Item Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 p-3 bg-[#F5E6D3]/50 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-6 h-6 text-[#7A1F1F]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#7A1F1F] capitalize">
                    {orderData.orderType || 'Fresh Stitching'} - {orderData.style || 'Custom Garment'}
                  </p>
                  <p className="text-sm text-[#7A1F1F]/70 mt-1">
                    {orderData.category}'s wear
                  </p>
                  {orderData.outfitDetails?.fitPreference && (
                    <p className="text-xs text-[#7A1F1F]/60 mt-1">
                      Fit: {orderData.outfitDetails.fitPreference}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-[#D4AF37]/20 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#7A1F1F]/70">Base Price</span>
                <span className="text-[#7A1F1F] font-medium">₹{orderData.priceEstimate?.basePrice || orderData.priceEstimate?.total || 0}</span>
              </div>
              {orderData.priceEstimate?.urgencyCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A1F1F]/70">Urgency Charge</span>
                  <span className="text-[#7A1F1F] font-medium">₹{orderData.priceEstimate.urgencyCharge}</span>
                </div>
              )}
              {orderData.priceEstimate?.taxes > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A1F1F]/70">Taxes</span>
                  <span className="text-[#7A1F1F] font-medium">₹{orderData.priceEstimate.taxes}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-[#D4AF37]/20">
                <span className="font-bold text-[#7A1F1F]">Total Paid</span>
                <span className="text-xl font-bold text-[#D4AF37]">
                  ₹{orderData.priceEstimate?.finalPrice || orderData.priceEstimate?.total || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-3xl shadow-xl p-5 mb-4 border-2 border-[#D4AF37]/30">
            <h2 className="text-lg font-bold text-[#7A1F1F] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              Delivery Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-xl">
                <Package className="w-5 h-5 text-[#7A1F1F]" />
                <div>
                  <p className="text-sm font-semibold text-[#7A1F1F]">Estimated Delivery</p>
                  <p className="text-xs text-[#7A1F1F]/70 mt-0.5">{formattedDeliveryDate} ({estimatedDeliveryDays} days)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-[#F5E6D3]/50 rounded-xl">
                <MapPin className="w-5 h-5 text-[#7A1F1F]" />
                <div>
                  <p className="text-sm font-semibold text-[#7A1F1F]">Order Status</p>
                  <p className="text-xs text-green-600 font-medium mt-0.5">● Confirmed & Processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tailor Information */}
          {orderData.selectedTailor && (
            <div className="bg-white rounded-3xl shadow-xl p-5 mb-4 border-2 border-[#D4AF37]/30">
              <h2 className="text-lg font-bold text-[#7A1F1F] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#D4AF37]" />
                Your Tailor
              </h2>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center text-white font-bold text-lg">
                  {orderData.selectedTailor.name?.charAt(0) || 'T'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#7A1F1F]">{orderData.selectedTailor.name || 'Master Tailor'}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[#D4AF37]">★</span>
                    <span className="text-sm font-medium text-[#7A1F1F]">{orderData.selectedTailor.rating || '4.5'}</span>
                    <span className="text-xs text-[#7A1F1F]/60">({orderData.selectedTailor.reviews || '100'}+ reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-3 border-t border-[#D4AF37]/20">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-[#7A1F1F]/70" />
                  <span className="text-[#7A1F1F]">{orderData.selectedTailor.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[#7A1F1F]/70" />
                  <span className="text-[#7A1F1F]/70">{orderData.selectedTailor.distance || '2.5 km away'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div className="bg-white rounded-3xl shadow-xl p-5 mb-4 border-2 border-[#D4AF37]/30">
            <h2 className="text-lg font-bold text-[#7A1F1F] mb-4">What's Next?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-sm font-bold">
                    ✓
                  </div>
                  <div className="w-0.5 h-full bg-[#D4AF37]/30 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-[#7A1F1F]">Order Confirmed</p>
                  <p className="text-xs text-[#7A1F1F]/60 mt-1">{orderDate}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#7A1F1F] text-sm font-bold">
                    2
                  </div>
                  <div className="w-0.5 h-full bg-[#D4AF37]/30 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-[#7A1F1F]">Tailor Will Contact You</p>
                  <p className="text-xs text-[#7A1F1F]/60 mt-1">Within 24 hours for measurements</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center text-[#7A1F1F]/60 text-sm font-bold">
                    3
                  </div>
                  <div className="w-0.5 h-full bg-[#D4AF37]/30 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-[#7A1F1F]/70">Stitching Begins</p>
                  <p className="text-xs text-[#7A1F1F]/60 mt-1">After measurements are confirmed</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center text-[#7A1F1F]/60 text-sm font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#7A1F1F]/70">Ready for Delivery</p>
                  <p className="text-xs text-[#7A1F1F]/60 mt-1">By {formattedDeliveryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alteration Guarantee - HIGHLIGHTED FEATURE */}
          <div className="bg-gradient-to-r from-[#7A1F1F] to-[#9A2F2F] rounded-2xl p-5 mb-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-base mb-1">✨ 2 FREE Alterations Included!</p>
                <p className="text-white/90 text-xs leading-relaxed">
                  Not happy with the fit? Get 2 complimentary alterations within 12 months. No questions asked. Your perfect fit is guaranteed!
                </p>
              </div>
            </div>
          </div>

          {/* Home Delivery Guarantee */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl p-4 mb-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-white flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Free Home Delivery</p>
                <p className="text-white/90 text-xs">Your order will be delivered right to your doorstep</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-[#FFF9E5] to-[#FFF5D6] rounded-2xl p-4 mb-4 border border-[#D4AF37]/20">
            <p className="text-sm font-semibold text-[#7A1F1F] mb-2">📌 Important Notes:</p>
            <ul className="space-y-1 text-xs text-[#7A1F1F]/70">
              <li>• A confirmation message has been sent to your registered mobile number</li>
              <li>• Tailor will contact you for final measurement confirmation</li>
              <li>• Track your order progress in "My Orders" section</li>
              <li>• Need help? WhatsApp us at <span className="font-semibold text-[#D4AF37]">+91 98765-43210</span></li>
              <li>• Designer consultation available via call - just ask!</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onComplete}
              className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
            
            <button
              className="w-full py-4 bg-white text-[#7A1F1F] border-2 border-[#D4AF37]/30 rounded-2xl font-semibold hover:bg-[#F5E6D3]/50 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Order Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
