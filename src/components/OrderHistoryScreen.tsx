import { ArrowLeft, Package, CheckCircle, XCircle, Clock, Search, Filter, Calendar, User, MapPin, DollarSign, Ruler, Scissors, Phone, Mail, Truck, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState } from 'react';

interface OrderHistoryScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function OrderHistoryScreen({ onBack, onNavigate }: OrderHistoryScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Completed' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const allOrders = [
    {
      id: 'ORD-2025-089',
      item: 'Wedding Sherwani',
      category: 'Men',
      orderType: 'Fresh Order',
      tailor: 'Royal Tailors',
      tailorPhone: '+91 98765 12345',
      tailorEmail: 'contact@royaltailors.com',
      tailorAddress: '45 Fashion Street, MG Road, Bangalore - 560001',
      status: 'Completed',
      date: '28 Dec 2025',
      deliveryDate: '05 Jan 2026',
      pickupDate: '05 Jan 2026',
      deliveryTime: '3:00 PM - 5:00 PM',
      amount: '₹8,500',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      designDetails: {
        neckStyle: 'Collar',
        sleeveType: 'Full Sleeve',
        fit: 'Regular',
        length: 'Knee Length',
        fabricProvided: true,
        specialInstructions: 'Wedding sherwani with heavy gold embroidery work'
      },
      measurements: {
        'Chest': '42',
        'Waist': '36',
        'Shoulder': '19',
        'Sleeve Length': '26',
        'Length': '40',
        'Neck': '16'
      },
      pricing: {
        basePrice: '₹6,500',
        fabricCost: '₹1,500',
        customization: '₹500',
        tax: '₹0',
        total: '₹8,500'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2025-076',
      item: 'Designer Blouse',
      category: 'Women',
      orderType: 'Fresh Order',
      tailor: 'Elegant Stitches',
      tailorPhone: '+91 98765 54321',
      tailorEmail: 'info@elegantstitches.com',
      tailorAddress: '23 Designer Lane, Indiranagar, Bangalore - 560038',
      status: 'Completed',
      date: '20 Dec 2025',
      deliveryDate: '27 Dec 2025',
      pickupDate: '27 Dec 2025',
      deliveryTime: '11:00 AM - 1:00 PM',
      amount: '₹1,800',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      designDetails: {
        neckStyle: 'Sweetheart',
        sleeveType: 'Sleeveless',
        fit: 'Slim',
        length: 'Medium',
        fabricProvided: false,
        specialInstructions: 'Back zipper with hook, mirror work on front'
      },
      measurements: {
        'Bust': '36',
        'Underbust': '32',
        'Waist': '30',
        'Shoulder': '15',
        'Blouse Length': '14',
        'Front Neck Depth': '8',
        'Back Neck Depth': '4'
      },
      pricing: {
        basePrice: '₹1,200',
        fabricCost: '₹400',
        customization: '₹200',
        tax: '₹0',
        total: '₹1,800'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2025-045',
      item: 'Formal Suit',
      category: 'Men',
      orderType: 'Alteration',
      tailor: 'Premium Tailoring',
      tailorPhone: '+91 98765 67890',
      tailorEmail: 'support@premiumtailoring.com',
      tailorAddress: '67 Royal Plaza, Koramangala, Bangalore - 560095',
      status: 'Cancelled',
      date: '10 Dec 2025',
      deliveryDate: '15 Dec 2025',
      pickupDate: '15 Dec 2025',
      deliveryTime: '2:00 PM - 4:00 PM',
      amount: '₹3,200',
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      designDetails: {
        neckStyle: 'Collar',
        sleeveType: 'Full Sleeve',
        fit: 'Slim',
        length: 'Long',
        fabricProvided: true,
        specialInstructions: 'Order cancelled due to fabric quality issues'
      },
      measurements: {
        'Chest': '40',
        'Waist': '34',
        'Shoulder': '18',
        'Sleeve Length': '25',
        'Jacket Length': '32'
      },
      pricing: {
        basePrice: '₹2,500',
        fabricCost: '₹500',
        customization: '₹200',
        tax: '₹0',
        total: '₹3,200'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2025-023',
      item: 'Lehenga Choli',
      category: 'Women',
      orderType: 'Fresh Order',
      tailor: 'Elegant Stitches',
      tailorPhone: '+91 98765 54321',
      tailorEmail: 'info@elegantstitches.com',
      tailorAddress: '23 Designer Lane, Indiranagar, Bangalore - 560038',
      status: 'Completed',
      date: '25 Nov 2025',
      deliveryDate: '05 Dec 2025',
      pickupDate: '05 Dec 2025',
      deliveryTime: '10:00 AM - 12:00 PM',
      amount: '₹12,000',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      designDetails: {
        neckStyle: 'V-Neck',
        sleeveType: 'Half Sleeve',
        fit: 'Regular',
        length: 'Floor Length',
        fabricProvided: false,
        specialInstructions: 'Heavy embroidery work with sequins and stones'
      },
      measurements: {
        'Bust': '38',
        'Waist': '32',
        'Hip': '40',
        'Blouse Length': '15',
        'Lehenga Length': '42',
        'Shoulder': '16'
      },
      pricing: {
        basePrice: '₹8,000',
        fabricCost: '₹3,000',
        customization: '₹1,000',
        tax: '₹0',
        total: '₹12,000'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2025-012',
      item: 'Kurta Pyjama',
      category: 'Men',
      orderType: 'Fresh Order',
      tailor: 'Royal Tailors',
      tailorPhone: '+91 98765 12345',
      tailorEmail: 'contact@royaltailors.com',
      tailorAddress: '45 Fashion Street, MG Road, Bangalore - 560001',
      status: 'Completed',
      date: '15 Nov 2025',
      deliveryDate: '22 Nov 2025',
      pickupDate: '22 Nov 2025',
      deliveryTime: '4:00 PM - 6:00 PM',
      amount: '₹2,200',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      designDetails: {
        neckStyle: 'Collar',
        sleeveType: 'Full Sleeve',
        fit: 'Regular',
        length: 'Knee Length',
        fabricProvided: true,
        specialInstructions: 'Simple cotton kurta with churidar pyjama'
      },
      measurements: {
        'Chest': '40',
        'Waist': '34',
        'Shoulder': '18',
        'Kurta Length': '38',
        'Sleeve Length': '24',
        'Pyjama Length': '40'
      },
      pricing: {
        basePrice: '₹1,500',
        fabricCost: '₹500',
        customization: '₹200',
        tax: '₹0',
        total: '₹2,200'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: 'ORD-2024-234',
      item: 'Saree Blouse',
      category: 'Women',
      orderType: 'Fresh Order',
      tailor: 'Elegant Stitches',
      tailorPhone: '+91 98765 54321',
      tailorEmail: 'info@elegantstitches.com',
      tailorAddress: '23 Designer Lane, Indiranagar, Bangalore - 560038',
      status: 'Completed',
      date: '05 Nov 2025',
      deliveryDate: '10 Nov 2025',
      pickupDate: '10 Nov 2025',
      deliveryTime: '1:00 PM - 3:00 PM',
      amount: '₹1,500',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      designDetails: {
        neckStyle: 'Round',
        sleeveType: '3/4 Sleeve',
        fit: 'Regular',
        length: 'Medium',
        fabricProvided: false,
        specialInstructions: 'Traditional design with piping work'
      },
      measurements: {
        'Bust': '38',
        'Underbust': '34',
        'Waist': '32',
        'Shoulder': '16',
        'Sleeve Length': '18',
        'Blouse Length': '15'
      },
      pricing: {
        basePrice: '₹1,000',
        fabricCost: '₹300',
        customization: '₹200',
        tax: '₹0',
        total: '₹1,500'
      },
      deliveryAddress: '123 MG Road, Bangalore, Karnataka - 560001'
    },
  ];

  // Filter orders based on selected filter
  const getFilteredOrders = () => {
    let filtered = allOrders;
    
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(order => order.status === selectedFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.tailor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredOrders();

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
        
        <h1 className="text-2xl font-serif text-[#7A1F1F] mt-4">Order History</h1>
        <p className="text-sm text-[#7A1F1F]/70 mt-1">View all your past orders</p>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A1F1F]/40" />
          <input
            type="text"
            placeholder="Search by order ID, item, or tailor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-sm text-[#7A1F1F] placeholder:text-[#7A1F1F]/40"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 px-6 mb-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border-2 border-[#D4AF37]/20">
          <div className="grid grid-cols-3 gap-2">
            {(['All', 'Completed', 'Cancelled'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md'
                    : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 340px)' }}>
        <div className="space-y-4">
          {filteredOrders.map((order) => {
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

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center mb-4">
              <Package className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-serif text-[#7A1F1F] mb-2">No Orders Found</h3>
            <p className="text-sm text-[#7A1F1F]/70 text-center">
              {searchQuery ? 'Try adjusting your search' : 'No orders match the selected filter'}
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
    </div>
  );
}
