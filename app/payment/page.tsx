import { Banknote, CreditCard, DollarSign, Gift, Smartphone } from 'lucide-react';
import React from 'react';
import { FaMoneyBill } from 'react-icons/fa6';


const PaymentOptions = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Payment Options</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            We offer multiple secure payment options to make your shopping experience convenient and safe. Choose the one that works best for you.
          </p>
        </div>

        {/* Payment Methods Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Credit/Debit Cards */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <CreditCard size={24}/>
            <h2 className="text-xl font-semibold text-gray-800">Credit/Debit Cards</h2>
            <p className="text-gray-600">
              We accept all major credit and debit cards including Visa, MasterCard, and American Express. Payments are securely processed for your protection.
            </p>
          </div>

          {/* PayPal */}
          <div className="flex flex-col items-center space-y-4 text-center">
           <DollarSign size={24}/>
            <h2 className="text-xl font-semibold text-gray-800">PayPal</h2>
            <p className="text-gray-600">
              Pay easily using your PayPal account. This allows you to shop without entering your card details for each purchase.
            </p>
          </div>

          {/* Bank Transfers */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <Banknote size={24}/>
            <h2 className="text-xl font-semibold text-gray-800">Bank Transfers</h2>
            <p className="text-gray-600">
              You can opt for direct bank transfers. Please ensure you use your order number as a reference when making the payment.
            </p>
          </div>

          {/* Cash on Delivery */}
          <div className="flex flex-col items-center space-y-4 text-center">
           <FaMoneyBill size={24}/>
            <h2 className="text-xl font-semibold text-gray-800">Cash on Delivery</h2>
            <p className="text-gray-600">
              Pay in cash when your order is delivered to your doorstep. Available in select locations only.
            </p>
          </div>

          {/* Google Pay / Apple Pay */}
          <div className="flex flex-col items-center space-y-4 text-center">
           <Smartphone size={24}/>
            <h2 className="text-xl font-semibold text-gray-800">Google Pay / Apple Pay</h2>
            <p className="text-gray-600">
              For a quick checkout, you can pay with Google Pay or Apple Pay directly from your mobile device.
            </p>
          </div>

          {/* Installment Payments */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <Gift size={24}/>
            <h2 className="text-xl font-semibold text-gray-800">Installment Payments</h2>
            <p className="text-gray-600">
              Split your payments into manageable monthly installments with 0% interest. Choose this option at checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
