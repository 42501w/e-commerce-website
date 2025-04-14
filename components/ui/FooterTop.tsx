import React from 'react'

const FooterTop = () => {
  return (
    <div>
         <div className="bg-[#f9f5f3] py-12 mt-2">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-bold text-lg">Free Delivery</h3>
                <p className="text-gray-500">For all orders over $50, consectetur adipiscing elit.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">90 Days Return</h3>
                <p className="text-gray-500">If goods have problems, consectetur adipiscing elit.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Secure Payment</h3>
                <p className="text-gray-500">100% secure payment, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FooterTop