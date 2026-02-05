import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, DollarSign, Building2, Check, Lock } from 'lucide-react';

interface PaymentScreenProps {
  orderData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'wallet' | 'cod' | 'netbanking';

export function PaymentScreen({ orderData, onNext, onBack }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [showProcessing, setShowProcessing] = useState(false);

  const totalAmount = orderData.pricing?.finalTotal || orderData.priceEstimate?.finalPrice || 0;

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      icon: CreditCard,
      title: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Rupay'
    },
    {
      id: 'upi' as PaymentMethod,
      icon: Smartphone,
      title: 'UPI',
      description: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'wallet' as PaymentMethod,
      icon: Wallet,
      title: 'Wallets',
      description: 'Paytm, PhonePe, Amazon Pay'
    },
    {
      id: 'netbanking' as PaymentMethod,
      icon: Building2,
      title: 'Net Banking',
      description: 'All major banks'
    },
    {
      id: 'cod' as PaymentMethod,
      icon: DollarSign,
      title: 'Cash on Delivery',
      description: 'Pay when you receive'
    }
  ];

  const wallets = ['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'];
  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'];

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validatePayment = (): boolean => {
    if (selectedMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
      }
      if (!cardName) {
        alert('Please enter cardholder name');
        return false;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        alert('Please enter valid expiry date (MM/YY)');
        return false;
      }
      if (!cvv || cvv.length !== 3) {
        alert('Please enter valid CVV');
        return false;
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        alert('Please enter a valid UPI ID');
        return false;
      }
    } else if (selectedMethod === 'wallet') {
      if (!selectedWallet) {
        alert('Please select a wallet');
        return false;
      }
    } else if (selectedMethod === 'netbanking') {
      if (!selectedBank) {
        alert('Please select a bank');
        return false;
      }
    }
    return true;
  };

  const handlePayment = () => {
    if (!validatePayment()) return;

    setShowProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        paymentMethod: selectedMethod,
        paymentDetails: selectedMethod === 'card' 
          ? { last4: cardNumber.slice(-4), cardName }
          : selectedMethod === 'upi'
          ? { upiId }
          : selectedMethod === 'wallet'
          ? { wallet: selectedWallet }
          : selectedMethod === 'netbanking'
          ? { bank: selectedBank }
          : { type: 'cod' },
        amount: totalAmount,
        paymentStatus: selectedMethod === 'cod' ? 'pending' : 'success',
        transactionId: 'TXN' + Date.now()
      };

      setShowProcessing(false);
      onNext({ payment: paymentData });
    }, 2000);
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
            <h1 className="text-xl font-bold text-[#7A1F1F]">Payment</h1>
            <p className="text-xs text-[#7A1F1F]/70 mt-1">Choose your payment method</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="space-y-5">
          {/* Amount Summary */}
          <div className="bg-gradient-to-r from-[#7A1F1F] to-[#9B2C2C] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Amount</p>
                <p className="text-3xl font-bold text-white mt-1">₹{totalAmount}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/70 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                Secure payment powered by 256-bit encryption
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#7A1F1F] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F1F]"></div>
              Select Payment Method
            </h3>
            
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg'
                      : 'border-[#D4AF37]/30 bg-white/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#C5A028]'
                        : 'bg-[#D4AF37]/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        selectedMethod === method.id ? 'text-white' : 'text-[#7A1F1F]'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-[#7A1F1F]">{method.title}</h4>
                      <p className="text-xs text-[#7A1F1F]/60 mt-0.5">{method.description}</p>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Payment Details Form */}
          {selectedMethod === 'card' && (
            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border-2 border-[#D4AF37]/30 animate-fade-in">
              <h3 className="text-sm font-semibold text-[#7A1F1F]">Card Details</h3>
              
              <div>
                <label className="block text-xs font-medium text-[#7A1F1F] mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#7A1F1F] mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#7A1F1F] mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7A1F1F] mb-2">CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'upi' && (
            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border-2 border-[#D4AF37]/30 animate-fade-in">
              <h3 className="text-sm font-semibold text-[#7A1F1F]">UPI Details</h3>
              
              <div>
                <label className="block text-xs font-medium text-[#7A1F1F] mb-2">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value.toLowerCase())}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <p className="text-xs text-[#7A1F1F]/80">
                  💡 You'll receive a payment request on your UPI app
                </p>
              </div>
            </div>
          )}

          {selectedMethod === 'wallet' && (
            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border-2 border-[#D4AF37]/30 animate-fade-in">
              <h3 className="text-sm font-semibold text-[#7A1F1F]">Select Wallet</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet}
                    onClick={() => setSelectedWallet(wallet)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedWallet === wallet
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#D4AF37]/30 bg-white hover:bg-[#D4AF37]/5'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Wallet className="w-5 h-5 text-[#7A1F1F]" />
                      <span className="text-sm font-medium text-[#7A1F1F]">{wallet}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedMethod === 'netbanking' && (
            <div className="space-y-4 bg-white/80 p-5 rounded-2xl border-2 border-[#D4AF37]/30 animate-fade-in">
              <h3 className="text-sm font-semibold text-[#7A1F1F]">Select Bank</h3>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {banks.map((bank) => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                      selectedBank === bank
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#D4AF37]/30 bg-white hover:bg-[#D4AF37]/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-[#7A1F1F]" />
                      <span className="text-sm font-medium text-[#7A1F1F]">{bank}</span>
                      {selectedBank === bank && (
                        <Check className="w-4 h-4 text-[#D4AF37] ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedMethod === 'cod' && (
            <div className="bg-white/80 p-5 rounded-2xl border-2 border-[#D4AF37]/30 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#7A1F1F]">Cash on Delivery</h3>
                  <p className="text-xs text-[#7A1F1F]/70 mt-2 leading-relaxed">
                    Pay ₹{totalAmount} in cash when your order is delivered. Please keep exact change ready.
                  </p>
                  <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-xs text-amber-800">
                      📌 Additional ₹50 COD charges may apply
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Button */}
        <div className="mt-6">
          <button
            onClick={handlePayment}
            disabled={showProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : (
              `${selectedMethod === 'cod' ? 'Place Order' : 'Pay'} ₹${totalAmount}`
            )}
          </button>
        </div>
      </div>

      {/* Processing Overlay */}
      {showProcessing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-bold text-[#7A1F1F] mb-2">Processing Payment</h3>
            <p className="text-sm text-[#7A1F1F]/70">Please wait while we process your payment securely...</p>
          </div>
        </div>
      )}
    </div>
  );
}
