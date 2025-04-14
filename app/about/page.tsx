import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            We are dedicated to providing the best furniture products to enhance the beauty of your home. With years of experience and a passion for excellence, we bring innovative and stylish solutions to your living spaces.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to craft beautiful, functional furniture that reflects your style and elevates your space. We aim to provide the best in quality and service, ensuring that every customer enjoys a seamless shopping experience and a home they truly love.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Quality:</strong> We use the finest materials and craftsmanship to create durable, timeless pieces.</li>
            <li><strong>Innovation:</strong> We continuously seek new ways to design and deliver beautiful furniture.</li>
            <li><strong>Customer Focus:</strong> Our customers are at the heart of everything we do. We listen, learn, and strive to exceed their expectations.</li>
            <li><strong>Sustainability:</strong> We care for the environment by adopting eco-friendly practices in our production process.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-gray-600">
            We envision a world where every home is filled with beautifully designed furniture that not only looks great but also enhances daily living. Our goal is to inspire creativity and comfort in every space we touch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
