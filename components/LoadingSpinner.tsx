import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center my-2">
    <div className="relative w-12 h-12">
      <div className="absolute border-4 border-t-4 border-gray-600 border-t-flame-orange rounded-full w-full h-full animate-spin"></div>
    </div>
  </div>
);


const termsContent = `
<h2 class="text-2xl font-bold text-flame-orange mb-4">BizStart – Terms & Conditions (Summary)</h2>
<ul class="space-y-3 text-gray-300 list-disc list-inside">
    <li><strong>General:</strong> BizStart connects students, entrepreneurs, and investors. By signing up, you accept these terms.</li>
    <li><strong>Purpose:</strong> We facilitate idea sharing and connections, not investment guarantees.</li>
    <li><strong>User Responsibilities:</strong> Provide honest info. You're responsible for your content and communication.</li>
    <li><strong>Startup Disclaimer:</strong> No guarantees of success or funding. BizStart isn’t liable for outcomes.</li>
    <li><strong>Liability:</strong> We’re not responsible for losses, disputes, or damages. No legal claims against BizStart.</li>
    <li><strong>User Disputes:</strong> BizStart isn’t involved in deals or payments. Resolve issues privately.</li>
    <li><strong>Intellectual Property:</strong> You own your ideas. We can display them non-exclusively.</li>
    <li><strong>Account Suspension:</strong> We may suspend accounts for violations or misuse.</li>
    <li><strong>Privacy:</strong> Your data is secure and never sold.</li>
    <li><strong>Terms Updates:</strong> We may update terms. Continued use means acceptance.</li>
    <li><strong>Governing Law:</strong> Governed by Indian law. Legal matters handled in your local court.</li>
    <li><strong>Contact:</strong> 📧 yourbizstartofficial@gmail.com</li>
</ul>
`;

const privacyContent = `
<h2 class="text-2xl font-bold text-flame-orange mb-4">BizStart – Privacy Policy (Summary)</h2>
<ul class="space-y-3 text-gray-300 list-disc list-inside">
    <li><strong>Info Collected:</strong> Name, email, password, role, skills, interests, usage data.</li>
    <li><strong>Use of Info:</strong> To manage accounts, match users, improve experience, send updates.</li>
    <li><strong>Data Sharing:</strong> No selling. Shared only with trusted hosts or law enforcement if required.</li>
    <li><strong>Protection:</strong> Data encrypted and stored securely via Supabase.</li>
    <li><strong>Your Rights:</strong> You can edit/delete your account or request data removal.</li>
    <li><strong>Cookies:</strong> Used for login sessions and functionality. Can be disabled.</li>
    <li><strong>Children:</strong> Must be 13+ to use. No data collected from underage users.</li>
    <li><strong>Policy Updates:</strong> We’ll notify you of changes via email or app.</li>
    <li><strong>Contact:</strong> 📧 yourbizstartofficial@gmail.com</li>
</ul>
`;

interface LegalScreenProps {
  type: 'terms' | 'privacy';
  setView: (view: string) => void;
}

export const LegalScreen: React.FC<LegalScreenProps> = ({ type, setView }) => {
  const content = type === 'terms' ? termsContent : privacyContent;
  const title = type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy';
  return (
    <div className="min-h-screen bg-deep-blue p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('welcome')} className="text-flame-orange hover:text-orange-300 mb-6">
          &larr; Back to Welcome
        </button>
        <div className="bg-[#001e4c] p-6 sm:p-8 rounded-lg border border-gray-700">
           <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};
