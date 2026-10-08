import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Day1 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full min-h-[800px] flex flex-col">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Day 1 - React Basics</h1>
            <p className="text-slate-600 mt-2">Study materials and PDF notes for React Basics.</p>
          </div>
          
          <div className="flex-grow bg-slate-100 rounded-lg overflow-hidden border border-slate-300">
            <iframe 
              src="/react-basics.pdf" 
              className="w-full h-full min-h-[700px]" 
              title="React Basics PDF"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Day1;
