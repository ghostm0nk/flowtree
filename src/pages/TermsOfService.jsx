import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Terms of Service</h1>
          <p className="text-gray-700 mb-4">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the <Link to="/" className="text-blue-600 hover:underline">flowtree.com</Link> website (the "Service") operated by FlowTree ("us", "we", or "our").
          </p>
          <p className="text-gray-700 mb-4">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
          </p>
          <p className="text-gray-700 mb-4">
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Accounts</h2>
          <p className="text-gray-700 mb-4">
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p className="text-gray-700 mb-4">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
          </p>
          <p className="text-gray-700 mb-4">
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Links To Other Web Sites</h2>
          <p className="text-gray-700 mb-4">
            Our Service may contain links to third-party web sites or services that are not owned or controlled by FlowTree.
          </p>
          <p className="text-gray-700 mb-4">
            FlowTree has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that FlowTree shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          </p>
          <p className="text-gray-700 mb-4">
            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Termination</h2>
          <p className="text-gray-700 mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p className="text-gray-700 mb-4">
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 mb-4">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Changes</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="text-gray-700 mb-4">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>

          <p className="text-gray-700 mb-4">
            This document was last updated on June 1, 2024.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;