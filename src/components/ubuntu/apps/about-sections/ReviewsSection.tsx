import { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { ReviewForm } from '../ReviewForm';

const reviews = [
  {
    name: 'John Doe',
    role: 'Senior Developer at Tech Corp',
    rating: 5,
    comment: 'Excellent developer with great problem-solving skills. Delivered projects on time and exceeded expectations.',
    avatar: '👨‍💼',
  },
  {
    name: 'Sarah Smith',
    role: 'Project Manager at StartupXYZ',
    rating: 5,
    comment: 'Amazing team player! Great communication skills and always willing to help others. Highly recommended!',
    avatar: '👩‍💼',
  },
  {
    name: 'Mike Johnson',
    role: 'CTO at InnovateLabs',
    rating: 5,
    comment: 'Outstanding technical skills and creativity. Brought innovative solutions to complex challenges.',
    avatar: '👨‍💻',
  },
];

export function ReviewsSection() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <Star className="w-7 h-7 text-primary" />
          What People Say
        </h2>
        <button
          onClick={() => setShowReviewForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
        >
          <Send className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {reviews.map((review, index) => (
        <div 
          key={index}
          className="p-6 bg-muted/20 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
              {review.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{review.name}</h3>
              <p className="text-sm text-muted-foreground">{review.role}</p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
          <p className="text-foreground/80 italic">"{review.comment}"</p>
        </div>
      ))}

      {/* Bottom Add Review Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setShowReviewForm(true)}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all hover:scale-105 shadow-lg"
        >
          <Send className="w-5 h-5" />
          Share Your Experience
        </button>
      </div>

      {/* Add Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#3c3c3c] rounded-xl w-full max-w-lg mx-4 shadow-2xl border border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                Write a Review
              </h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/40 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <ReviewForm onClose={() => setShowReviewForm(false)} isModal={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
