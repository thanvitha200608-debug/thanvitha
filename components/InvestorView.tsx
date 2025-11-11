import React, { useState } from 'react';
import { User, Role } from '../types';

interface ProfileSetupProps {
  user: User;
  setUser: (user: User) => void;
  setView: (view: string) => void;
}

export const ProfileSetupScreen: React.FC<ProfileSetupProps> = ({ user, setUser, setView }) => {
  const [formData, setFormData] = useState(user.profile);
  const isStudent = user.role === Role.STUDENT;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, profile: formData, profileComplete: true };
    setUser(updatedUser);
    setView(isStudent ? 'studentDashboard' : 'investorDashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-deep-blue">
      <div className="w-full max-w-lg mx-auto bg-[#001e4c] p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-2">Complete Your Profile</h2>
        <p className="text-center text-gray-400 mb-8">This helps us tailor your experience.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
          </div>
          
          {isStudent ? (
            <>
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-300 mb-2">Your Interests & Passions</label>
                <textarea name="interests" id="interests" value={formData.interests || ''} onChange={handleChange} rows={3} placeholder="e.g., Sustainable tech, AI in education, gaming" className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">Your Skills & Expertise</label>
                <textarea name="skills" id="skills" value={formData.skills || ''} onChange={handleChange} rows={3} placeholder="e.g., Python, UI/UX design, marketing" className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
              </div>
              <div>
                <label htmlFor="certifications" className="block text-sm font-medium text-gray-300 mb-2">Certifications (Optional)</label>
                <textarea name="certifications" id="certifications" value={formData.certifications || ''} onChange={handleChange} rows={3} placeholder="e.g., Google Cloud Certified, AWS Solutions Architect" className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
              </div>
            </>
          ) : (
             <>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company / Firm</label>
                <input type="text" name="company" id="company" value={formData.company || ''} onChange={handleChange} className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
              </div>
              <div>
                <label htmlFor="focusAreas" className="block text-sm font-medium text-gray-300 mb-2">Investment Focus Areas</label>
                <textarea name="focusAreas" id="focusAreas" value={formData.focusAreas || ''} onChange={handleChange} rows={3} placeholder="e.g., FinTech, HealthTech, B2B SaaS" className="w-full bg-deep-blue border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-flame-orange focus:border-flame-orange" />
              </div>
            </>
          )}
          
          <button type="submit" className="w-full bg-flame-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition duration-300">Save Profile</button>
        </form>
      </div>
    </div>
  );
};