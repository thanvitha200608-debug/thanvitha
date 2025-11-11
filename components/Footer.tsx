import React from 'react';

// New Layout Component with Bottom Navigation
interface LayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'saved' | 'opportunities' | 'settings';
  setView: (view: string) => void;
}

const NavItem: React.FC<{ label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-flame-orange' : 'text-gray-400 hover:text-white'}`}>
        {icon}
        <span className="text-xs mt-1">{label}</span>
    </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const isStudent = localStorage.getItem('bizspark_user') ? JSON.parse(localStorage.getItem('bizspark_user')!).role === 'student' : true;
  const dashboardView = isStudent ? 'studentDashboard' : 'investorDashboard';

  return (
    <div className="h-screen w-screen flex flex-col bg-deep-blue">
      <main className="flex-grow overflow-hidden">
        {children}
      </main>
      <footer className="flex-shrink-0 bg-[#001e4c] border-t border-gray-700">
          <div className="flex justify-around items-center h-16">
              <NavItem label="Dashboard" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} isActive={currentView === 'dashboard'} onClick={() => setView(dashboardView) } />
              <NavItem label="Saved" icon={<svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>} isActive={currentView === 'saved'} onClick={() => { /* No-op */ }} />
              <NavItem label="Opportunities" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} isActive={currentView === 'opportunities'} onClick={() => setView('opportunities')} />
              <NavItem label="Settings" icon={<svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} isActive={currentView === 'settings'} onClick={() => setView('settings')} />
          </div>
      </footer>
    </div>
  );
};

const opportunities = [
  { type: 'WORKSHOP', title: 'Startup Pitch Deck Masterclass', date: 'Oct 28, 2024', description: 'Learn how to craft a compelling pitch deck that will wow investors. Led by an industry veteran.', paid: true, },
  { type: 'EVENT', title: 'Innovator\'s Meetup Delhi', date: 'Nov 12, 2024', description: 'Network with fellow student entrepreneurs, mentors, and investors in your city.', paid: false, },
  { type: 'BOOTCAMP', title: 'AI for Startups Bootcamp', date: 'Nov 18-22, 2024', description: 'A 5-day intensive paid bootcamp on leveraging AI to build and scale your business.', paid: true, },
  { type: 'EVENT', title: 'Global Entrepreneurship Week Kickoff', date: 'Nov 14, 2024', description: 'Join us for the kickoff event of the largest celebration of innovators and job creators.', paid: false, },
];

const OpportunityCard: React.FC<{ opp: typeof opportunities[0] }> = ({ opp }) => {
    const typeColor = {
        WORKSHOP: 'bg-blue-500/20 text-blue-300',
        EVENT: 'bg-purple-500/20 text-purple-300',
        BOOTCAMP: 'bg-green-500/20 text-green-300'
    };
    return (
         <div className="bg-[#001e4c] p-5 rounded-xl border border-gray-700 hover:border-flame-orange/50 transition-all duration-300 shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${typeColor[opp.type as keyof typeof typeColor]}`}>{opp.type}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{opp.title}</h3>
                </div>
                <span className={`text-sm font-semibold ${opp.paid ? 'text-flame-orange' : 'text-green-400'}`}>{opp.paid ? 'Paid' : 'Free'}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 mb-3">{opp.date}</p>
            <p className="text-gray-300">{opp.description}</p>
            <button className="mt-4 bg-flame-orange text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 text-sm">
                Learn More
            </button>
        </div>
    );
}

export const OpportunitiesScreen: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <Layout currentView="opportunities" setView={setView}>
            <div className="p-4 text-white h-full overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8 px-2">Opportunities</h1>
                <div className="space-y-6">
                    {opportunities.map((opp, index) => <OpportunityCard key={index} opp={opp} />)}
                </div>
            </div>
        </Layout>
    );
};

// Settings Screen Component
interface SettingsScreenProps {
  setView: (view: string) => void;
  onLogout: () => void;
}
export const SettingsScreen: React.FC<SettingsScreenProps> = ({ setView, onLogout }) => {
    return (
        <Layout currentView="settings" setView={setView}>
            <div className="p-4 text-white">
                <h1 className="text-3xl font-bold mb-8 px-4">Settings</h1>
                <div className="space-y-4">
                    <button className="w-full text-left p-4 bg-[#001e4c] rounded-lg hover:bg-gray-700 transition">Account Details</button>
                    <button className="w-full text-left p-4 bg-[#001e4c] rounded-lg hover:bg-gray-700 transition">Notifications</button>
                    <button onClick={() => setView('privacy')} className="w-full text-left p-4 bg-[#001e4c] rounded-lg hover:bg-gray-700 transition">Privacy Policy</button>
                     <button className="w-full text-left p-4 bg-[#001e4c] rounded-lg hover:bg-gray-700 transition">Report Spam or Ads</button>
                    <button onClick={onLogout} className="w-full text-left p-4 bg-flame-orange/20 text-flame-orange rounded-lg hover:bg-flame-orange/30 transition">Log Out</button>
                    <button className="w-full text-left p-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900/80 transition mt-8">Delete Account</button>
                </div>
            </div>
        </Layout>
    );
};