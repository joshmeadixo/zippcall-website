"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ContactFormModal from './ContactFormModal';

// Define the context type
interface ContactFormContextType {
  openContactForm: () => void;
  closeContactForm: () => void;
}

// Create the context with a default value
const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

// Custom hook to use the contact form context
export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
}

// Props for the provider component
interface ContactFormProviderProps {
  children: ReactNode;
}

// Provider component
export function ContactFormProvider({ children }: ContactFormProviderProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  const openContactForm = () => {
    console.log("Opening contact form modal");
    setShowContactModal(true);
  };

  const closeContactForm = () => {
    setShowContactModal(false);
  };

  // Value object to be provided to consumers
  const value = {
    openContactForm,
    closeContactForm,
  };

  return (
    <ContactFormContext.Provider value={value}>
      {children}
      <ContactFormModal 
        isOpen={showContactModal}
        onClose={closeContactForm}
      />
    </ContactFormContext.Provider>
  );
} 