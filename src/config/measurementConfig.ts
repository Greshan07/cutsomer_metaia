// Comprehensive measurement and customization configuration for all dress types

export type MeasurementField = {
  key: string;
  label: string;
  required: boolean;
  unit: string;
  min?: number;
  max?: number;
  placeholder?: string;
};

export type CustomizationOption = {
  key: string;
  label: string;
  type: 'select' | 'radio' | 'checkbox' | 'toggle';
  options: { value: string; label: string; price?: number }[];
  defaultValue?: string;
};

export type DressTypeConfig = {
  measurements: MeasurementField[];
  customizations: CustomizationOption[];
};

// ====================================================
// MEN'S COLLECTION
// ====================================================

const mensShirt: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 70, max: 150, placeholder: 'e.g., 96' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 60, max: 140, placeholder: 'e.g., 84' },
    { key: 'shoulderWidth', label: 'Shoulder Width', required: true, unit: 'cm', min: 30, max: 70, placeholder: 'e.g., 42' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 50, max: 90, placeholder: 'e.g., 63' },
    { key: 'shirtLength', label: 'Shirt Length', required: true, unit: 'cm', min: 60, max: 100, placeholder: 'e.g., 75' },
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
    {
      key: 'collarType',
      label: 'Collar Type',
      type: 'select',
      options: [
        { value: 'spread', label: 'Spread Collar', price: 0 },
        { value: 'button-down', label: 'Button-Down Collar', price: 50 },
        { value: 'mandarin', label: 'Mandarin Collar', price: 100 },
        { value: 'cutaway', label: 'Cutaway Collar', price: 75 },
      ],
      defaultValue: 'spread',
    },
    {
      key: 'sleeveType',
      label: 'Sleeve Type',
      type: 'radio',
      options: [
        { value: 'full', label: 'Full Sleeve', price: 0 },
        { value: 'half', label: 'Half Sleeve', price: -50 },
      ],
      defaultValue: 'full',
    },
    {
      key: 'buttonStyle',
      label: 'Button Style',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard Buttons', price: 0 },
        { value: 'wooden', label: 'Wooden Buttons', price: 100 },
        { value: 'pearl', label: 'Pearl Buttons', price: 150 },
        { value: 'metal', label: 'Metal Buttons', price: 120 },
      ],
      defaultValue: 'standard',
    },
  ],
};

const mensTShirt: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 70, max: 150, placeholder: 'e.g., 96' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 30, max: 70, placeholder: 'e.g., 42' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 55, max: 90, placeholder: 'e.g., 68' },
  ],
  customizations: [
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'slim', label: 'Slim Fit', price: 0 },
        { value: 'regular', label: 'Regular Fit', price: 0 },
        { value: 'oversized', label: 'Oversized', price: 0 },
      ],
      defaultValue: 'regular',
    },
    {
      key: 'sleeveType',
      label: 'Sleeve Type',
      type: 'radio',
      options: [
        { value: 'full', label: 'Full Sleeve', price: 0 },
        { value: 'half', label: 'Half Sleeve', price: 0 },
        { value: 'sleeveless', label: 'Sleeveless', price: -30 },
      ],
      defaultValue: 'half',
    },
    {
      key: 'neckStyle',
      label: 'Neck Style',
      type: 'select',
      options: [
        { value: 'round', label: 'Round Neck', price: 0 },
        { value: 'v-neck', label: 'V-Neck', price: 0 },
        { value: 'henley', label: 'Henley', price: 50 },
        { value: 'polo', label: 'Polo Collar', price: 80 },
      ],
      defaultValue: 'round',
    },
  ],
};

const mensKurta: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 70, max: 150, placeholder: 'e.g., 96' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 60, max: 140, placeholder: 'e.g., 84' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 30, max: 70, placeholder: 'e.g., 42' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 80, max: 130, placeholder: 'e.g., 100' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 50, max: 90, placeholder: 'e.g., 60' },
  ],
  customizations: [
    {
      key: 'collarType',
      label: 'Collar Type',
      type: 'select',
      options: [
        { value: 'mandarin', label: 'Mandarin Collar', price: 0 },
        { value: 'band', label: 'Band Collar', price: 0 },
        { value: 'shirt', label: 'Shirt Collar', price: 50 },
        { value: 'no-collar', label: 'No Collar', price: 0 },
      ],
      defaultValue: 'mandarin',
    },
    {
      key: 'lengthStyle',
      label: 'Length Style',
      type: 'radio',
      options: [
        { value: 'short', label: 'Short (Above Knee)', price: -50 },
        { value: 'medium', label: 'Medium (Knee Length)', price: 0 },
        { value: 'long', label: 'Long (Below Knee)', price: 50 },
      ],
      defaultValue: 'medium',
    },
    {
      key: 'sideSlit',
      label: 'Side Slit',
      type: 'toggle',
      options: [
        { value: 'yes', label: 'Yes', price: 50 },
        { value: 'no', label: 'No', price: 0 },
      ],
      defaultValue: 'no',
    },
  ],
};

const mensBlazerJacket: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 80, max: 150, placeholder: 'e.g., 100' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 88' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 35, max: 70, placeholder: 'e.g., 44' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 55, max: 95, placeholder: 'e.g., 65' },
    { key: 'coatLength', label: 'Coat Length', required: true, unit: 'cm', min: 65, max: 110, placeholder: 'e.g., 75' },
  ],
  customizations: [
    {
      key: 'buttonCount',
      label: 'Button Count',
      type: 'radio',
      options: [
        { value: '1', label: 'Single Button', price: 0 },
        { value: '2', label: 'Two Buttons', price: 0 },
        { value: '3', label: 'Three Buttons', price: 50 },
      ],
      defaultValue: '2',
    },
    {
      key: 'lapelStyle',
      label: 'Lapel Style',
      type: 'select',
      options: [
        { value: 'notch', label: 'Notch Lapel', price: 0 },
        { value: 'peak', label: 'Peak Lapel', price: 100 },
        { value: 'shawl', label: 'Shawl Lapel', price: 150 },
      ],
      defaultValue: 'notch',
    },
    {
      key: 'pocketStyle',
      label: 'Pocket Style',
      type: 'select',
      options: [
        { value: 'flap', label: 'Flap Pockets', price: 0 },
        { value: 'patch', label: 'Patch Pockets', price: 50 },
        { value: 'jetted', label: 'Jetted Pockets', price: 100 },
      ],
      defaultValue: 'flap',
    },
  ],
};

const mensPantTrouser: DressTypeConfig = {
  measurements: [
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 60, max: 140, placeholder: 'e.g., 82' },
    { key: 'hip', label: 'Hip', required: true, unit: 'cm', min: 70, max: 150, placeholder: 'e.g., 98' },
    { key: 'thigh', label: 'Thigh', required: true, unit: 'cm', min: 40, max: 90, placeholder: 'e.g., 58' },
    { key: 'inseamLength', label: 'Inseam Length', required: true, unit: 'cm', min: 60, max: 110, placeholder: 'e.g., 78' },
    { key: 'pantLength', label: 'Pant Length', required: true, unit: 'cm', min: 85, max: 125, placeholder: 'e.g., 100' },
  ],
  customizations: [
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'slim', label: 'Slim Fit', price: 0 },
        { value: 'regular', label: 'Regular Fit', price: 0 },
        { value: 'relaxed', label: 'Relaxed Fit', price: 0 },
      ],
      defaultValue: 'regular',
    },
    {
      key: 'pocketStyle',
      label: 'Pocket Style',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard Pockets', price: 0 },
        { value: 'slant', label: 'Slant Pockets', price: 50 },
        { value: 'cargo', label: 'Cargo Pockets', price: 100 },
      ],
      defaultValue: 'standard',
    },
    {
      key: 'bottomCut',
      label: 'Bottom Cut',
      type: 'radio',
      options: [
        { value: 'slim', label: 'Slim Cut', price: 0 },
        { value: 'straight', label: 'Straight Cut', price: 0 },
        { value: 'wide', label: 'Wide Cut', price: 50 },
      ],
      defaultValue: 'straight',
    },
  ],
};

const mensSherwaniSuit: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 80, max: 150, placeholder: 'e.g., 100' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 88' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 35, max: 70, placeholder: 'e.g., 44' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 55, max: 95, placeholder: 'e.g., 65' },
    { key: 'coatLength', label: 'Coat Length', required: true, unit: 'cm', min: 85, max: 130, placeholder: 'e.g., 105' },
    { key: 'pantLength', label: 'Pant Length', required: true, unit: 'cm', min: 85, max: 125, placeholder: 'e.g., 100' },
  ],
  customizations: [
    {
      key: 'collarStyle',
      label: 'Collar Style',
      type: 'select',
      options: [
        { value: 'mandarin', label: 'Mandarin Collar', price: 0 },
        { value: 'band', label: 'Band Collar', price: 0 },
        { value: 'notch', label: 'Notch Collar', price: 100 },
      ],
      defaultValue: 'mandarin',
    },
    {
      key: 'embroidery',
      label: 'Embroidery',
      type: 'select',
      options: [
        { value: 'none', label: 'No Embroidery', price: 0 },
        { value: 'light', label: 'Light Embroidery', price: 500 },
        { value: 'medium', label: 'Medium Embroidery', price: 1000 },
        { value: 'heavy', label: 'Heavy Embroidery', price: 2000 },
      ],
      defaultValue: 'none',
    },
    {
      key: 'buttonStyle',
      label: 'Button Style',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard Buttons', price: 0 },
        { value: 'decorative', label: 'Decorative Buttons', price: 150 },
        { value: 'hook', label: 'Hook & Eye', price: 200 },
      ],
      defaultValue: 'standard',
    },
  ],
};

// ====================================================
// WOMEN'S COLLECTION
// ====================================================

const womensBlouse: DressTypeConfig = {
  measurements: [
    { key: 'bust', label: 'Bust', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 86' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 28, max: 60, placeholder: 'e.g., 36' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 20, max: 80, placeholder: 'e.g., 45' },
    { key: 'blouseLength', label: 'Blouse Length', required: true, unit: 'cm', min: 30, max: 60, placeholder: 'e.g., 38' },
  ],
  customizations: [
    {
      key: 'neckStyle',
      label: 'Neck Style',
      type: 'select',
      options: [
        { value: 'round', label: 'Round Neck', price: 0 },
        { value: 'v-neck', label: 'V-Neck', price: 0 },
        { value: 'square', label: 'Square Neck', price: 50 },
        { value: 'sweetheart', label: 'Sweetheart', price: 100 },
        { value: 'boat', label: 'Boat Neck', price: 50 },
      ],
      defaultValue: 'round',
    },
    {
      key: 'sleeveType',
      label: 'Sleeve Type',
      type: 'select',
      options: [
        { value: 'full', label: 'Full Sleeve', price: 0 },
        { value: 'half', label: 'Half Sleeve', price: 0 },
        { value: 'three-quarter', label: '3/4 Sleeve', price: 0 },
        { value: 'sleeveless', label: 'Sleeveless', price: -30 },
        { value: 'puff', label: 'Puff Sleeve', price: 100 },
      ],
      defaultValue: 'full',
    },
    {
      key: 'backDesign',
      label: 'Back Design',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard Back', price: 0 },
        { value: 'keyhole', label: 'Keyhole Back', price: 100 },
        { value: 'open-back', label: 'Open Back', price: 150 },
        { value: 'button-back', label: 'Button Back', price: 80 },
        { value: 'tie-back', label: 'Tie Back', price: 120 },
      ],
      defaultValue: 'standard',
    },
    {
      key: 'padding',
      label: 'Padding',
      type: 'toggle',
      options: [
        { value: 'yes', label: 'Yes', price: 50 },
        { value: 'no', label: 'No', price: 0 },
      ],
      defaultValue: 'no',
    },
  ],
};

const womensKurti: DressTypeConfig = {
  measurements: [
    { key: 'bust', label: 'Bust', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 86' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'hip', label: 'Hip', required: true, unit: 'cm', min: 75, max: 150, placeholder: 'e.g., 95' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 75, max: 130, placeholder: 'e.g., 95' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 20, max: 80, placeholder: 'e.g., 45' },
  ],
  customizations: [
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'fitted', label: 'Fitted', price: 0 },
        { value: 'regular', label: 'Regular', price: 0 },
        { value: 'loose', label: 'Loose/Flowy', price: 0 },
      ],
      defaultValue: 'regular',
    },
    {
      key: 'neckDesign',
      label: 'Neck Design',
      type: 'select',
      options: [
        { value: 'round', label: 'Round Neck', price: 0 },
        { value: 'v-neck', label: 'V-Neck', price: 0 },
        { value: 'mandarin', label: 'Mandarin Collar', price: 50 },
        { value: 'boat', label: 'Boat Neck', price: 50 },
        { value: 'chinese', label: 'Chinese Collar', price: 80 },
      ],
      defaultValue: 'round',
    },
    {
      key: 'sideSlit',
      label: 'Side Slit',
      type: 'toggle',
      options: [
        { value: 'yes', label: 'Yes', price: 50 },
        { value: 'no', label: 'No', price: 0 },
      ],
      defaultValue: 'yes',
    },
  ],
};

const womensSalwar: DressTypeConfig = {
  measurements: [
    { key: 'bust', label: 'Bust (Top)', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 86' },
    { key: 'waist', label: 'Waist (Top)', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'hip', label: 'Hip (Top)', required: true, unit: 'cm', min: 75, max: 150, placeholder: 'e.g., 95' },
    { key: 'topLength', label: 'Top Length', required: true, unit: 'cm', min: 75, max: 130, placeholder: 'e.g., 95' },
    { key: 'bottomWaist', label: 'Waist (Bottom)', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'bottomHip', label: 'Hip (Bottom)', required: true, unit: 'cm', min: 75, max: 150, placeholder: 'e.g., 95' },
    { key: 'bottomLength', label: 'Bottom Length', required: true, unit: 'cm', min: 85, max: 125, placeholder: 'e.g., 98' },
  ],
  customizations: [
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'fitted', label: 'Fitted', price: 0 },
        { value: 'regular', label: 'Regular', price: 0 },
        { value: 'loose', label: 'Loose', price: 0 },
      ],
      defaultValue: 'regular',
    },
    {
      key: 'dupatta',
      label: 'Dupatta',
      type: 'toggle',
      options: [
        { value: 'yes', label: 'Include Dupatta', price: 200 },
        { value: 'no', label: 'No Dupatta', price: 0 },
      ],
      defaultValue: 'yes',
    },
    {
      key: 'bottomStyle',
      label: 'Bottom Style',
      type: 'select',
      options: [
        { value: 'salwar', label: 'Salwar', price: 0 },
        { value: 'churidar', label: 'Churidar', price: 50 },
        { value: 'palazzo', label: 'Palazzo', price: 100 },
        { value: 'pant', label: 'Straight Pant', price: 50 },
      ],
      defaultValue: 'salwar',
    },
  ],
};

const womensLehenga: DressTypeConfig = {
  measurements: [
    { key: 'bust', label: 'Bust (Blouse)', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 86' },
    { key: 'waist', label: 'Waist (Blouse)', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 20, max: 80, placeholder: 'e.g., 45' },
    { key: 'lehengaWaist', label: 'Waist (Lehenga)', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'lehengaHip', label: 'Hip (Lehenga)', required: true, unit: 'cm', min: 75, max: 150, placeholder: 'e.g., 95' },
    { key: 'lehengaLength', label: 'Lehenga Length', required: true, unit: 'cm', min: 85, max: 125, placeholder: 'e.g., 105' },
  ],
  customizations: [
    {
      key: 'embroidery',
      label: 'Heavy Embroidery',
      type: 'select',
      options: [
        { value: 'none', label: 'No Extra Embroidery', price: 0 },
        { value: 'light', label: 'Light Embroidery', price: 1000 },
        { value: 'medium', label: 'Medium Embroidery', price: 2500 },
        { value: 'heavy', label: 'Heavy Embroidery', price: 5000 },
      ],
      defaultValue: 'none',
    },
    {
      key: 'flareType',
      label: 'Flare Type',
      type: 'radio',
      options: [
        { value: 'regular', label: 'Regular Flare', price: 0 },
        { value: 'heavy', label: 'Heavy Flare', price: 300 },
        { value: 'double', label: 'Double Flare', price: 500 },
      ],
      defaultValue: 'regular',
    },
    {
      key: 'dupattaStyle',
      label: 'Dupatta Style',
      type: 'select',
      options: [
        { value: 'simple', label: 'Simple Dupatta', price: 0 },
        { value: 'net', label: 'Net Dupatta', price: 300 },
        { value: 'embroidered', label: 'Embroidered Dupatta', price: 800 },
        { value: 'double', label: 'Double Dupatta', price: 600 },
      ],
      defaultValue: 'simple',
    },
  ],
};

const womensAnarkaliDressGown: DressTypeConfig = {
  measurements: [
    { key: 'bust', label: 'Bust', required: true, unit: 'cm', min: 70, max: 140, placeholder: 'e.g., 86' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'hip', label: 'Hip', required: true, unit: 'cm', min: 75, max: 150, placeholder: 'e.g., 95' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 28, max: 60, placeholder: 'e.g., 36' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 20, max: 80, placeholder: 'e.g., 45' },
    { key: 'fullLength', label: 'Full Length', required: true, unit: 'cm', min: 110, max: 180, placeholder: 'e.g., 145' },
  ],
  customizations: [
    {
      key: 'neckDesign',
      label: 'Neck Design',
      type: 'select',
      options: [
        { value: 'round', label: 'Round Neck', price: 0 },
        { value: 'v-neck', label: 'V-Neck', price: 0 },
        { value: 'sweetheart', label: 'Sweetheart', price: 100 },
        { value: 'halter', label: 'Halter Neck', price: 150 },
        { value: 'off-shoulder', label: 'Off-Shoulder', price: 200 },
      ],
      defaultValue: 'round',
    },
    {
      key: 'sleeveStyle',
      label: 'Sleeve Style',
      type: 'select',
      options: [
        { value: 'full', label: 'Full Sleeve', price: 0 },
        { value: 'half', label: 'Half Sleeve', price: 0 },
        { value: 'three-quarter', label: '3/4 Sleeve', price: 0 },
        { value: 'sleeveless', label: 'Sleeveless', price: -30 },
        { value: 'bell', label: 'Bell Sleeve', price: 100 },
        { value: 'cape', label: 'Cape Sleeve', price: 200 },
      ],
      defaultValue: 'full',
    },
    {
      key: 'trainLength',
      label: 'Train Length (For Gowns)',
      type: 'select',
      options: [
        { value: 'none', label: 'No Train', price: 0 },
        { value: 'short', label: 'Short Train', price: 300 },
        { value: 'medium', label: 'Medium Train', price: 600 },
        { value: 'long', label: 'Long Train', price: 1000 },
      ],
      defaultValue: 'none',
    },
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'fitted', label: 'Fitted', price: 0 },
        { value: 'a-line', label: 'A-Line', price: 0 },
        { value: 'flowy', label: 'Flowy', price: 0 },
      ],
      defaultValue: 'a-line',
    },
  ],
};

const womensSkirtPalazzo: DressTypeConfig = {
  measurements: [
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 55, max: 120, placeholder: 'e.g., 70' },
    { key: 'hip', label: 'Hip', required: true, unit: 'cm', min: 75, max: 150, placeholder: 'e.g., 95' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 60, max: 125, placeholder: 'e.g., 90' },
  ],
  customizations: [
    {
      key: 'waistType',
      label: 'Waist Type',
      type: 'select',
      options: [
        { value: 'elastic', label: 'Elastic Waist', price: 0 },
        { value: 'zippered', label: 'Zippered Waist', price: 50 },
        { value: 'button', label: 'Button Waist', price: 50 },
        { value: 'tie', label: 'Tie Waist', price: 70 },
      ],
      defaultValue: 'elastic',
    },
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'fitted', label: 'Fitted', price: 0 },
        { value: 'regular', label: 'Regular', price: 0 },
        { value: 'loose', label: 'Loose', price: 0 },
      ],
      defaultValue: 'regular',
    },
  ],
};

// ====================================================
// KIDS COLLECTION
// ====================================================

const kidsShirtTop: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 45, max: 90, placeholder: 'e.g., 65' },
    { key: 'shoulder', label: 'Shoulder', required: true, unit: 'cm', min: 20, max: 50, placeholder: 'e.g., 30' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 35, max: 70, placeholder: 'e.g., 48' },
    { key: 'sleeveLength', label: 'Sleeve Length', required: true, unit: 'cm', min: 25, max: 60, placeholder: 'e.g., 40' },
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
    {
      key: 'sleeveType',
      label: 'Sleeve Type',
      type: 'radio',
      options: [
        { value: 'full', label: 'Full Sleeve', price: 0 },
        { value: 'half', label: 'Half Sleeve', price: 0 },
        { value: 'sleeveless', label: 'Sleeveless', price: -20 },
      ],
      defaultValue: 'full',
    },
  ],
};

const kidsKurtaDress: DressTypeConfig = {
  measurements: [
    { key: 'chest', label: 'Chest', required: true, unit: 'cm', min: 45, max: 90, placeholder: 'e.g., 65' },
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 40, max: 80, placeholder: 'e.g., 58' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 50, max: 100, placeholder: 'e.g., 70' },
  ],
  customizations: [
    {
      key: 'neckDesign',
      label: 'Neck Design',
      type: 'select',
      options: [
        { value: 'round', label: 'Round Neck', price: 0 },
        { value: 'mandarin', label: 'Mandarin Collar', price: 30 },
        { value: 'v-neck', label: 'V-Neck', price: 0 },
      ],
      defaultValue: 'round',
    },
    {
      key: 'sleeveStyle',
      label: 'Sleeve Style',
      type: 'radio',
      options: [
        { value: 'full', label: 'Full Sleeve', price: 0 },
        { value: 'half', label: 'Half Sleeve', price: 0 },
        { value: 'three-quarter', label: '3/4 Sleeve', price: 0 },
      ],
      defaultValue: 'full',
    },
  ],
};

const kidsPantsShorts: DressTypeConfig = {
  measurements: [
    { key: 'waist', label: 'Waist', required: true, unit: 'cm', min: 40, max: 80, placeholder: 'e.g., 58' },
    { key: 'hip', label: 'Hip', required: true, unit: 'cm', min: 50, max: 95, placeholder: 'e.g., 68' },
    { key: 'length', label: 'Length', required: true, unit: 'cm', min: 40, max: 95, placeholder: 'e.g., 65' },
  ],
  customizations: [
    {
      key: 'fitType',
      label: 'Fit Type',
      type: 'radio',
      options: [
        { value: 'slim', label: 'Slim Fit', price: 0 },
        { value: 'regular', label: 'Regular Fit', price: 0 },
        { value: 'relaxed', label: 'Relaxed Fit', price: 0 },
      ],
      defaultValue: 'regular',
    },
    {
      key: 'pocketStyle',
      label: 'Pocket Style',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard Pockets', price: 0 },
        { value: 'cargo', label: 'Cargo Pockets', price: 50 },
      ],
      defaultValue: 'standard',
    },
  ],
};

// ====================================================
// MASTER CONFIGURATION MAPPER
// ====================================================

export const measurementConfig: Record<string, DressTypeConfig> = {
  // Men's Collection
  'men-shirt': mensShirt,
  'men-t-shirt': mensTShirt,
  'men-tshirt': mensTShirt,
  'men-kurta': mensKurta,
  'men-blazer': mensBlazerJacket,
  'men-jacket': mensBlazerJacket,
  'men-waistcoat': mensBlazerJacket,
  'men-pant': mensPantTrouser,
  'men-trouser': mensPantTrouser,
  'men-jeans': mensPantTrouser,
  'men-sherwani': mensSherwaniSuit,
  'men-pathani': mensSherwaniSuit,
  'men-suit': mensSherwaniSuit,
  'men-2-piece': mensSherwaniSuit,
  'men-3-piece': mensSherwaniSuit,
  
  // Women's Collection
  'women-blouse': womensBlouse,
  'women-kurti': womensKurti,
  'women-tunic': womensKurti,
  'women-salwar': womensSalwar,
  'women-salwar-kameez': womensSalwar,
  'women-palazzo': womensSkirtPalazzo,
  'women-lehenga': womensLehenga,
  'women-lehenga-choli': womensLehenga,
  'women-anarkali': womensAnarkaliDressGown,
  'women-dress': womensAnarkaliDressGown,
  'women-gown': womensAnarkaliDressGown,
  'women-jumpsuit': womensAnarkaliDressGown,
  'women-skirt': womensSkirtPalazzo,
  'women-leggings': womensSkirtPalazzo,
  
  // Kids Collection
  'kids-shirt': kidsShirtTop,
  'kids-top': kidsShirtTop,
  'kids-kurta': kidsKurtaDress,
  'kids-dress': kidsKurtaDress,
  'kids-ethnic': kidsKurtaDress,
  'kids-pants': kidsPantsShorts,
  'kids-shorts': kidsPantsShorts,
};

// Helper function to get config based on category and style
export function getMeasurementConfig(category: string, style: string): DressTypeConfig | null {
  const normalizedCategory = category.toLowerCase().replace(/['s\s]/g, '-');
  const normalizedStyle = style.toLowerCase().replace(/[\s/]/g, '-');
  
  // Try exact match first
  const key = `${normalizedCategory}-${normalizedStyle}`;
  if (measurementConfig[key]) {
    return measurementConfig[key];
  }
  
  // Try pattern matching for common variations
  const allKeys = Object.keys(measurementConfig);
  for (const configKey of allKeys) {
    if (configKey.includes(normalizedStyle) || normalizedStyle.includes(configKey.split('-')[1])) {
      return measurementConfig[configKey];
    }
  }
  
  // Default fallback based on category
  if (normalizedCategory.includes('men')) {
    return mensShirt; // Default men's config
  } else if (normalizedCategory.includes('women')) {
    return womensKurti; // Default women's config
  } else if (normalizedCategory.includes('kid')) {
    return kidsShirtTop; // Default kids config
  }
  
  return null;
}

// Calculate customization total price
export function calculateCustomizationPrice(customizations: CustomizationOption[], selectedValues: Record<string, string>): number {
  let totalPrice = 0;
  
  customizations.forEach((customization) => {
    const selectedValue = selectedValues[customization.key];
    if (selectedValue) {
      const option = customization.options.find(opt => opt.value === selectedValue);
      if (option && option.price) {
        totalPrice += option.price;
      }
    }
  });
  
  return totalPrice;
}
