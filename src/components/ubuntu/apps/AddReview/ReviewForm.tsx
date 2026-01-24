import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';

interface ReviewFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function ReviewForm({ onClose, isModal = false }: ReviewFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    designation: '',
    comment: '',
    rating: 5,
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);
    
    // console.log('=== REVIEW FORM SUBMISSION STARTED ===');
    // console.log('Form Data:', {
    //   name: reviewForm.name,
    //   designation: reviewForm.designation,
    //   rating: reviewForm.rating,
    //   comment: reviewForm.comment
    // });
    
    try {
      const payload = {
        name: reviewForm.name,
        designation: reviewForm.designation,
        rating: `${reviewForm.rating}/5 stars`,
        review: reviewForm.comment,
        _subject: 'New Review from Portfolio',
        _template: 'table'
      };
      
      //console.log('Sending payload to FormSubmit:', payload);
      
      const response = await fetch('https://formsubmit.co/ajax/anki88520@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      //console.log('Response status:', response.status);
      //console.log('Response ok:', response.ok);
      
      const responseData = await response.json();
      //console.log('Response data:', responseData);

      if (response.ok) {
        //console.log('✅ Review submitted successfully!');
        setSubmitMessage({ type: 'success', text: 'Thanks for your feedback! Your review has been sent to Ankit Garg and will be added to the site soon.' });
        setReviewForm({ name: '', designation: '', comment: '', rating: 5 });
        if (isModal && onClose) {
          setTimeout(() => {
            onClose();
          }, 3000);
        }
      } else {
        //console.error('❌ Response not ok:', responseData);
        throw new Error('Failed to submit review');
      }
    } catch (error) {
     // console.error('❌ Error submitting review:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
    } finally {
      setSubmitting(false);
      //console.log('=== REVIEW FORM SUBMISSION ENDED ===');
    }
  };

  return (
    <form onSubmit={handleSubmitReview} className="space-y-4">
      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`p-4 rounded-lg border-2 flex items-start gap-3 ${
          submitMessage.type === 'success' 
            ? 'bg-green-500/20 border-green-500/50 text-green-300' 
            : 'bg-red-500/20 border-red-500/50 text-red-300'
        }`}>
          {submitMessage.type === 'success' && <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
          <p>{submitMessage.text}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          value={reviewForm.name}
          onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
          disabled={submitting}
          className="w-full bg-[#2d2d2d] text-white border-2 border-border focus:border-primary rounded-lg px-4 py-2 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Designation <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          value={reviewForm.designation}
          onChange={(e) => setReviewForm({ ...reviewForm, designation: e.target.value })}
          disabled={submitting}
          className="w-full bg-[#2d2d2d] text-white border-2 border-border focus:border-primary rounded-lg px-4 py-2 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Senior Developer at Tech Corp"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Rating <span className="text-primary">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => !submitting && setReviewForm({ ...reviewForm, rating: star })}
              disabled={submitting}
              className={`transition-transform hover:scale-110 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= reviewForm.rating
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Review <span className="text-primary">*</span>
        </label>
        <textarea
          required
          value={reviewForm.comment}
          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
          disabled={submitting}
          className="w-full bg-[#2d2d2d] text-white border-2 border-border focus:border-primary rounded-lg px-4 py-2 focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          rows={4}
          placeholder="Share your experience working with me..."
        />
      </div>

      {/* Footer */}
      <div className={`flex gap-3 pt-4 ${isModal ? '' : 'justify-end'}`}>
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-muted/40 hover:bg-muted/60 text-foreground rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className={`${isModal ? 'flex-1' : 'w-full'} px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <Send className={`w-4 h-4 ${submitting ? 'animate-pulse' : ''}`} />
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
