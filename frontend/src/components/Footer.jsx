import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{backgroundColor: '#F19654'}}>
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif">Mera Sanatan</h3>
                <p className="text-amber-200">Your Horoscope Portal</p>
              </div>
            </div>
            <p className="text-amber-100 mb-4 leading-relaxed max-w-md">
              Get your free horoscope predictions based on your birth chart.
              Accurate readings with traditional Indian astrology methods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                <span className="text-sm">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                <span className="text-sm">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                <span className="text-sm">📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-amber-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#horoscope" className="text-amber-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>⭐</span>
                  <span>Horoscope</span>
                </a>
              </li>
              <li>
                <a href="#pooja" className="text-amber-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>🕉️</span>
                  <span>Pooja Services</span>
                </a>
              </li>
              <li>
                <a href="#gemstones" className="text-amber-100 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <span>💎</span>
                  <span>Gemstones</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-200">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#birth-chart" className="text-amber-100 hover:text-white transition-colors duration-200">
                  Birth Chart Analysis
                </a>
              </li>
              <li>
                <a href="#compatibility" className="text-amber-100 hover:text-white transition-colors duration-200">
                  Compatibility Readings
                </a>
              </li>
              <li>
                <a href="#numerology" className="text-amber-100 hover:text-white transition-colors duration-200">
                  Numerology Reports
                </a>
              </li>
              <li>
                <a href="#predictions" className="text-amber-100 hover:text-white transition-colors duration-200">
                  Future Predictions
                </a>
              </li>
              <li>
                <a href="#consultation" className="text-amber-100 hover:text-white transition-colors duration-200">
                  Expert Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-700 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-amber-200 text-sm">
            <p>© 2024 Mera Sanatan. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>

          {/* Credits */}
          <div className="flex items-center space-x-2 text-amber-200 text-sm">
            <span>Made with</span>
            <span className="text-red-400 animate-pulse">❤️</span>
            <span>by Cosmic Developers</span>
          </div>
        </div>

        {/* Floating zodiac symbols */}
        <div className="absolute top-4 right-4 text-2xl opacity-20 animate-bounce">♈</div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-15 animate-pulse">♉</div>
      </div>
    </footer>
  );
};

export default Footer;