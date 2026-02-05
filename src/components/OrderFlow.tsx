import { useState } from 'react';
import { OrderTypeSelection } from './order/OrderTypeSelection';
import { OutfitDesignScreen } from './order/OutfitDesignScreen';
import { MeasurementsScreen } from './order/MeasurementsScreen';
import { TailorSelectionScreen } from './order/TailorSelectionScreen';
import { PriceEstimationScreen } from './order/PriceEstimationScreen';
import { PriceBreakdownScreen } from './order/PriceBreakdownScreen';
import { PaymentScreen } from './order/PaymentScreen';
import { OrderPlacementScreen } from './order/OrderPlacementScreen';
import { OrderSuccessScreen } from './order/OrderSuccessScreen';

interface OrderFlowProps {
  onComplete: () => void;
  onBack: () => void;
  initialCategory: string;
  initialStyle: string;
}

export type OrderData = {
  profile?: any;
  category?: string;
  style?: string;
  orderType?: 'fresh' | 'alteration';
  outfitDetails?: any;
  measurements?: any;
  selectedTailor?: any;
  priceEstimate?: any;
  pricing?: any;
};

export function OrderFlow({ onComplete, onBack, initialCategory, initialStyle }: OrderFlowProps) {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    category: initialCategory,
    style: initialStyle
  });

  const handleNext = (data: any) => {
    setOrderData({ ...orderData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <>
      {step === 1 && (
        <OrderTypeSelection
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 2 && (
        <OutfitDesignScreen
          orderType={orderData.orderType}
          category={orderData.category}
          style={orderData.style}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <MeasurementsScreen
          category={orderData.category}
          style={orderData.style}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <TailorSelectionScreen
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 5 && (
        <PriceEstimationScreen
          orderData={orderData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 6 && (
        <PriceBreakdownScreen
          orderData={orderData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 7 && (
        <PaymentScreen
          orderData={orderData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 8 && (
        <OrderPlacementScreen
          orderData={orderData}
          onComplete={() => handleNext({})}
          onBack={handleBack}
        />
      )}
      {step === 9 && (
        <OrderSuccessScreen
          orderData={orderData}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}