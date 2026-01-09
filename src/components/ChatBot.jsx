import React, { useState, useEffect, useRef } from 'react';
import { chatbotKnowledge, defaultResponse } from '../data/chatbotData';
import { FaComments, FaPaperPlane, FaTimes, FaRobot } from 'react-icons/fa';
import './ChatBot.css';

const ChatBot = ({ startTimer = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm the Leroy Designs AI Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [hasOpenedAutomatically, setHasOpenedAutomatically] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-open after 1 second
    useEffect(() => {
        if (!startTimer) return; // Wait until enabled

        const timer = setTimeout(() => {
            if (!hasOpenedAutomatically) {
                setIsOpen(true);
                setHasOpenedAutomatically(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [hasOpenedAutomatically, startTimer]);

    // Scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Process bot response
        const lowerInput = inputValue.toLowerCase();
        let botResponseText = defaultResponse;

        // Simple keyword matching
        for (const item of chatbotKnowledge) {
            if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
                botResponseText = item.response;
                break;
            }
        }

        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponseText, sender: 'bot' }]);
        }, 600); // Small delay for realism

        setInputValue('');
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <FaComments />
                    <span className="tooltip">Chat with us!</span>
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <span className="brand-name">LEROY DESIGNS</span>
                            <span className="status-text"><div className="status-dot"></div> AI Assistant</span>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-content">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ask about services, quotes, location..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
