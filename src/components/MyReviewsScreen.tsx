import { ArrowLeft, Star, Package, User, Calendar, Edit2, Trash2, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState } from 'react';

interface MyReviewsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

interface Review {
  id: string;
  orderId: string;
  orderItem: string;
  tailorName: string;
  tailorImage?: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  images?: string[];
}

export function MyReviewsScreen({ onBack, onNavigate }: MyReviewsScreenProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'REV-001',
      orderId: 'ORD-2025-089',
      orderItem: 'Wedding Sherwani',
      tailorName: 'Royal Tailors',
      rating: 5,
      reviewText: 'Absolutely stunning work! The embroidery on my wedding sherwani was beyond expectations. Royal Tailors delivered exactly what I envisioned. The fit was perfect and the quality of stitching was exceptional. Highly recommend for special occasions!',
      reviewDate: '10 Jan 2026'
    },
    {
      id: 'REV-002',
      orderId: 'ORD-2025-076',
      orderItem: 'Designer Blouse',
      tailorName: 'Elegant Stitches',
      rating: 4,
      reviewText: 'Beautiful blouse with intricate mirror work. The fit was good and the design turned out well. Only minor issue was the delivery was a day late, but the quality made up for it. Will definitely order again!',
      reviewDate: '28 Dec 2025'
    },
    {
      id: 'REV-003',
      orderId: 'ORD-2025-023',
      orderItem: 'Lehenga Choli',
      tailorName: 'Elegant Stitches',
      rating: 5,
      reviewText: 'Extraordinary craftsmanship! The lehenga was perfect for my sister\'s wedding. The heavy embroidery work with sequins and stones was done beautifully. Every detail was taken care of. Worth every penny!',
      reviewDate: '08 Dec 2025'
    },
    {
      id: 'REV-004',
      orderId: 'ORD-2025-012',
      orderItem: 'Kurta Pyjama',
      tailorName: 'Royal Tailors',
      rating: 4,
      reviewText: 'Good quality kurta with comfortable fit. Simple and elegant design. The churidar pyjama was well stitched. Professional service and delivered on time. Happy with the purchase.',
      reviewDate: '24 Nov 2025'
    },
    {
      id: 'REV-005',
      orderId: 'ORD-2024-234',
      orderItem: 'Saree Blouse',
      tailorName: 'Elegant Stitches',
      rating: 5,
      reviewText: 'Perfect traditional blouse with excellent piping work. The fit was spot on and the finishing was very neat. Elegant Stitches always delivers quality work. This is my third order with them!',
      reviewDate: '12 Nov 2025'
    }
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState('');

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setEditRating(review.rating);
    setEditText(review.reviewText);
    setIsEditing(true);
  };

  const handleSaveReview = () => {
    if (selectedReview) {
      setReviews(reviews.map(r => 
        r.id === selectedReview.id 
          ? { ...r, rating: editRating, reviewText: editText }
          : r
      ));
      setIsEditing(false);
      setSelectedReview(null);
    }
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== reviewId));
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                  : 'fill-none text-[#D4AF37]/30'
              }`}
            />
          </button>
        ))}
      </div>
    );
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
        
        <h1 className="text-2xl font-serif text-[#7A1F1F] mt-4">My Reviews</h1>
        <p className="text-sm text-[#7A1F1F]/70 mt-1">Your feedback on tailoring services</p>
      </div>

      {/* Stats Card */}
      <div className="relative z-10 px-6 mb-6">
        <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Total Reviews</p>
              <p className="text-4xl font-bold text-white">{reviews.length}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm mb-1">Average Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-4xl font-bold text-[#D4AF37]">{averageRating}</p>
                <Star className="w-8 h-8 fill-[#D4AF37] text-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 340px)' }}>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border-2 border-[#D4AF37]/20 shadow-md hover:shadow-lg transition-all"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#7A1F1F]">{review.tailorName}</h3>
                      <p className="text-xs text-[#7A1F1F]/60">{review.orderItem}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="w-9 h-9 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 flex items-center justify-center transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-[#7A1F1F]" />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="w-9 h-9 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-sm text-[#7A1F1F] leading-relaxed mb-4">
                {review.reviewText}
              </p>

              {/* Footer Info */}
              <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                <div className="flex items-center gap-2 text-xs text-[#7A1F1F]/60">
                  <Calendar className="w-4 h-4" />
                  <span>{review.reviewDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#7A1F1F]/60">
                  <Package className="w-4 h-4" />
                  <span>{review.orderId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center mb-4">
              <MessageSquare className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-serif text-[#7A1F1F] mb-2">No Reviews Yet</h3>
            <p className="text-sm text-[#7A1F1F]/70 text-center">
              Complete an order to leave your first review
            </p>
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
      {isEditing && selectedReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] rounded-3xl w-full max-w-lg shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#7A1F1F] to-[#5A1515] p-6 rounded-t-3xl">
              <h2 className="text-2xl font-serif text-white">Edit Review</h2>
              <p className="text-sm text-white/70 mt-1">{selectedReview.orderItem}</p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Tailor Info */}
              <div className="flex items-center gap-3 mb-6 bg-white/80 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#7A1F1F]">{selectedReview.tailorName}</h3>
                  <p className="text-xs text-[#7A1F1F]/60">{selectedReview.orderId}</p>
                </div>
              </div>

              {/* Rating Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#7A1F1F] mb-3">Your Rating</label>
                <div className="flex justify-center bg-white/80 rounded-2xl p-4">
                  {renderStars(editRating, true, setEditRating)}
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#7A1F1F] mb-3">Your Review</label>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Share your experience with this tailor..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-sm text-[#7A1F1F] placeholder:text-[#7A1F1F]/40 resize-none"
                />
                <p className="text-xs text-[#7A1F1F]/60 mt-2">{editText.length} characters</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedReview(null);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-white/80 border-2 border-[#D4AF37]/30 text-[#7A1F1F] font-semibold hover:bg-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReview}
                  disabled={editRating === 0 || editText.trim().length === 0}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
