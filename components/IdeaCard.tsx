import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StartupIdea, ChatMessage, User } from '../types';
import { generateIdeaFromChat } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { Layout } from './Footer'; // Repurposed as Layout

// Re-skinned and enhanced IdeaCard component for reuse
export const IdeaCard: React.FC<{ idea: StartupIdea }> = ({ idea }) => {
    const scoreColor = idea.ideaScore > 75 ? 'text-green-400' : idea.ideaScore > 50 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="bg-[#001e4c]/70 border border-gray-700 rounded-2xl shadow-xl overflow-hidden p-6 transition-all duration-300 hover:shadow-flame-orange/20 hover:border-flame-orange/50 w-full max-w-2xl mx-auto">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-flame-orange">{idea.ideaName}</h2>
                <p className="text-md text-gray-300 mt-1">{idea.description}</p>
            </div>
            
            <div className="mb-4">
                <h3 className="font-semibold text-white mb-2">Idea Score: <span className={scoreColor}>{idea.ideaScore}/100</span></h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-flame-orange h-2.5 rounded-full" style={{ width: `${idea.ideaScore}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-gray-700 pt-4">
                <div><h4 className="font-semibold text-white mb-1">🎯 Target Audience</h4><p className="text-gray-400">{idea.audience}</p></div>
                <div><h4 className="font-semibold text-white mb-1">💰 Monetization</h4><p className="text-gray-400">{idea.monetization}</p></div>
            </div>

            <div className="mt-4 border-t border-gray-700 pt-4">
                <h4 className="font-semibold text-white mb-1">🔬 Feasibility Analysis</h4>
                <p className="text-gray-400 text-sm">{idea.feasibilityAnalysis}</p>
            </div>
             <div className="mt-4 border-t border-gray-700 pt-4">
                <h4 className="font-semibold text-white mb-1">🤝 Suggested Mentors</h4>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                    {idea.suggestedMentors.map((mentor, i) => <li key={i}><strong>{mentor.name}</strong> - {mentor.expertise}</li>)}
                </ul>
            </div>
             <div className="mt-6 text-center">
                <button className="bg-flame-orange/20 text-flame-orange font-semibold py-2 px-4 rounded-lg border border-flame-orange hover:bg-flame-orange hover:text-white transition-colors">
                    Save Idea
                </button>
            </div>
        </div>
    );
};

// Main StudentDashboard component
export const StudentDashboard: React.FC<{ user: User, setView: (view: string) => void }> = ({ user, setView }) => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        { sender: 'ai', text: `Hi ${user.profile.name}! I'm your BizSpark AI. Tell me about your passions, skills, or any problems you'd like to solve.`, timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input, timestamp: Date.now() };
        const newChatHistory = [...chatHistory, userMessage];
        setChatHistory(newChatHistory);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await generateIdeaFromChat(newChatHistory);
            setChatHistory(prev => [...prev, aiResponse]);
        } catch (error) {
            const errorResponse: ChatMessage = { sender: 'ai', text: 'Sorry, something went wrong.', timestamp: Date.now() };
            setChatHistory(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, chatHistory]);

    return (
        <Layout currentView="dashboard" setView={setView}>
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {chatHistory.map((msg) => (
                            <div key={msg.timestamp} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-flame-orange flex items-center justify-center font-bold text-white flex-shrink-0">B</div>}
                                <div className={`max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-flame-orange text-white rounded-br-none' : 'bg-[#001e4c] text-gray-200 rounded-bl-none'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{__html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}/>
                                    {msg.idea && <div className="mt-4"><IdeaCard idea={msg.idea} /></div>}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-flame-orange flex items-center justify-center font-bold text-white flex-shrink-0">B</div>
                                <div className="max-w-lg p-3 rounded-2xl bg-[#001e4c] text-gray-200 rounded-bl-none">
                                    <LoadingSpinner />
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </div>
                <div className="p-4 bg-deep-blue border-t border-gray-700">
                    <div className="flex items-center bg-[#001e4c] rounded-full p-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Share your interests and skills..."
                            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none px-4"
                        />
                        <button onClick={handleSend} disabled={isLoading} className="bg-flame-orange text-white rounded-full p-2 disabled:bg-orange-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
