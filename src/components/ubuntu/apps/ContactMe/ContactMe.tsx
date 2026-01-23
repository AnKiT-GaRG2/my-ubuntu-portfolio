import { useState } from 'react';
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactMe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Validate email before sending
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // Validate all fields are filled
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('All fields are required');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      // Using Web3Forms - Simple and free email service
      // Get your free access key from https://web3forms.com
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          subject: subject,
          message: message,
          to: 'anki88520@gmail.com',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        // Clear form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try emailing directly at anki88520@gmail.com');
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="h-full w-full bg-gray-900 p-6 overflow-auto">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-600 rounded-full shadow-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Contact Me</h2>
            <p className="text-sm text-gray-400">Let's get in touch!</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4" />
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="john@example.com"
              required
              className={`w-full px-4 py-2.5 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-gray-400 ${
                emailError ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {emailError}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4" />
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              required
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-gray-400"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4" />
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me what's on your mind..."
              required
              rows={6}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none text-white placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'sending' || !!emailError}
            className={`w-full font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-md hover:shadow-lg ${
              status === 'sending' || emailError
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {status === 'sending' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>

          {/* Success Message */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <div className="flex items-start gap-2 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            Or email me directly at{' '}
            <a 
              href="mailto:anki88520@gmail.com" 
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              anki88520@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
