import React from "react";
import { Users, Award, Sprout, Tractor, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">About Agrimitra</h1>
            <p className="text-xl mb-8">
              Empowering farmers with technology, knowledge, and tools to
              achieve sustainable agricultural success.
            </p>
            <Link
              to="/contact"
              className="bg-green-600 hover:bg-green-700 w-1/4 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <span>Contact Us</span>
              <Phone className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            At Agrimitra, our mission is to revolutionize agriculture by
            providing farmers with cutting-edge tools, expert advice, and a
            supportive community. We aim to make farming more efficient,
            sustainable, and profitable for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Sprout className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Promoting eco-friendly farming practices to ensure a greener
                future.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                Building a strong network of farmers to share knowledge and
                experiences.
              </p>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Delivering high-quality products and services to empower
                farmers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Agrimitra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Tractor className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Modern Equipment</h3>
              <p className="text-gray-600">
                Access to the latest farming technology and tools.
              </p>
            </div>
            <div className="text-center">
              <Sprout className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">
                Encouraging eco-friendly and sustainable farming methods.
              </p>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All products meet strict quality standards for better farming.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join the Agrimitra Community
          </h2>
          <p className="text-xl mb-8">
            Be a part of our mission to transform agriculture and empower
            farmers worldwide.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
