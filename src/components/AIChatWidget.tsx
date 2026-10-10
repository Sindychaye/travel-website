import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Sun,
  Package,
  Utensils,
  Maximize2,
  Minimize2,
  Trash2,
  ChevronDown,
  RotateCcw,
  Check,
  Copy,
} from 'lucide-react';
import { ChatMessage } from '../types/travel';
import { askGeminiAssistant } from '../services/aiTravelService';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  initialPrompt?: string;
  onApplyItineraryPrompt?: (prompt: string) => void;
}

export const AIChatWidget: React.FC<Props> = ({
  isOpen,
  onToggle,
  initialPrompt,
  onApplyItineraryPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello! I am **WanderAI**, your private travel concierge for Penang, Malaysia and beyond.

Ask me about:
• 🍜 **Legendary Street Food:** Best Siam Road Char Kway Teow, Teochew Chendol, and Nasi Kandar.
• 🌤️ **Live Weather:** Tropical temperatures and rain forecasts.
• 🎒 **Smart Packing:** Temple dress etiquette and monsoon essentials.
• 📍 **Personalized Recommendations:** Hidden heritage cafes and quiet sunset spots.

How can I help you plan your journey today?`,
      timestamp: 'Just now',
      quickActions: [
        { label: '🌤️ Penang Weather', actionType: 'show_weather' },
        { label: '🎒 Packing Checklist', actionType: 'show_packing' },
        { label: '🍜 Michelin Street Food', actionType: 'prompt', payload: 'What are the top 5 must-eat street food dishes in Penang and where to find them?' },
        { label: '🗣️ Penang Slang & Phrases', actionType: 'prompt', payload: 'Teach me useful Penang Hokkien and Malay phrases for ordering food' },
      ],
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle external initial prompt if provided
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Map existing messages to API format
      const apiHistory = messages.map((m) => ({
        role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        text: m.content,
      }));
      apiHistory.push({ role: 'user', text });

      const reply = await askGeminiAssistant(apiHistory, 'Penang, Malaysia');

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'I encountered a brief hiccup connecting to the concierge network. Please try asking again!',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: { label: string; actionType: string; payload?: string }) => {
    if (action.actionType === 'show_weather') {
      handleSend('What is the current weather in Penang, and what should I expect during the day?');
    } else if (action.actionType === 'show_packing') {
      handleSend('Provide an essential packing checklist for traveling to Penang, including temple dress codes.');
    } else if (action.payload) {
      handleSend(action.payload);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset-msg',
        role: 'assistant',
        content: 'Conversation cleared! How can I assist with your Penang or global travels?',
        timestamp: 'Just now',
        quickActions: [
          { label: '🌤️ Penang Weather', actionType: 'show_weather' },
          { label: '🎒 Packing Checklist', actionType: 'show_packing' },
        ],
      },
    ]);
  };

  // Helper to format basic markdown (bold, bullets, headers) safely
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-stone-900 mt-2 text-sm">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('• ') || line.startsWith('- ')) {
            const raw = line.replace(/^[•-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatBold(raw) }} />
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const match = line.match(/^(\d+\.)\s*(.*)$/);
            if (match) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-1">
                  <span className="font-bold text-amber-700 shrink-0 text-xs">{match[1]}</span>
                  <span dangerouslySetInnerHTML={{ __html: formatBold(match[2]) }} />
                </div>
              );
            }
          }
          if (line.trim() === '') {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatBold(line) }} />
          );
        })}
      </div>
    );
  };

  const formatBold = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-stone-900">$1</strong>');
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 px-4 py-3.5 rounded-full bg-stone-900 text-white shadow-2xl border border-stone-700/80 flex items-center gap-3 hover:scale-105 transition-all duration-300 group cursor-pointer hover:bg-stone-800"
          aria-label="Open WanderAI travel assistant"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-stone-900 animate-pulse" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <span className="block text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
              Ask WanderAI
            </span>
            <span className="block text-[10px] text-stone-400">Penang Concierge</span>
          </div>
        </button>
      )}

      {/* Persistent Floating Chat Widget Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white rounded-3xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'bottom-4 right-4 left-4 top-4 sm:left-auto sm:top-auto sm:w-[540px] sm:h-[720px]'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 select-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide font-serif">
                    WanderAI Concierge
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-amber-300 font-medium">
                  Penang & World Travel Specialist
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-stone-400">
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? 'Minimize size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={onToggle}
                className="p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Preset Pill Strip */}
          <div className="px-3 py-2 bg-stone-100 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => handleSend('What is the weather like in Penang today, and what should I wear?')}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 text-[11px] font-medium flex items-center gap-1 whitespace-nowrap transition-colors shrink-0"
            >
              <Sun className="w-3 h-3 text-amber-600" />
              <span>Weather</span>
            </button>
            <button
              onClick={() => handleSend('What should I pack for a 4-day trip to Penang including temple dress codes?')}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 text-[11px] font-medium flex items-center gap-1 whitespace-nowrap transition-colors shrink-0"
            >
              <Package className="w-3 h-3 text-amber-600" />
              <span>Packing List</span>
            </button>
            <button
              onClick={() => handleSend('Recommend the best street food stalls in George Town for dinner tonight')}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 text-[11px] font-medium flex items-center gap-1 whitespace-nowrap transition-colors shrink-0"
            >
              <Utensils className="w-3 h-3 text-amber-600" />
              <span>Street Food</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-stone-800 transition-all ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-white border border-stone-200/90 rounded-bl-none'
                  }`}
                >
                  {/* Message Content */}
                  {msg.role === 'user' ? (
                    <p className="text-xs sm:text-[13px] leading-relaxed text-white whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  ) : (
                    renderFormattedContent(msg.content)
                  )}

                  {/* Assistant Message Quick Action Chips */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1.5">
                      {msg.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickAction(qa)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-[11px] font-medium transition-colors border border-stone-200/80 cursor-pointer"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Message Bottom Footer (Timestamp & Copy) */}
                  <div className="mt-2 flex items-center justify-between text-[10px] opacity-70">
                    <span className={msg.role === 'user' ? 'text-amber-100' : 'text-stone-400'}>
                      {msg.timestamp}
                    </span>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="hover:opacity-100 p-0.5 text-stone-400 hover:text-stone-700 transition-opacity"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-none p-3.5 shadow-sm flex items-center gap-2 text-xs text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-stone-400 ml-1">WanderAI is researching Penang...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for recommendations, weather, or street food..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md disabled:opacity-50 transition-all cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-400 px-1">
              <span>Powered by Gemini 3.8 Flash</span>
              <span>24/7 Island Concierge</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
