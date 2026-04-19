import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>
          <p className="text-gray-700 mb-4">
            Welcome to FlowTree. Your privacy is critically important to us. This Privacy Policy outlines how FlowTree collects, uses, maintains, and discloses information collected from users (each, a "User") of the <Link to="/" className="text-blue-600 hover:underline">flowtree.com</Link> website ("Site"). This privacy policy applies to the Site and all products and services offered by FlowTree.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Personal Identification Information</h2>
          <p className="text-gray-700 mb-4">
            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Non-personal Identification Information</h2>
          <p className="text-gray-700 mb-4">
            We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">How We Use Collected Information</h2>
          <p className="text-gray-700 mb-4">
            FlowTree may collect and use Users personal information for the following purposes:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
              <li>To personalize user experience: We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
              <li>To improve our Site: We may use feedback you provide to improve our products and services.</li>
              <li>To process payments: We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</li>
              <li>To send periodic emails: We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Sharing Your Personal Information</h2>
          <p className="text-gray-700 mb-4">
            We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            FlowTree has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Your Acceptance of These Terms</h2>
          <p className="text-gray-700 mb-4">
            By using this Site, you signify your acceptance of this policy and <Link to="/terms-of-service" className="text-blue-600 hover:underline">terms of service</Link>. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
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

export default PrivacyPolicy;