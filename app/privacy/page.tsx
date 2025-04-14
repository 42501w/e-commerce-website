import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Last updated:
        </p>
        <p className="text-gray-600 mb-6">
          At <strong>TimberCraft</strong>, we are committed to protecting
          your privacy. This Privacy Policy outlines the types of personal
          information we collect, how it is used, and the measures we take to
          protect it. By using our website, you agree to the terms of this policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-6">
          We collect personal information that you provide to us directly, as
          well as information about how you use our website. This includes:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Personal Information: Name, email address, phone number, and shipping address.</li>
          <li>Payment Information: Credit card details and billing address for processing transactions.</li>
          <li>Usage Data: Information such as IP address, browser type, device information, and pages visited.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-6">
          The information we collect is used to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Process orders and transactions.</li>
          <li>Improve our website, products, and services.</li>
          <li>Personalize your shopping experience.</li>
          <li>Send you marketing communications and updates about our products (you can opt out at any time).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
        <p className="text-gray-600 mb-6">
          We do not sell, trade, or rent your personal information. However, we may share your information with:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Third-party service providers (such as payment processors and shipping companies) who assist in providing services related to your order.</li>
          <li>Law enforcement authorities if required by law or to protect our rights.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookies</h2>
        <p className="text-gray-600 mb-6">
          Our website uses cookies to enhance your user experience. Cookies are small files stored on your device that help us analyze website traffic and remember your preferences.
        </p>
        <p className="text-gray-600 mb-6">
          You can control cookie settings through your browser. Disabling cookies may affect your experience on our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
        <p className="text-gray-600 mb-6">
          We take appropriate measures to protect your personal data from unauthorized access, alteration, or disclosure. However, please note that no method of internet transmission is fully secure, and we cannot guarantee complete security.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
        <p className="text-gray-600 mb-6">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Access the personal information we hold about you.</li>
          <li>Request corrections or updates to your information.</li>
          <li>Request the deletion of your personal data (subject to certain limitations).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Privacy Policy</h2>
        <p className="text-gray-600 mb-6">
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated "Last updated" date. Please review this policy periodically.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions about this Privacy Policy or your personal data, please contact us at:
        </p>
        <p className="text-gray-600 mb-6">
          <strong>TimberCraft</strong> <br />
          Email: <a href="mailto:support@timbercraft.com" className="text-blue-500">support@timbercraft.com</a> <br />
          Address: 400 University Drive Suite 200 Coral Gables,
          FL 33134 USA
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
