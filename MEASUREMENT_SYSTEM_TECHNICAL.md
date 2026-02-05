# Smart Measurement System - Technical Documentation

## Architecture Overview

The smart measurement system is built with a configuration-driven architecture that dynamically adapts the UI based on the selected clothing type.

---

## File Structure

```
src/
├── config/
│   └── measurementConfig.ts          # Master configuration for all dress types
├── components/
    └── order/
        ├── MeasurementsScreen.tsx     # Main measurement UI component
        └── MeasurementsScreenOld.tsx  # Backup of old implementation
```

---

## Core Components

### 1. Configuration System (`measurementConfig.ts`)

#### Type Definitions

```typescript
type MeasurementField = {
  key: string;           // Unique identifier for the field
  label: string;         // Display label
  required: boolean;     // Is this field mandatory?
  unit: string;          // Unit of measurement (cm, inches, etc.)
  min?: number;          // Minimum valid value
  max?: number;          // Maximum valid value
  placeholder?: string;  // Example placeholder text
};

type CustomizationOption = {
  key: string;           // Unique identifier
  label: string;         // Display label
  type: 'select' | 'radio' | 'checkbox' | 'toggle';
  options: {
    value: string;       // Option value
    label: string;       // Option display text
    price?: number;      // Price modifier (can be negative)
  }[];
  defaultValue?: string; // Default selected value
};

type DressTypeConfig = {
  measurements: MeasurementField[];
  customizations: CustomizationOption[];
};
```

#### Configuration Structure

Each dress type has a complete configuration:

```typescript
const mensShirt: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 70, max: 150, placeholder: 'e.g., 96' },
    // ... more measurements
  ],
  customizations: [
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'slim', label: 'Slim Fit', price: 0 },
        { value: 'regular', label: 'Regular Fit', price: 0 },
        { value: 'loose', label: 'Loose Fit', price: 0 },
      ],
      defaultValue: 'regular',
    },
    // ... more customizations
  ],
};
```

#### Master Configuration Mapper

```typescript
export const measurementConfig: Record<string, DressTypeConfig> = {
  'men-shirt': mensShirt,
  'men-t-shirt': mensTShirt,
  'women-blouse': womensBlouse,
  // ... all dress type mappings
};
```

#### Helper Functions

**`getMeasurementConfig(category: string, style: string): DressTypeConfig | null`**
- Normalizes category and style strings
- Tries exact match first
- Falls back to pattern matching
- Returns appropriate configuration or null

**`calculateCustomizationPrice(customizations: CustomizationOption[], selectedValues: Record<string, string>): number`**
- Calculates total price from selected customizations
- Handles positive and negative price modifiers
- Returns total additional cost

---

### 2. MeasurementsScreen Component

#### Props Interface

```typescript
interface MeasurementsScreenProps {
  category?: string;     // Clothing category (e.g., "Men's Collection")
  style?: string;        // Style name (e.g., "Shirt", "Kurta")
  orderData?: any;       // Existing order data if editing
  onNext: (data: any) => void;  // Callback with measurement data
  onBack: () => void;    // Back navigation callback
}
```

#### State Management

```typescript
const [entryMethod, setEntryMethod] = useState<'manual' | 'agent' | null>(null);
const [measurements, setMeasurements] = useState<Record<string, string>>({});
const [customizations, setCustomizations] = useState<Record<string, string>>({});
const [errors, setErrors] = useState<Record<string, string>>({});
const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
```

#### Screen Flow

1. **Entry Method Selection**
   - Display two options: Manual or Agent
   - No configuration loaded yet
   - Simple choice UI

2. **Agent Method Screen**
   - Show confirmation that measurements will be taken
   - Display only customization options
   - Skip measurement inputs entirely
   - No validation required

3. **Manual Method Screen**
   - Load saved profiles (if any)
   - Display all measurement fields with validation
   - Show customization options
   - Real-time validation and error display
   - Save profile functionality

#### Validation Logic

```typescript
const validateMeasurement = (field: MeasurementField, value: string): string | null => {
  // Check required fields
  if (!value && field.required) {
    return `${field.label} is required`;
  }

  // Check if numeric
  const numValue = parseFloat(value);
  if (value && isNaN(numValue)) {
    return 'Please enter a valid number';
  }

  // Check min range
  if (field.min && numValue < field.min) {
    return `Minimum ${field.min}${field.unit}`;
  }

  // Check max range
  if (field.max && numValue > field.max) {
    return `Maximum ${field.max}${field.unit}`;
  }

  return null;
};
```

#### Data Output

**Manual Entry Output:**
```typescript
{
  measurements: {
    entryMethod: 'manual',
    values: {
      chest: '96',
      waist: '84',
      shoulder: '42',
      // ... all measurements
    },
    customizations: {
      fitType: 'regular',
      collarType: 'spread',
      // ... all customizations
    },
    customizationPrice: 250
  }
}
```

**Agent Entry Output:**
```typescript
{
  measurements: {
    entryMethod: 'agent',
    customizations: {
      fitType: 'regular',
      collarType: 'mandarin',
      // ... all customizations
    },
    customizationPrice: 100
  }
}
```

---

### 3. Sub-Components

#### MeasurementField Component

Reusable input field for measurements:

```typescript
function MeasurementField({ field, value, error, onChange }: {
  field: MeasurementField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  // Renders:
  // - Label with required indicator
  // - Unit display
  // - Number input
  // - Error message (if any)
  // - Range information
}
```

#### CustomizationField Component

Renders appropriate UI based on customization type:

```typescript
function CustomizationField({ customization, value, onChange }: {
  customization: CustomizationOption;
  value: string;
  onChange: (value: string) => void;
}) {
  // Renders different UI based on type:
  // - 'radio' or 'toggle': Radio buttons with pricing
  // - 'select': Dropdown with pricing in options
  // - 'checkbox': Checkbox group
}
```

---

## Integration Points

### OrderFlow Integration

The MeasurementsScreen is step 3 in the order flow:

```typescript
{step === 3 && (
  <MeasurementsScreen
    category={orderData.category}
    style={orderData.style}
    orderData={orderData}
    onNext={handleNext}
    onBack={handleBack}
  />
)}
```

### Data Flow

1. **Category & Style** → Passed from OutfitDesignScreen (step 2)
2. **Configuration Loading** → getMeasurementConfig() retrieves appropriate config
3. **User Input** → Measurements and customizations collected
4. **Validation** → Real-time and on submit
5. **Output** → Passed to OrderFlow state via onNext()
6. **Next Screen** → TailorSelectionScreen receives measurement data

### Price Estimation Integration

Customization price flows to PriceEstimationScreen:

```typescript
const customizationCharges = orderData.measurements?.customizationPrice || 0;
const subtotal = tailorBasePrice + customizationCharges + materialCost;
```

---

## Storage System

### LocalStorage Schema

```typescript
// Key: 'savedMeasurementProfiles'
// Value: JSON array of profiles

interface SavedProfile {
  id: string;              // Timestamp-based ID
  name: string;            // User-provided name
  category: string;        // Clothing category
  style: string;           // Dress style
  measurements: Record<string, string>;  // All measurement values
  customizations: Record<string, string>; // All customization values
  createdAt: string;       // ISO timestamp
}
```

### Storage Operations

```typescript
// Save profile
const newProfile = {
  id: Date.now().toString(),
  name: profileName,
  category,
  style,
  measurements,
  customizations,
  createdAt: new Date().toISOString(),
};
localStorage.setItem('savedMeasurementProfiles', JSON.stringify([...savedProfiles, newProfile]));

// Load profiles
const saved = localStorage.getItem('savedMeasurementProfiles');
if (saved) {
  setSavedProfiles(JSON.parse(saved));
}

// Load specific profile
const handleLoadProfile = (profile: SavedProfile) => {
  setMeasurements(profile.measurements);
  setCustomizations(profile.customizations);
};
```

---

## Adding New Dress Types

### Step 1: Define Configuration

```typescript
// In measurementConfig.ts

const newDressType: DressTypeConfig = {
  measurements: [
    { 
      key: 'uniqueKey', 
      label: 'Display Label', 
      required: true, 
      unit: 'cm', 
      min: 50, 
      max: 150, 
      placeholder: 'e.g., 100' 
    },
    // Add all measurements
  ],
  customizations: [
    {
      key: 'customKey',
      label: 'Customization Label',
      type: 'select',
      options: [
        { value: 'option1', label: 'Option 1', price: 0 },
        { value: 'option2', label: 'Option 2', price: 100 },
      ],
      defaultValue: 'option1',
    },
    // Add all customizations
  ],
};
```

### Step 2: Add to Master Config

```typescript
export const measurementConfig: Record<string, DressTypeConfig> = {
  // ... existing mappings
  'category-style': newDressType,
};
```

### Step 3: Test

No code changes needed in MeasurementsScreen! The component automatically:
- Loads the new configuration
- Displays appropriate fields
- Validates based on rules
- Calculates pricing

---

## Validation Rules

### Field-Level Validation

| Rule | Implementation | Error Message |
|------|---------------|---------------|
| Required | `!value && field.required` | "{label} is required" |
| Numeric | `isNaN(parseFloat(value))` | "Please enter a valid number" |
| Min Range | `numValue < field.min` | "Minimum {min}{unit}" |
| Max Range | `numValue > field.max` | "Maximum {max}{unit}" |

### Form-Level Validation

```typescript
const validateAll = (): boolean => {
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
```

---

## Styling System

### Theme Colors

```typescript
// Gold-Maroon METAIA Theme
const colors = {
  primary: '#7A1F1F',      // Maroon
  secondary: '#D4AF37',    // Gold
  background: 'from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37]',
  error: '#EF4444',        // Red
  success: '#10B981',      // Green
};
```

### Component Classes

```typescript
// Selected customization option
'border-[#D4AF37] bg-[#D4AF37]/5'

// Error state input
'border-red-500'

// Primary button
'bg-gradient-to-r from-[#7A1F1F] to-[#D4AF37]'
```

---

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**
   - Configuration loaded only when needed
   - No unnecessary re-renders

2. **Memoization**
   - Config lookup result can be memoized
   - Price calculation cached until customizations change

3. **Local Storage**
   - Profiles stored locally, no API calls
   - Instant load and save

4. **Validation Debouncing**
   - Could add debouncing to reduce validation calls
   - Currently validates on every change (acceptable for this use case)

### Bundle Size

- Configuration file: ~50KB
- Component: ~30KB
- Total addition: ~80KB (minified)

---

## Testing Strategy

### Unit Tests

```typescript
// Test configuration lookup
describe('getMeasurementConfig', () => {
  it('should return config for exact match', () => {
    const config = getMeasurementConfig("Men's Collection", "Shirt");
    expect(config).toBeDefined();
    expect(config.measurements).toHaveLength(5);
  });

  it('should return null for unknown dress type', () => {
    const config = getMeasurementConfig("Unknown", "Unknown");
    expect(config).toBeNull();
  });
});

// Test price calculation
describe('calculateCustomizationPrice', () => {
  it('should calculate total price correctly', () => {
    const customizations = [
      {
        key: 'option1',
        options: [
          { value: 'a', price: 100 },
          { value: 'b', price: 200 },
        ],
      },
    ];
    const selected = { option1: 'b' };
    const total = calculateCustomizationPrice(customizations, selected);
    expect(total).toBe(200);
  });
});
```

### Integration Tests

```typescript
// Test measurement input and validation
describe('MeasurementsScreen', () => {
  it('should validate required fields', () => {
    render(<MeasurementsScreen category="Men's Collection" style="Shirt" ... />);
    
    // Try to submit without filling required fields
    const submitButton = screen.getByText('Continue');
    fireEvent.click(submitButton);
    
    // Should show error messages
    expect(screen.getByText('Chest is required')).toBeInTheDocument();
  });

  it('should validate min/max ranges', () => {
    render(<MeasurementsScreen category="Men's Collection" style="Shirt" ... />);
    
    const chestInput = screen.getByPlaceholderText('e.g., 96');
    fireEvent.change(chestInput, { target: { value: '200' } });
    
    // Should show max error
    expect(screen.getByText('Maximum 150cm')).toBeInTheDocument();
  });
});
```

---

## Error Handling

### Configuration Not Found

```typescript
if (!config) {
  return (
    <div className="error-screen">
      <AlertCircle />
      <h2>Configuration Not Found</h2>
      <p>Measurement configuration for {category} - {style} is not available.</p>
      <button onClick={onBack}>Go Back</button>
    </div>
  );
}
```

### Validation Errors

```typescript
// Display inline errors
{error && (
  <div className="error-message">
    <AlertCircle />
    <span>{error}</span>
  </div>
)}
```

### Storage Errors

```typescript
try {
  localStorage.setItem('savedMeasurementProfiles', JSON.stringify(profiles));
} catch (error) {
  console.error('Failed to save profile:', error);
  // Show user-friendly error message
}
```

---

## Future Enhancements

### Planned Features

1. **AI Measurement**
   - Camera-based body measurement
   - ML model for size prediction
   - Integration with phone sensors

2. **3D Visualization**
   - Interactive 3D body model
   - Visual measurement guide
   - Real-time preview of customizations

3. **Smart Recommendations**
   - Suggest sizes based on past orders
   - Recommend customizations based on style
   - Popular combinations highlighting

4. **Multi-Unit Support**
   - Support for inches, feet
   - Auto-conversion between units
   - User preference storage

5. **Measurement History**
   - Track measurement changes over time
   - Body measurement analytics
   - Trend visualization

### Technical Improvements

1. **Type Safety**
   - Stronger TypeScript types
   - Runtime validation with Zod
   - Schema validation

2. **Performance**
   - React Query for caching
   - Virtual scrolling for long lists
   - Lazy load sub-components

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

4. **Internationalization**
   - Multi-language support
   - Locale-based formatting
   - RTL support

---

## API Integration (Future)

### Backend Schema

```typescript
// POST /api/measurements
{
  userId: string;
  orderId: string;
  entryMethod: 'manual' | 'agent';
  measurements?: {
    chest: number;
    waist: number;
    // ... all measurements
  };
  customizations: {
    fitType: string;
    collarType: string;
    // ... all customizations
  };
  customizationPrice: number;
}
```

### Sync Saved Profiles

```typescript
// GET /api/users/:userId/measurement-profiles
// POST /api/users/:userId/measurement-profiles
// DELETE /api/users/:userId/measurement-profiles/:profileId
```

---

## Troubleshooting

### Common Issues

**Issue:** Configuration not loading
**Cause:** Incorrect category/style format
**Solution:** Check normalization logic in `getMeasurementConfig()`

**Issue:** Validation not working
**Cause:** Missing min/max values in config
**Solution:** Add validation rules to field definition

**Issue:** Customization price not updating
**Cause:** Missing price property in option
**Solution:** Add `price: 0` for free options

**Issue:** Saved profiles not persisting
**Cause:** Browser storage disabled
**Solution:** Check browser privacy settings

---

## Performance Metrics

### Target Metrics

- Initial render: < 100ms
- Validation response: < 50ms
- Save profile: < 100ms
- Load profile: < 50ms
- Configuration lookup: < 10ms

### Monitoring

```typescript
// Add performance monitoring
console.time('config-lookup');
const config = getMeasurementConfig(category, style);
console.timeEnd('config-lookup');

console.time('validation');
const isValid = validateAll();
console.timeEnd('validation');
```

---

## Security Considerations

### Input Sanitization

```typescript
// Sanitize measurement inputs
const sanitizedValue = value.replace(/[^0-9.]/g, '');
```

### XSS Prevention

```typescript
// React automatically escapes strings
// No additional sanitization needed for display
```

### Local Storage

```typescript
// Don't store sensitive data in localStorage
// Only store measurements and preferences
// Clear on logout
```

---

## Maintenance

### Regular Tasks

1. **Update Ranges**
   - Review min/max values quarterly
   - Adjust based on user feedback
   - Add new standard sizes

2. **Add Dress Types**
   - As new styles added to catalog
   - Create comprehensive configurations
   - Test thoroughly

3. **Performance Monitoring**
   - Track render times
   - Monitor bundle size
   - Optimize as needed

4. **User Feedback**
   - Review validation errors
   - Analyze abandonment rates
   - Improve UX based on data

---

**Version:** 1.0.0  
**Last Updated:** January 22, 2026  
**Maintainer:** Development Team
