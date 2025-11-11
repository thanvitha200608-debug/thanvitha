import React from 'react';
import { ThemeDropIcon } from './ThemeDropIcon';

interface WelcomeScreenProps {
  setView: (view: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setView }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-deep-blue">
       <ThemeDropIcon className="w-48 h-auto mb-6" />
      <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
        Welcome to <span className="text-flame-orange">BizSpark</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300">
        Your AI co-pilot for turning brilliant ideas into successful startups. Connect, create, and innovate.
      </p>
      <div className="mt-10">
        <button
          onClick={() => setView('auth')}
          className="px-10 py-4 text-lg font-bold text-white bg-flame-orange rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-deep-blue focus:ring-orange-400"
        >
          Get Started
        </button>
      </div>
      <div className="absolute bottom-6 text-sm text-gray-400">
        <button onClick={() => setView('terms')} className="underline hover:text-white mx-2">Terms & Conditions</button>
        |
        <button onClick={() => setView('privacy')} className="underline hover:text-white mx-2">Privacy Policy</button>
      </div>
    </div>
  );
};