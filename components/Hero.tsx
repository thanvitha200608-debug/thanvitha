import React, { useState, useEffect } from 'react';
import { Role, User } from '../types';
import { StartupIdea } from '../types';
import { IdeaCard } from './IdeaCard'; // Reusing IdeaCard for display

// Combined Component for AuthScreen and InvestorDashboard
interface CombinedScreenProps {
  setView: (view: string) => void;
  setUser?: (user: User) => void;
  isInvestorView?: boolean;
}

// Sample data for Investor Dashboard
const sampleIdeas: StartupIdea[] = [
    {
        ideaName: "ConnectU",
        description: "A hyper-local social platform for university students to find study groups, campus events, and peer-to-peer skill sharing.",
        audience: "University and College Students",
        monetization: "Freemium model with premium features for event organizers and campus businesses.",
        ideaScore: 88,
        feasibilityAnalysis: "High user adoption potential due to a clear need. Key challenges include reaching critical mass on each campus and managing content moderation.",
        suggestedMentors: [{name: "Priya Sharma", expertise: "Community Building & EdTech Growth"}, {name: "Raj Singh", expertise: "Angel Investor in SaaS"}]
    },
    {
        ideaName: "EcoPack",
        description: "A subscription service providing households with zero-waste, reusable packaging for groceries and everyday essentials.",
        audience: "Eco-conscious consumers and families.",
        monetization: "Monthly subscription fee based on household size.",
        ideaScore: 92,
        feasibilityAnalysis: "Strong market trend towards sustainability. Logistics and sanitization at scale are the primary operational hurdles to overcome.",
        suggestedMentors: [{name: "Anjali Mehta", expertise: "Supply Chain & Logistics"}, {name: "Vikram Desai", expertise: "Impact Investor, CleanTech"}]
    }
];


export const AuthScreen: React.FC<CombinedScreenProps> = ({ setView, setUser, isInvestorView = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLogin) {
      const lastEmail = localStorage.getItem('bizspark_last_email');
      if (lastEmail) {
        setEmail(lastEmail);
      }
    }
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Mock authentication
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email,
      role,
      profile: { name: '' },
      profileComplete: false,
    };
    if (setUser) setUser(mockUser);
    setView('profileSetup');
  };
  
  if (isInvestorView) {
    return (
        <div className="min-h-screen bg-deep-blue p-4">
             <header className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Investor Dashboard</h1>
                <button onClick={() => setView('settings')} className="text-white">⚙️</button>
            </header>
            <main className="container mx-auto py-4">
                <p className="text-lg text-gray-300 mb-8 px-4">Discover the next wave of innovation from bright minds.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sampleIdeas.map((idea, index) => <IdeaCard key={index} idea={idea} />)}
                </div>
            </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-deep-blue">
      <div className="w-full max-w-md mx-auto bg-[#001e4c] p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-center text-gray-400 mb-6">Let's get you started.</p>
        
        {!isLogin && (
          <div className="flex bg-deep-blue p-1 rounded-lg mb-6">
            <button onClick={() => setRole(Role.STUDENT)} className={`w-1/2 p-2 rounded-md font-semibold transition ${role === Role.STUDENT ? 'bg-flame-orange text-white' : 'text-gray-300'}`}>I'm a Student</button>
            <button onClick={() => setRole(Role.INVESTOR)} className={`w-1/2 p-2 rounded-md font-semibold transition ${role === Role.INVESTOR ? 'bg-flame-orange text-white' : 'text-gray-300'}`}>I'm an Investor</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
          </div>
          <button type="submit" className="w-full bg-flame-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition duration-300">{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>
        
        <p className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-flame-orange hover:text-orange-400 ml-1">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};