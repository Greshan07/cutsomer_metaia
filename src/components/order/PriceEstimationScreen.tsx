import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { OrderData } from '../OrderFlow';

interface PriceEstimationScreenProps {
  orderData: OrderData;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function PriceEstimationScreen({ orderData, onNext, onBack }: PriceEstimationScreenProps) {
  // Mock price calculation
  const stitchingCost = orderData.orderType === 'fresh' ? 1500 : 500;
  const pickupCharge = 50;
  const deliveryCharge = 50;
  const taxRate = 0.18;
  const subtotal = stitchingCost + pickupCharge + deliveryCharge;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleNext = () => {
    onNext({ priceEstimate: { stitchingCost, pickupCharge, deliveryCharge, tax, total } });
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
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Price Estimation</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 220px)' }}>
        <div className="bg-white/80 rounded-3xl p-6 shadow-xl border-2 border-[#D4AF37]/30">
          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-serif text-[#7A1F1F] mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Order Type</span>
                <span className="font-medium text-[#7A1F1F] capitalize">{orderData.orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Tailor</span>
                <span className="font-medium text-[#7A1F1F]">{orderData.selectedTailor?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Delivery Time</span>
                <span className="font-medium text-[#7A1F1F]">{orderData.selectedTailor?.deliveryTime || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#D4AF37]/30 my-6"></div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#7A1F1F]/70">{orderData.orderType === 'fresh' ? 'Stitching Cost' : 'Alteration Cost'}</span>
              <span className="font-medium text-[#7A1F1F]">₹{stitchingCost}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#7A1F1F]/70">Pickup Charge</span>
              <span className="font-medium text-[#7A1F1F]">₹{pickupCharge}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#7A1F1F]/70">Delivery Charge</span>
              <span className="font-medium text-[#7A1F1F]">₹{deliveryCharge}</span>
            </div>

            <div className="h-px bg-[#D4AF37]/30"></div>

            <div className="flex justify-between items-center">
              <span className="text-[#7A1F1F]/70">Subtotal</span>
              <span className="font-medium text-[#7A1F1F]">₹{subtotal}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#7A1F1F]/70">Tax (18% GST)</span>
              <span className="font-medium text-[#7A1F1F]">₹{tax.toFixed(2)}</span>
            </div>

            <div className="h-px bg-[#D4AF37]/30"></div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-serif text-[#7A1F1F]">Total Amount</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A028] bg-clip-text text-transparent">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 rounded-2xl bg-[#D4AF37]/10">
            <p className="text-xs text-[#7A1F1F]/80 leading-relaxed">
              💡 This is an estimated price. Final amount may vary based on fabric quality and additional requirements.
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
        >
          Continue to Place Order
        </button>
      </div>
    </div>
  );
}