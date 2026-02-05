# METAIA Tailor App - Complete Application Prompt

## Overview
METAIA is a comprehensive digital tailoring service platform that connects customers with professional tailors for custom clothing orders. The app facilitates the entire journey from design selection to final delivery, making custom tailoring accessible and convenient through a modern mobile-first interface.

## Core Purpose
Create a seamless bridge between customers seeking custom-tailored clothing and skilled tailors, eliminating traditional barriers in the custom clothing industry through technology. The app digitizes the entire tailoring process including measurements, design preferences, pricing, and order tracking.

## Target Users
1. **Customers**: Individuals seeking custom-tailored clothing (men, women, and children's wear)
2. **Tailors**: Professional tailors and boutiques offering custom stitching and alteration services

## Key Features & Functionality

### 1. Authentication System
- **Phone/OTP Login**: SMS-based verification for quick access
- **Google OAuth Integration**: One-click social login
- **Registration**: New user onboarding with profile creation
- **Password Recovery**: Forgot password flow with email/SMS verification
- **Persistent Sessions**: JWT token-based authentication with localStorage

### 2. Customer Home Screen
- **Gender-Based Categories**: Men, Women, Kids sections
- **Dress Type Selection**: Comprehensive list of clothing types
  - **Men's**: Shirts, T-Shirts, Kurta, Jacket, Blazer, Pants, Jeans, Suit, Sherwani
  - **Women's**: Blouse, Kurti, Saree Blouse, Palazzo, Salwar, Dress, Lehenga, Anarkali, Salwar Kameez, Gown
  - **Kids**: T-Shirt, Shirt, Dress, Kurta, Shorts, Lehenga Choli
- **Visual Dress Cards**: Image-based selection with hover effects
- **Quick Navigation**: Direct access to orders, profile, reviews, and settings

### 3. Order Flow (Step-by-Step Journey)

#### Step 1: Order Type Selection
- **Fresh Stitching**: New garment creation from scratch
- **Alteration**: Modifications to existing garments
- Direct card click navigation (no extra continue button)

#### Step 2: Outfit Design Requirements
- **Design Inspiration Gallery**: 3 curated images per dress type (from comprehensive dataset)
- **Style Customization**:
  - Neck styles (Round, V-Neck, Collar, Boat, Square, Sweetheart)
  - Sleeve types (Full, Half, 3/4, Sleeveless, Cap)
  - Length options (Short, Medium, Long, Knee Length, Ankle Length)
  - Fit preferences (Slim, Regular, Loose)
  - Bottom wear options (Waist style, Pocket style, Closure type)
- **Reference Image Upload**: Customers can upload their own design references
- **Special Instructions**: Text field for custom requirements
- **Fabric Selection**: Option to provide own fabric or use tailor's

#### Step 3: Measurements Input
- **Smart Measurement System**:
  - Gender-aware measurement requirements
  - Dress-type specific measurements
  - Top wear: Shoulder, chest, waist, hip, sleeve, length
  - Bottom wear: Waist, hip, inseam, outseam, thigh, ankle
  - Full body: Comprehensive measurements including all body parts
- **Measurement Units**: Metric (cm) and Imperial (inches) support
- **Visual Guides**: Illustrations showing how to measure correctly
- **Save Measurements**: Store for future orders

#### Step 4: Tailor Selection
- **Tailor Cards** displaying:
  - Profile picture and name
  - Rating (stars) and review count
  - Years of experience
  - Delivery time estimate
  - Price range per garment
  - Specializations (e.g., Wedding Wear, Casual Wear, Formal Wear)
- **Location Information**: Distance from customer
- **Sample Work Gallery**: Modal popup showing 4+ portfolio images per tailor
- **Tailor Details**: View full profile before selection

#### Step 5: Price Estimation
- **Instant Price Calculation**: Based on garment type, fabric, and complexity
- **Price Range Display**: Minimum to maximum expected cost
- **Transparency**: Clear breakdown of pricing factors

#### Step 6: Price Breakdown
- **Detailed Cost Breakdown**:
  - Base stitching charges
  - Fabric costs (if provided by tailor)
  - Design complexity charges
  - Rush order fees (if applicable)
  - Delivery charges
  - Tax calculation
  - Total amount
- **Edit Options**: Modify selections before payment

#### Step 7: Payment
- **Multiple Payment Methods**:
  - Card payments (Credit/Debit)
  - UPI
  - Net Banking
  - Wallets
  - Cash on Delivery
- **Secure Processing**: Encrypted payment gateway
- **Payment Confirmation**: Receipt generation

#### Step 8: Order Confirmation
- **Professional Order Success Screen**:
  - Unique Order ID (MET + timestamp)
  - Order Summary with item details
  - Price breakdown recap
  - Delivery Information (estimated date: 7-10 days)
  - Tailor Information (name, contact, rating)
  - Order Timeline (4-step progress tracker):
    1. Order Placed
    2. Measurements Confirmed
    3. In Progress
    4. Ready for Delivery
  - Important Notes (measurement verification, fabric quality, etc.)
- **Download Receipt**: PDF receipt generation
- **Order Tracking**: Link to track order status

### 4. Customer Profile Management
- **Personal Information**:
  - Name, phone, email
  - Profile picture upload
  - Address management (multiple addresses)
- **Saved Measurements**: All body measurements stored
- **Order History**: Complete list of past orders
- **Favorite Tailors**: Bookmark preferred tailors

### 5. My Orders Screen
- **Active Orders**: Currently in-progress orders
- **Order Status Tracking**:
  - Order placed → Measurements confirmed → In progress → Ready for delivery → Completed
- **Order Cards** showing:
  - Order ID and date
  - Garment type and image
  - Tailor name
  - Current status
  - Delivery date
  - Amount paid
- **Quick Actions**: Contact tailor, view details, cancel order

### 6. Order History
- **Completed Orders Archive**
- **Reorder Functionality**: Quick reorder with same specifications
- **Past Order Details**: Full information retrieval
- **Invoice Download**: Access previous receipts

### 7. Reviews & Ratings
- **Rate Tailors**: Star rating (1-5) and written review
- **Rate Orders**: Individual order satisfaction rating
- **My Reviews**: View all submitted reviews
- **Photo Upload**: Attach photos of finished product
- **Edit Reviews**: Modify reviews within time limit

### 8. Settings Screen
- **Account Settings**:
  - Update profile information
  - Change password
  - Email preferences
  - Phone verification
- **Notification Preferences**:
  - Order updates
  - Promotional notifications
  - SMS/Email toggles
- **App Preferences**:
  - Language selection
  - Measurement units (cm/inches)
  - Currency
  - Dark mode toggle
- **Privacy Settings**:
  - Data sharing preferences
  - Location access
  - Account deletion option

### 9. Side Menu Navigation
- **Profile Access**: View/edit profile
- **My Orders**: Quick access to orders
- **Order History**: Past orders
- **Reviews**: My reviews and ratings
- **Settings**: App configuration
- **Help & Support**: FAQ, contact support
- **About**: App information
- **Logout**: Sign out option

## Technical Architecture

### Frontend (React + TypeScript + Vite)
```
Technology Stack:
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons
- Component-based architecture
- Client-side routing
- LocalStorage for token persistence
```

### Backend (Node.js + Express)
```
Technology Stack:
- Express.js server
- MongoDB Atlas database
- Passport.js authentication
- JWT token management
- RESTful API design
- Bcrypt for password hashing
```

### Key Directories:
```
/src
  /components        - React components
    /order          - Order flow screens
    /ui             - Reusable UI components
    /figma          - Design system components
  /services         - API service layer
  /data             - Static data (dress dataset)
  /config           - Configuration files
  
/backend
  /controllers      - Business logic
  /models           - Database schemas
  /routes           - API endpoints
  /middleware       - Authentication, validation
  /config           - Server configuration
  /utils            - Helper functions
```

### Database Models:
1. **User**: Authentication, profile, addresses, saved measurements
2. **Order**: Order details, status, timeline, items
3. **Measurement**: Body measurements linked to users
4. **Payment**: Transaction records, payment method, status
5. **Review**: Ratings, comments, photos, tailor reference
6. **Notification**: User notifications, read status

### API Endpoints:
```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google (OAuth)
POST /api/auth/verify-otp
POST /api/auth/forgot-password

Users:
GET /api/users/profile
PUT /api/users/profile
GET /api/users/addresses
POST /api/users/addresses

Orders:
POST /api/orders
GET /api/orders (with filters)
GET /api/orders/:id
PUT /api/orders/:id
DELETE /api/orders/:id

Tailors:
GET /api/tailors (with location filter)
GET /api/tailors/:id
GET /api/tailors/:id/reviews

Measurements:
POST /api/measurements
GET /api/measurements
PUT /api/measurements/:id

Payments:
POST /api/payments/initiate
POST /api/payments/verify
GET /api/payments/history

Reviews:
POST /api/reviews
GET /api/reviews (by user/tailor)
PUT /api/reviews/:id
DELETE /api/reviews/:id

Notifications:
GET /api/notifications
PUT /api/notifications/:id/read
```

## Design System

### Color Palette:
```css
Primary: #7A1F1F (Deep maroon)
Secondary: #D4AF37 (Gold)
Background: #F5E6D3 (Cream)
Accent: #EDD9B8 (Light gold)
Text Primary: #7A1F1F
Text Secondary: rgba(122, 31, 31, 0.7)
```

### Typography:
- **Headings**: Serif font family for elegance
- **Body**: Sans-serif for readability
- **Font Sizes**: Responsive scale from 12px to 32px

### UI Components:
- **Buttons**: Primary (filled), Secondary (outlined), Tertiary (text)
- **Cards**: Elevated with hover effects
- **Forms**: Labeled inputs with validation
- **Modals**: Overlay with backdrop
- **Toasts**: Success, error, info notifications
- **Progress Indicators**: Step-based and loading states

### Animations:
- **Page Transitions**: Slide and fade effects
- **Micro-interactions**: Button hover, card lift
- **Loading States**: Skeleton screens and spinners

## Data Management

### Dress Dataset (25+ Dress Types):
```typescript
interface DressDataset {
  men: DressType[];      // 9 types with 3-6 images each
  women: DressType[];    // 10 types with 3-5 images each
  kids: DressType[];     // 6 types with 3-4 images each
}

Each DressType includes:
- name: string
- category: 'men' | 'women' | 'kids'
- subcategory: 'Top Wear' | 'Bottom Wear' | 'Full Body' | 'Traditional' | 'Formal' | 'Casual'
- images: DressImage[] (URLs from Unsplash)
- description: string
- popularFor: string[]
```

### Measurement Configuration:
- Gender-specific measurement requirements
- Dress-type specific measurements
- Unit conversion (cm ↔ inches)
- Validation rules and acceptable ranges

## User Experience Features

### Accessibility:
- High contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Touch-friendly targets (minimum 44px)

### Performance:
- Lazy loading images
- Code splitting by route
- Optimized bundle size
- Fast initial load (<3 seconds)

### Offline Support:
- Cached static assets
- Draft order saving
- Retry failed requests
- Offline indicator

### Internationalization:
- Multi-language support (English, Hindi, regional languages)
- RTL layout support
- Currency formatting
- Date/time localization

## Security Features
- JWT token authentication with expiry
- Password hashing with bcrypt
- HTTPS enforcement
- CORS configuration
- Input sanitization
- SQL injection prevention
- XSS protection
- Rate limiting on API endpoints
- Secure payment gateway integration

## Future Enhancements (Roadmap)
1. **AR Fitting Room**: Virtual try-on using camera
2. **AI Style Recommendations**: ML-based outfit suggestions
3. **Video Consultations**: Live video calls with tailors
4. **Fabric Marketplace**: Buy fabrics directly through app
5. **Social Features**: Share designs, follow tailors
6. **Subscription Plans**: Monthly plans for regular customers
7. **Tailor Dashboard**: Dedicated app section for tailors
8. **Multi-language Support**: Expand to more languages
9. **Apple Login**: Add Apple Sign-In
10. **Chat System**: Real-time messaging between customer and tailor

## Business Model
- **Commission-based**: Take percentage from each order
- **Subscription Tiers**: Premium features for customers/tailors
- **Featured Listings**: Tailors pay for top placement
- **Advertising**: Fabric and accessory brands

## Success Metrics (KPIs)
- Monthly Active Users (MAU)
- Order Completion Rate
- Average Order Value (AOV)
- Customer Retention Rate
- Tailor Satisfaction Score
- App Rating (4.5+ stars target)
- Order Fulfillment Time
- Customer Support Response Time

## Compliance & Legal
- GDPR compliance (data privacy)
- Payment Card Industry (PCI) compliance
- Terms of Service
- Privacy Policy
- Refund and Cancellation Policy
- Tailor Agreement Terms

---

## Complete App Flow Summary

**User Journey:**
1. Download/Open App → Splash Screen
2. Login/Register (Phone/OTP or Google)
3. Land on Home Screen → Browse dress categories
4. Select Gender → Select Dress Type
5. Choose Order Type (Fresh/Alteration)
6. Customize Design (neck, sleeves, length, etc.)
7. Upload reference images (optional)
8. Enter Measurements
9. Select Tailor (view portfolios, ratings)
10. Review Price Estimate
11. See Detailed Price Breakdown
12. Make Payment
13. Receive Order Confirmation with tracking
14. Track Order Progress
15. Receive Delivery
16. Rate & Review Tailor

**Tailor Journey (Future):**
1. Register as Tailor
2. Complete Profile Setup
3. Upload Portfolio Samples
4. Set Pricing & Availability
5. Receive Order Notifications
6. Accept/Reject Orders
7. Confirm Measurements
8. Update Order Status
9. Request Payment Release
10. Build Reputation through Reviews

---

This METAIA Tailor App brings the centuries-old craft of tailoring into the digital age, making custom clothing accessible, transparent, and convenient for everyone.
