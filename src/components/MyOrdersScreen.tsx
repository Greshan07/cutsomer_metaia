import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, X, User, MapPin, Calendar, DollarSign, Ruler, Scissors, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState } from 'react';
import { BottomNav } from './BottomNav';

interface MyOrdersScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function MyOrdersScreen({ onBack, onNavigate }: MyOrdersScreenProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const orders = [
    {
      id: 'ORD-2024-001',
      item: 'Formal Suit',
      category: 'Men',
      orderType: 'Fresh Order',
      tailor: 'Royal Tailors',
      tailorPhone: '+91 98765 12345',
      tailorEmail: 'contact@royaltailors.com',
      tailorAddress: '45 Fashion Street, MG Road, Bangalore - 560001',
      status: 'In Progress',
      date: '12 Jan 2026',
      deliveryDate: '18 Jan 2026',
      pickupDate: '18 Jan 2026',
      deliveryTime: '10:00 AM - 12:00 PM',
      amount: '₹2,500',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      designDetails: {
        neckStyle: 'Collar',
        sleeveType: 'Full Sleeve',
        fit: 'Slim',
        length: 'Long',
        fabricProvided: true,
        specialInstructions: 'Please use dark navy blue fabric with fine texture'
      },
      measurements: {
        'Chest': '40',
        'Waist': '34',
        'Shoulder': '18',
        'Sleeve Length': '25',
        'Jacket Length': '32',
        'Hip': '42',
        'Thigh': '24',
        'Inseam Length': '32'
      },
      pricing: {
        basePrice: '₹1,800',
        fabricCost: '₹500',
        customization: '₹200',
        tax: '₹0',
        total: '₹2,500'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2024-002',
      item: 'Saree Blouse',
      category: 'Women',
      orderType: 'Fresh Order',
      tailor: 'Elegant Stitches',
      tailorPhone: '+91 98765 54321',
      tailorEmail: 'info@elegantstitches.com',
      tailorAddress: '23 Designer Lane, Indiranagar, Bangalore - 560038',
      status: 'Completed',
      date: '05 Jan 2026',
      deliveryDate: '10 Jan 2026',
      pickupDate: '10 Jan 2026',
      deliveryTime: '2:00 PM - 4:00 PM',
      amount: '₹1,200',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      designDetails: {
        neckStyle: 'V-Neck',
        sleeveType: 'Half Sleeve',
        fit: 'Regular',
        length: 'Medium',
        fabricProvided: false,
        specialInstructions: 'Traditional design with golden border work'
      },
      measurements: {
        'Bust': '38',
        'Underbust': '34',
        'Waist': '32',
        'Shoulder': '16',
        'Sleeve Length': '12',
        'Blouse Length': '15',
        'Front Neck Depth': '7',
        'Back Neck Depth': '5'
      },
      pricing: {
        basePrice: '₹800',
        fabricCost: '₹250',
        customization: '₹150',
        tax: '₹0',
        total: '₹1,200'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2023-045',
      item: 'Sherwani',
      category: 'Men',
      orderType: 'Fresh Order',
      tailor: 'Premium Tailoring',
      tailorPhone: '+91 98765 67890',
      tailorEmail: 'support@premiumtailoring.com',
      tailorAddress: '67 Royal Plaza, Koramangala, Bangalore - 560095',
      status: 'Out for Delivery',
      date: '08 Jan 2026',
      deliveryDate: '15 Jan 2026',
      pickupDate: '15 Jan 2026',
      deliveryTime: '11:00 AM - 1:00 PM',
      amount: '₹4,500',
      icon: Truck,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      designDetails: {
        neckStyle: 'Collar',
        sleeveType: 'Full Sleeve',
        fit: 'Regular',
        length: 'Knee Length',
        fabricProvided: true,
        specialInstructions: 'Wedding sherwani with intricate embroidery on collar and cuffs'
      },
      measurements: {
        'Chest': '40',
        'Waist': '34',
        'Shoulder': '18',
        'Sleeve Length': '25',
        'Length': '38',
        'Neck': '16'
      },
      pricing: {
        basePrice: '₹3,500',
        fabricCost: '₹800',
        customization: '₹200',
        tax: '₹0',
        total: '₹4,500'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
  ];

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
          <div className="w-6"></div>
        </div>
        
        <h1 className="text-2xl font-serif text-[#7A1F1F] mt-4">My Orders</h1>
        <p className="text-sm text-[#7A1F1F]/70 mt-1">Track your current orders</p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = order.icon;
            return (
              <div
                key={order.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border-2 border-[#D4AF37]/20 shadow-md hover:shadow-lg transition-all"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">{order.id}</p>
                    <h3 className="text-lg font-semibold text-[#7A1F1F]">{order.item}</h3>
                    <p className="text-sm text-[#7A1F1F]/70">{order.tailor}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${order.bgColor} flex items-center justify-center`}>
                    <StatusIcon className={`w-6 h-6 ${order.color}`} />
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${order.bgColor} mb-4`}>
                  <div className={`w-2 h-2 rounded-full ${order.color.replace('text-', 'bg-')}`}></div>
                  <span className={`text-xs font-semibold ${order.color}`}>{order.status}</span>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/20">
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60">Order Date</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60">Delivery Date</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{order.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60">Amount</p>
                    <p className="text-sm font-semibold text-[#D4AF37]">{order.amount}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-sm font-medium text-[#7A1F1F] hover:text-[#D4AF37] transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (if no orders) */}
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center mb-4">
              <Package className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-serif text-[#7A1F1F] mb-2">No Active Orders</h3>
            <p className="text-sm text-[#7A1F1F]/70 text-center">
              You don't have any orders at the moment
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#7A1F1F] to-[#5A1515] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif text-white">Order Details</h2>
                <p className="text-sm text-white/70 mt-1">{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
              {/* Order Status */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-4 border-2 border-[#D4AF37]/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-[#7A1F1F]">{selectedOrder.item}</h3>
                    <p className="text-sm text-[#7A1F1F]/70">{selectedOrder.category} • {selectedOrder.orderType}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full ${selectedOrder.bgColor}`}>
                    <span className={`text-sm font-semibold ${selectedOrder.color}`}>{selectedOrder.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Order Date</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Delivery Date</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Design Details */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-4 border-2 border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Scissors className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-[#7A1F1F]">Design Requirements</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {selectedOrder.designDetails.neckStyle && (
                    <div>
                      <p className="text-xs text-[#7A1F1F]/60 mb-1">Neck Style</p>
                      <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.designDetails.neckStyle}</p>
                    </div>
                  )}
                  {selectedOrder.designDetails.sleeveType && (
                    <div>
                      <p className="text-xs text-[#7A1F1F]/60 mb-1">Sleeve Type</p>
                      <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.designDetails.sleeveType}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Fit</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.designDetails.fit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Length</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.designDetails.length}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Fabric Provided</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">
                      {selectedOrder.designDetails.fabricProvided ? 'Yes' : 'No'}
                    </p>
                  </div>
                  {selectedOrder.designDetails.specialInstructions && (
                    <div className="col-span-2">
                      <p className="text-xs text-[#7A1F1F]/60 mb-1">Special Instructions</p>
                      <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.designDetails.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Measurements */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-4 border-2 border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-[#7A1F1F]">Measurements</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedOrder.measurements).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-[#7A1F1F]/60 mb-1">{key}</p>
                      <p className="text-sm font-medium text-[#7A1F1F]">{value} inches</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tailor Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-4 border-2 border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-[#7A1F1F]">Tailor Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Name</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.tailor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.tailorPhone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.tailorEmail}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mt-1" />
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.tailorAddress}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-white">Pricing Breakdown</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-white/70">Base Price</p>
                    <p className="text-sm font-medium text-white">{selectedOrder.pricing.basePrice}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-white/70">Fabric Cost</p>
                    <p className="text-sm font-medium text-white">{selectedOrder.pricing.fabricCost}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-white/70">Customization</p>
                    <p className="text-sm font-medium text-white">{selectedOrder.pricing.customization}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-white/70">Tax</p>
                    <p className="text-sm font-medium text-white">{selectedOrder.pricing.tax}</p>
                  </div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold text-white">Total Amount</p>
                      <p className="text-xl font-bold text-[#D4AF37]">{selectedOrder.pricing.total}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold text-[#7A1F1F]">Delivery Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Pickup/Delivery Date</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.pickupDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Time Slot</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A1F1F]/60 mb-1">Delivery Address</p>
                    <p className="text-sm font-medium text-[#7A1F1F]">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transition-all mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab="orders" 
        onNavigate={onNavigate} 
        isDarkMode={false}
      />
    </div>
  );
}