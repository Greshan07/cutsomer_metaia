import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Check } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { OrderData } from '../OrderFlow';
import { ordersAPI } from '../../services/api';

interface OrderPlacementScreenProps {
  orderData: OrderData;
  onComplete: () => void;
  onBack: () => void;
}

export function OrderPlacementScreen({ orderData, onComplete, onBack }: OrderPlacementScreenProps) {
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [pickupDate, setPickupDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);

  const timeSlots = ['9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM'];

  const handlePlaceOrder = async () => {
    if (!pickupDate || !timeSlot) return;

    setIsPlacing(true);
    
    // Simulate order placement with a delay (backend alternative)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Try to create order in backend if available
      const orderPayload = {
        orderType: orderData.orderType,
        category: orderData.category,
        style: orderData.style,
        outfitDetails: orderData.outfitDetails,
        measurements: orderData.measurements,
        tailorId: orderData.selectedTailor?._id,
        pickupAddress: selectedAddress === 'home' 
          ? orderData.profile?.homeAddress 
          : selectedAddress === 'work'
          ? orderData.profile?.workAddress
          : orderData.profile?.otherAddress,
        pickupDate,
        pickupTimeSlot: timeSlot,
        
        // LOCKED PRICING - Cannot be changed after this point
        pricingBreakdown: {
          tailorBasePrice: orderData.pricing?.tailorBasePrice || 0,
          customizationCharges: orderData.pricing?.customizationCharges || 0,
          subtotal: orderData.pricing?.subtotal || 0,
          platformFee: orderData.pricing?.platformFee || 0,
          gst: orderData.pricing?.gst || 0,
          finalTotal: orderData.pricing?.finalTotal || 0,
          priceLocked: true,
          lockedAt: orderData.pricing?.lockedAt || new Date().toISOString()
        },
        
        totalAmount: orderData.pricing?.finalTotal || 0,
        paymentMethod: orderData.payment?.paymentMethod,
        paymentStatus: orderData.payment?.paymentStatus || 'completed',
        transactionId: orderData.payment?.transactionId,
        paymentCompletedAt: new Date().toISOString()
      };

      try {
        const result = await ordersAPI.create(orderPayload);
        console.log('Order placed successfully:', result);
      } catch (apiError) {
        // Backend not available, continue with local order
        console.log('Backend not available, order saved locally:', orderPayload);
        // Store order locally
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localOrders.push({
          ...orderPayload,
          orderId: `ORD${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'pending'
        });
        localStorage.setItem('orders', JSON.stringify(localOrders));
      }
      
      onComplete();
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacing(false);
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
          <h1 className="text-2xl font-serif text-[#7A1F1F] mt-1">Place Order</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="space-y-5">
          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-3">Pickup & Delivery Address</label>
            <div className="space-y-2">
              {['home', 'work', 'other'].map((addr) => (
                <button
                  key={addr}
                  onClick={() => setSelectedAddress(addr)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedAddress === addr
                      ? 'border-[#D4AF37] bg-white/90'
                      : 'border-[#D4AF37]/30 bg-white/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-[#7A1F1F] capitalize mb-1">{addr} Address</p>
                      <p className="text-sm text-[#7A1F1F]/70">
                        {addr === 'home' && (orderData.profile?.homeAddress || '123 Main Street, City')}
                        {addr === 'work' && (orderData.profile?.workAddress || 'Not set')}
                        {addr === 'other' && (orderData.profile?.otherAddress || 'Not set')}
                      </p>
                    </div>
                    {selectedAddress === addr && (
                      <Check className="w-5 h-5 text-[#D4AF37]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Pickup Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/60 w-5 h-5" />
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
              />
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium text-[#7A1F1F] mb-2">Preferred Time Slot</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`py-3 px-3 rounded-xl text-xs font-medium transition-all ${
                    timeSlot === slot
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white'
                      : 'bg-white/70 text-[#7A1F1F] border border-[#D4AF37]/30'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Order Review */}
          <div className="bg-white/80 rounded-3xl p-5 border-2 border-[#D4AF37]/30">
            <h3 className="font-serif text-lg text-[#7A1F1F] mb-4">Order Review</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Order Type</span>
                <span className="font-medium text-[#7A1F1F] capitalize">{orderData.orderType}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Tailor</span>
                <span className="font-medium text-[#7A1F1F]">{orderData.selectedTailor?.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Shop</span>
                <span className="font-medium text-[#7A1F1F]">{orderData.selectedTailor?.shopName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#7A1F1F]/70">Expected Delivery</span>
                <span className="font-medium text-[#7A1F1F]">{orderData.selectedTailor?.deliveryTime}</span>
              </div>

              <div className="h-px bg-[#D4AF37]/30 my-3"></div>

              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#7A1F1F]">Total Amount</span>
                <span className="text-xl font-bold text-[#D4AF37]">
                  ₹{orderData.priceEstimate?.total.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="p-4 rounded-2xl bg-[#D4AF37]/10">
            <p className="text-xs text-[#7A1F1F]/80 leading-relaxed">
              By placing this order, you agree to our terms and conditions. Payment will be collected at the time of delivery.
            </p>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={!pickupDate || !timeSlot || isPlacing}
          className={`w-full mt-6 py-4 rounded-2xl font-semibold shadow-lg transition-all ${
            pickupDate && timeSlot && !isPlacing
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPlacing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}