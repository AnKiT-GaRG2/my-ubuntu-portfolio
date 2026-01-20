import { Star } from 'lucide-react';
import { ReviewForm } from './ReviewForm';

export function AddReview() {
  return (
    <div className="h-full bg-ubuntu-window overflow-auto">
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <Star className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Write a Review</h1>
          <p className="text-foreground/70 max-w-lg mx-auto">
            Share your experience working with Ankit Garg. Your feedback helps showcase the quality of work and collaboration.
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-muted/20 rounded-xl p-6 border border-border">
          <ReviewForm isModal={false} />
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-muted/10 rounded-lg border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Why Your Review Matters
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Your feedback helps potential clients and collaborators understand the quality of work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Reviews build trust and credibility in the professional community</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Your testimonial will be displayed on the portfolio after review</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
