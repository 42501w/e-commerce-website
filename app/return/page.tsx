import React from "react";

const ReturnsPage = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Returns & Refund Policy
        </h1>

        {/* Policy Overview Section */}
        <div className="text-gray-700 text-lg leading-7 mb-8">
          <p className="mb-4">
            We want you to be completely satisfied with your purchase. If you
            are not entirely happy with your product, we're here to help.
          </p>
          <p className="mb-4">
            Our return policy lasts 30 days. If 30 days have gone by since your
            purchase, unfortunately, we can’t offer you a refund or exchange.
          </p>
        </div>

        {/* Return Conditions Section */}
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Return Conditions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
          <li>The item must be unused and in the same condition you received it.</li>
          <li>The item must be in the original packaging.</li>
          <li>
            To complete your return, we require a receipt or proof of purchase.
          </li>
        </ul>

        {/* Refund Process Section */}
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Refund Process</h2>
        <p className="text-gray-700 text-lg leading-7 mb-8">
          Once your return is received and inspected, we will notify you of the
          approval or rejection of your refund. If approved, your refund will
          be processed, and a credit will automatically be applied to your
          original method of payment within a certain amount of days.
        </p>

        {/* Non-Returnable Items Section */}
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Non-Returnable Items</h2>
        <p className="text-gray-700 text-lg leading-7 mb-8">
          Some items are exempt from being returned:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
          <li>Gift cards</li>
          <li>Downloadable software products</li>
          <li>Personalized or customized items</li>
        </ul>

        {/* Contact for Support Section */}
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Need Help?</h2>
        <p className="text-gray-700 text-lg leading-7">
          If you have any questions or need assistance with your return, please
          contact our customer support at{" "}
          <a href="mailto:support@timbercraft.com" className="text-blue-600 hover:underline">
          support@timbercraft.com
          </a>{" "}
          or call us at (123) 456-7890.
        </p>
      </div>
    </section>
  );
};

export default ReturnsPage;
