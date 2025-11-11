import React, { useState, useEffect, useCallback } from 'react';
import { WelcomeScreen } from './components/Header'; // Repurposed as WelcomeScreen
import { AuthScreen } from './components/Hero'; // Repurposed as AuthScreen
import { ProfileSetupScreen } from './components/InvestorView'; // Repurposed as ProfileSetupScreen
import { StudentDashboard } from './components/IdeaCard'; // Repurposed as StudentDashboard
import { SettingsScreen, OpportunitiesScreen } from './components/Footer'; // Repurposed as SettingsScreen
import { User, Role } from './types';
import { LegalScreen } from './components/LoadingSpinner'; // Repurposed as LegalScreen
import { ThemeDropIcon } from './components/ThemeDropIcon';

const App: React.FC = () => {
  const [view, setView] = useState('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bizspark_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser) as User;
        setUser(parsedUser);
        if (!parsedUser.profileComplete) {
          setView('profileSetup');
        } else {
          setView(parsedUser.role === Role.STUDENT ? 'studentDashboard' : 'investorDashboard');
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('bizspark_user');
    }
    setLoading(false);
  }, []);

  const handleSetUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('bizspark_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('bizspark_user');
      setView('welcome');
    }
  }, []);
  
  const handleLogout = useCallback(() => {
    if (user?.email) {
      localStorage.setItem('bizspark_last_email', user.email);
    }
    handleSetUser(null);
  }, [handleSetUser, user]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center bg-deep-blue">
          <ThemeDropIcon className="w-40 h-auto animate-pulse" />
        </div>
      );
    }

    switch (view) {
      case 'auth':
        return <AuthScreen setView={setView} setUser={handleSetUser} />;
      case 'profileSetup':
        return <ProfileSetupScreen user={user!} setUser={handleSetUser} setView={setView} />;
      case 'studentDashboard':
        return <StudentDashboard user={user!} setView={setView} />;
       case 'investorDashboard':
         // Note: Using AuthScreen component as a placeholder for InvestorDashboard UI
        return <AuthScreen isInvestorView={true} setView={setView}/>;
      case 'settings':
        return <SettingsScreen setView={setView} onLogout={handleLogout} />;
      case 'opportunities':
        return <OpportunitiesScreen setView={setView} />;
      case 'terms':
        return <LegalScreen type="terms" setView={setView} />;
      case 'privacy':
        return <LegalScreen type="privacy" setView={setView} />;
      default:
        return <WelcomeScreen setView={setView} />;
    }
  };

  return (
    <div className="bg-deep-blue min-h-screen font-sans">
      {renderContent()}
    </div>
  );
};

export default App;