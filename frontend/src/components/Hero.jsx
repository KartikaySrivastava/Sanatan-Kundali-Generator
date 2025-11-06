import React from 'react';

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('horoscope-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5">
        <div className="w-96 h-96 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight mb-4" style={{color: '#E8853D'}}>
            Welcome to सनातन
          </h1>
          
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="text-4xl">🌟</div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-medium mb-8 max-w-3xl mx-auto leading-relaxed" style={{color: '#847062'}}>
          Get personalized predictions based on your birth chart with traditional Indian astrology
        </p>

        {/* Call to action buttons */}
        <div className="flex justify-center items-center mb-12">
          <button
            onClick={scrollToForm}
            className="group relative text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-amber-300"
            style={{backgroundColor: '#F19654'}}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>🔮</span>
              <span>Get My Free Horoscope</span>
            </span>
          </button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Step 1: Enter Birth Details</h3>
            <p className="text-amber-700 text-sm">Provide your name, date, time, and place of birth</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100">
            <div className="text-3xl mb-3">🕉️</div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Step 2: Get Analysis</h3>
            <p className="text-amber-700 text-sm">Our system calculates your birth chart instantly</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;