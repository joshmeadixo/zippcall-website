"use client";

import { useState, useEffect } from 'react';
import Modal from './Modal';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Defining the form data structure
interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  // Add debugging
  useEffect(() => {
    console.log("ContactFormModal isOpen:", isOpen);
  }, [isOpen]);
  
  // Loading/success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting form data:', formData);
      
      // Send the form data to our API route
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status, response.statusText);
      
      // Try to parse the JSON response, but handle cases where it's not JSON
      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
        console.log('Response data:', result);
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Invalid response format from server');
      }
      
      if (!response.ok) {
        throw new Error(result?.error || 'Something went wrong');
      }
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('There was an error submitting your request. Please try again.');
      }
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Support"
    >
      <div className="py-4">
        {submitSuccess ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-bold text-zippcall-blue mb-2">Message Sent!</h3>
            <p className="text-zippcall-neutral">
              Thank you for contacting us. We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zippcall-neutral mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zippcall-blue focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zippcall-neutral mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zippcall-blue focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zippcall-neutral mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zippcall-blue focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-6 py-2 border border-gray-300 text-zippcall-neutral rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-zippcall-blue text-white rounded-md hover:bg-zippcall-blue/80 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
} 