"use client";

import { useState, createContext, useContext, ReactNode } from 'react';
import Modal from './Modal';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import TermsOfServiceContent from './TermsOfServiceContent';
import LegalContent from './LegalContent';

export enum LegalModalType {
  None = 'none',
  PrivacyPolicy = 'privacy',
  TermsOfService = 'terms',
  LegalInfo = 'legal'
}

interface LegalModalsContextType {
  currentModal: LegalModalType;
  openPrivacyPolicy: () => void;
  openTermsOfService: () => void;
  openLegalInfo: () => void;
  closeModal: () => void;
}

const LegalModalsContext = createContext<LegalModalsContextType | undefined>(undefined);

export function useLegalModals() {
  const context = useContext(LegalModalsContext);
  if (context === undefined) {
    throw new Error('useLegalModals must be used within a LegalModalsProvider');
  }
  return context;
}

export function LegalModalsProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<LegalModalType>(LegalModalType.None);

  const openPrivacyPolicy = () => setCurrentModal(LegalModalType.PrivacyPolicy);
  const openTermsOfService = () => setCurrentModal(LegalModalType.TermsOfService);
  const openLegalInfo = () => setCurrentModal(LegalModalType.LegalInfo);
  const closeModal = () => setCurrentModal(LegalModalType.None);

  const value = {
    currentModal,
    openPrivacyPolicy,
    openTermsOfService,
    openLegalInfo,
    closeModal
  };

  return (
    <LegalModalsContext.Provider value={value}>
      {children}
      <ModalLegalPage />
    </LegalModalsContext.Provider>
  );
}

function ModalLegalPage() {
  const { currentModal, closeModal } = useLegalModals();

  return (
    <>
      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={currentModal === LegalModalType.PrivacyPolicy} 
        onClose={closeModal}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>

      {/* Terms of Service Modal */}
      <Modal 
        isOpen={currentModal === LegalModalType.TermsOfService} 
        onClose={closeModal}
        title="Terms of Service"
      >
        <TermsOfServiceContent />
      </Modal>

      {/* Legal Information Modal */}
      <Modal 
        isOpen={currentModal === LegalModalType.LegalInfo} 
        onClose={closeModal}
        title="Legal Information"
      >
        <LegalContent />
      </Modal>
    </>
  );
}

export default ModalLegalPage; 