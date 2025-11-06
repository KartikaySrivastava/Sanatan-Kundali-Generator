import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Form from '../components/Form';

const Home = ({ setResult, setSummaryText }) => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FFFCFA'}}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-15 blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-amber-200 rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <div id="horoscope-form" className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Form setResult={setResult} setSummaryText={setSummaryText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;