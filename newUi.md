PRELOADER (Термінальний вивід)
Концепція
Замість спіннера — імітація завантаження коду в терміналі з glitch ефектами.
Технічна реалізація
jsx// components/Preloader.tsx
'use client';

import { useEffect, useState } from 'react';

const TERMINAL_LINES = [
  '> Initializing L&H Studio...',
  '> Loading dependencies... [████████] 100%',
  '> Connecting to server... OK',
  '> Fetching brutalist assets...',
  '> Compiling Neo-Brutalism styles... ✓',
  '> Rendering chaos... COMPLETE',
  '> Welcome to L&H Studio.'
];

export default function Preloader() {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[currentIndex]]);
        currentIndex++;
      } else {
        setIsComplete(true);
        setTimeout(() => {
          // Fade out preloader
        }, 500);
      }
    }, 300); // Швидкість друку

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono">
      <div className="w-full max-w-2xl px-4">
        {/* Terminal header */}
        <div className="border-4 border-[#FF4D00] bg-black p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#FF4D00] pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-[#FF4D00] text-sm ml-2">root@lh-studio:~$</span>
          </div>
          
          {/* Terminal output */}
          <div className="space-y-2">
            {lines.map((line, i) => (
              <div
                key={i}
                className="text-[#00FF00] text-sm md:text-base animate-glitch"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {line}
                {i === lines.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-[#00FF00] ml-1 animate-blink"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-[#111111] border-4 border-[#FF4D00] overflow-hidden">
          <div
            className="h-full bg-[#FF4D00] transition-all duration-300"
            style={{ width: `${(lines.length / TERMINAL_LINES.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
CSS Анімації
css/* globals.css */
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.animate-glitch {
  animation: glitch 0.3s ease-in-out;
}

.animate-blink {
  animation: blink 1s infinite;
}
```

---

## 📌 HEADER (Sticky Navigation)

### Layout
```
[LOGO]                    [ПОСЛУГИ] [ПРОЄКТИ] [КОНТАКТИ]      [AI ЧАТ 🤖] [КОНСУЛЬТАЦІЯ]
Реалізація
jsx// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header({ 
  onOpenConsultation, 
  onOpenAIChat 
}: {
  onOpenConsultation: () => void;
  onOpenAIChat: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${isScrolled 
          ? 'bg-black border-b-4 border-[#FF4D00] shadow-[0_8px_0px_#FF4D00]' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="group">
          <div className="relative">
            <span className="text-3xl font-bold font-grotesk text-white">
              L&H
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-1 bg-[#FF4D00] group-hover:w-full transition-all duration-300"></div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="#services" 
            className="text-white hover:text-[#FF4D00] font-bold transition-colors uppercase tracking-wide"
          >
            Послуги
          </Link>
          <Link 
            href="#portfolio" 
            className="text-white hover:text-[#FF4D00] font-bold transition-colors uppercase tracking-wide"
          >
            Проєкти
          </Link>
          <Link 
            href="#contact" 
            className="text-white hover:text-[#FF4D00] font-bold transition-colors uppercase tracking-wide"
          >
            Контакти
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          
          {/* AI Chat Button */}
          <button
            onClick={onOpenAIChat}
            className="
              relative px-4 py-2 bg-[#FFD700] text-black font-bold 
              border-4 border-black rotate-2
              hover:rotate-0 hover:shadow-[8px_8px_0px_#111111]
              transition-all duration-200
              uppercase text-sm
            "
          >
            🤖 AI ЧАТ
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FF4D00] rounded-full border-2 border-black animate-pulse"></div>
          </button>

          {/* Consultation Button */}
          <button
            onClick={onOpenConsultation}
            className="
              px-6 py-2 bg-[#FF4D00] text-black font-bold 
              border-4 border-black -rotate-1
              hover:rotate-0 hover:shadow-[8px_8px_0px_#111111]
              transition-all duration-200
              uppercase
            "
          >
            Консультація
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </header>
  );
}
Стилі

Sticky: position: fixed
Scroll trigger: Background чорний + border Acid Lime
Buttons: Rotation + offset shadow on hover
AI Chat: Жовтий фон + pulse badge
Consultation: Acid Lime фон


🪟 MODAL 1: Форма Консультації
UI Концепція
Neo-Brutalism форма з rotation, кольоровими блоками, і агресивними тінями.
Реалізація
jsx// components/ConsultationModal.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ConsultationModal({ 
  isOpen, 
  onClose 
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Telegram API або email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ name: '', phone: '', service: '', message: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl">
        
        {/* Floating Badge */}
        <div className="absolute -top-6 -left-6 bg-[#FFD700] px-4 py-2 border-4 border-black rotate-12 shadow-[8px_8px_0px_#111111] z-10">
          <span className="font-bold text-black uppercase text-sm">Безкоштовно</span>
        </div>

        {/* Main Form */}
        <div className="bg-[#F8F9FA] border-8 border-black shadow-[16px_16px_0px_#FF4D00] -rotate-1">
          
          {/* Header */}
          <div className="bg-[#FF4D00] px-6 py-4 border-b-4 border-black flex items-center justify-between">
            <h2 className="text-3xl font-bold font-grotesk text-black uppercase">
              Замовити Консультацію
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black text-[#FF4D00] hover:bg-[#FFD700] hover:text-black border-4 border-black transition-colors"
            >
              <X className="w-6 h-6 mx-auto" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Name Input */}
            <div className="relative">
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                /// Ім'я
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="
                  w-full px-4 py-3 bg-white border-4 border-black 
                  focus:border-[#FF4D00] focus:shadow-[4px_4px_0px_#FF4D00]
                  outline-none transition-all duration-200
                  font-bold text-lg rotate-1
                "
                placeholder="Ваше ім'я"
              />
            </div>

            {/* Phone Input */}
            <div className="relative -rotate-1">
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                /// Телефон
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="
                  w-full px-4 py-3 bg-white border-4 border-black 
                  focus:border-[#FFD700] focus:shadow-[4px_4px_0px_#FFD700]
                  outline-none transition-all duration-200
                  font-bold text-lg
                "
                placeholder="+380"
              />
            </div>

            {/* Service Select */}
            <div className="relative rotate-1">
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                /// Послуга
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="
                  w-full px-4 py-3 bg-white border-4 border-black 
                  focus:border-[#FF4D00] focus:shadow-[4px_4px_0px_#FF4D00]
                  outline-none transition-all duration-200
                  font-bold text-lg
                "
              >
                <option value="">Оберіть послугу</option>
                <option value="website">Веб-розробка</option>
                <option value="bot">Telegram Bot</option>
                <option value="ai">AI Рішення</option>
                <option value="other">Інше</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div className="relative -rotate-1">
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                /// Повідомлення (опціонально)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="
                  w-full px-4 py-3 bg-white border-4 border-black 
                  focus:border-[#FFD700] focus:shadow-[4px_4px_0px_#FFD700]
                  outline-none transition-all duration-200
                  font-bold resize-none
                "
                placeholder="Розкажіть про ваш проєкт..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="
                w-full py-4 bg-[#FF4D00] text-black font-bold text-xl uppercase
                border-4 border-black rotate-2
                hover:rotate-0 hover:shadow-[12px_12px_0px_#111111]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              "
            >
              {isSubmitting ? '/// ВІДПРАВКА...' : isSuccess ? '✓ ВІДПРАВЛЕНО!' : 'ВІДПРАВИТИ ЗАЯВКУ'}
            </button>

          </form>

          {/* Footer Badge */}
          <div className="px-8 pb-6">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block -rotate-2">
              <span className="text-sm font-bold text-black uppercase">
                Відповімо протягом 1 години
              </span>
            </div>
          </div>

        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FFD700] border-4 border-black rotate-45 -z-10"></div>

      </div>
    </div>
  );
}
Анімації форми
css/* Shake on error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.input-error {
  animation: shake 0.3s ease-in-out;
  border-color: #FF2E2E !important;
}

/* Success pulse */
@keyframes success-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.form-success {
  animation: success-pulse 0.5s ease-in-out;
}

🤖 MODAL 2: AI Чат
UI Концепція
Чат-інтерфейс з терміналом, streaming відповідей, typing indicators.
Реалізація
jsx// components/AIChatModal.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatModal({ 
  isOpen, 
  onClose 
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привіт! Я AI асистент L&H Studio. Чим можу допомогти?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // API Call до Claude або GPT
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      const aiMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      
      <div className="relative w-full max-w-3xl h-[80vh]">
        
        {/* Floating Badge */}
        <div className="absolute -top-6 -right-6 bg-[#00FF00] px-4 py-2 border-4 border-black -rotate-12 shadow-[8px_8px_0px_#111111] z-10 animate-pulse">
          <span className="font-bold text-black uppercase text-sm">● ONLINE</span>
        </div>

        {/* Chat Container */}
        <div className="bg-black border-8 border-[#FFD700] shadow-[16px_16px_0px_#FF4D00] h-full flex flex-col rotate-1">
          
          {/* Header */}
          <div className="bg-[#FFD700] px-6 py-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center text-2xl rotate-3">
                🤖
              </div>
              <div>
                <h2 className="text-2xl font-bold font-grotesk text-black uppercase">
                  AI Assistant
                </h2>
                <p className="text-xs font-bold text-black/70">Powered by Claude</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black text-[#FFD700] hover:bg-[#FF4D00] hover:text-black border-4 border-black transition-colors -rotate-6"
            >
              <X className="w-6 h-6 mx-auto" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#111111]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`
                  flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}
                `}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-3 border-4 border-black
                    ${msg.role === 'user' 
                      ? 'bg-[#FF4D00] text-black rotate-1' 
                      : 'bg-[#F8F9FA] text-black -rotate-1'
                    }
                    shadow-[4px_4px_0px_#000]
                  `}
                >
                  <p className="font-bold text-sm leading-relaxed">{msg.content}</p>
                  <span className="text-xs opacity-50 mt-2 block">
                    {msg.timestamp.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#F8F9FA] px-4 py-3 border-4 border-black -rotate-1 shadow-[4px_4px_0px_#000]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black border-t-4 border-[#FFD700]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Напишіть повідомлення..."
                className="
                  flex-1 px-4 py-3 bg-[#F8F9FA] border-4 border-black
                  focus:border-[#FFD700] focus:shadow-[4px_4px_0px_#FFD700]
                  outline-none font-bold rotate-1
                "
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="
                  px-6 py-3 bg-[#FF4D00] text-black font-bold
                  border-4 border-black hover:shadow-[8px_8px_0px_#111111]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all -rotate-2 hover:rotate-0
                "
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 flex gap-2 flex-wrap">
              {['Ціни', 'Термін розробки', 'Портфоліо', 'Технології'].map((action) => (
                <button
                  key={action}
                  onClick={() => setInput(action)}
                  className="
                    px-3 py-1 bg-[#FFD700] text-black text-xs font-bold uppercase
                    border-2 border-black hover:shadow-[4px_4px_0px_#111111]
                    transition-all
                  "
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

🎨 СЕКЦІЯ 1: Hero Section (Neo-Brutalism)
Зміни
❌ Видалити

Простий 70/30 layout
Статичний текст
Прості кнопки

✅ Додати
jsx// sections/HeroSection.tsx
export default function HeroSection({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  return (
    <section className="min-h-screen bg-[#F8F9FA] relative overflow-hidden pt-32 pb-20">
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#FFD700] border-4 border-black rotate-45 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#FF4D00] border-4 border-black rotate-12 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            
            {/* Floating Badge */}
            <div className="inline-block bg-[#00FF00] px-4 py-2 border-4 border-black rotate-3 shadow-[8px_8px_0px_#111111]">
              <span className="font-bold text-black uppercase text-sm">Available Now ✓</span>
            </div>

            {/* H1 with Colored Blocks */}
            <h1 className="text-5xl md:text-7xl font-bold font-grotesk leading-[0.9] text-black">
              САЙТИ ТА{' '}
              <span className="inline-block bg-[#FF4D00] px-3 rotate-2 border-4 border-black shadow-[6px_6px_0px_#111111]">
                БОТИ
              </span>
              ,<br />
              ЩО{' '}
              <span className="inline-block bg-[#FFD700] px-3 -rotate-2 border-4 border-black shadow-[6px_6px_0px_#111111]">
                ЗАРОБЛЯЮТЬ
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-black/80 font-bold max-w-xl">
              <span className="text-[#FF4D00]">///</span> Автоматизуємо бізнес, поки ви спите. Веб-студія L&H.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenConsultation}
                className="
                  group relative px-8 py-4 bg-[#FF4D00] text-black font-bold text-lg uppercase
                  border-4 border-black rotate-2
                  hover:rotate-0 hover:shadow-[12px_12px_0px_#111111]
                  transition-all duration-300
                "
              >
                Обговорити Проєкт
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>

              
                href="#portfolio"
                className="
                  px-8 py-4 bg-transparent text-black font-bold text-lg uppercase
                  border-4 border-black -rotate-1
                  hover:rotate-0 hover:bg-[#FFD700] hover:shadow-[12px_12px_0px_#111111]
                  transition-all duration-300
                "
              >
                Дивитися Роботи
              </a>
            </div>

            {/* Tech Icons (Pixelated) */}
            <div className="flex gap-6 pt-4">
              {['🖥️', '🤖', '🧠'].map((icon, i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center text-3xl hover:bg-[#FF4D00] hover:-translate-y-2 transition-all"
                  style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
                >
                  {icon}
                </div>
              ))}
            </div>

          </div>

          {/* Right Content - 3D Wireframe */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/20 to-[#FFD700]/20 blur-3xl"></div>
            
            {/* Animated 3D Element */}
            <div className="relative w-full h-full border-4 border-black bg-black/5 rotate-3 shadow-[16px_16px_0px_#111111]">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Grid */}
                <g stroke="#FF4D00" strokeWidth="2" opacity="0.3">
                  {[...Array(10)].map((_, i) => (
                    <g key={i}>
                      <line x1={i * 40} y1="0" x2={i * 40} y2="400" />
                      <line x1="0" y1={i * 40} x2="400" y2={i * 40} />
                    </g>
                  ))}
                </g>

                {/* Rotating Cube */}
                <g className="animate-spin-slow origin-center">
                  <rect x="150" y="150" width="100" height="100" fill="none" stroke="#FFD700" strokeWidth="4" />
                  <rect x="170" y="130" width="100" height="100" fill="none" stroke="#FF4D00" strokeWidth="4" />
                  <line x1="150" y1="150" x2="170" y2="130" stroke="#111" strokeWidth="2" />
                  <line x1="250" y1="150" x2="270" y2="130" stroke="#111" strokeWidth="2" />
                  <line x1="150" y1="250" x2="170" y2="230" stroke="#111" strokeWidth="2" />
                  <line x1="250" y1="250" x2="270" y2="230" stroke="#111" strokeWidth="2" />
                </g>

                {/* Orbiting Circles */}
                <circle cx="200" cy="200" r="120" fill="none" stroke="#FF4D00" strokeWidth="2" strokeDasharray="5,5">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 200 200"
                    to="360 200 200"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-[#FFD700] px-6 py-3 border-4 border-black rotate-6 shadow-[8px_8px_0px_#111111]">
              <p className="text-4xl font-bold text-black">50+</p>
              <p className="text-sm font-bold text-black/70 uppercase">Проєктів</p>
            </div>

            <div className="absolute -top-8 -right-8 bg-[#FF4D00] px-6 py-3 border-4 border-black -rotate-6 shadow-[8px_8px_0px_#111111]">
              <p className="text-4xl font-bold text-black">7</p>
              <p className="text-sm font-bold text-black/70 uppercase">Днів</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
CSS Анімації
css@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

🎨 СЕКЦІЯ 2: Marquee Section (Neo)
Зміни
jsx// sections/MarqueeSection.tsx
export default function MarqueeSection() {
  const text = "WEB DEVELOPMENT /// TELEGRAM BOTS /// AI SOLUTIONS /// AUTOMATION ///";

  return (
    <section className="bg-[#FF4D00] border-y-8 border-black py-8 overflow-hidden relative">
      
      {/* Top Marquee (Left) */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-6xl font-bold font-grotesk text-black px-8"
              style={{ textShadow: '8px 8px 0px rgba(0,0,0,0.3)' }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Marquee (Right) */}
      <div className="relative mt-4">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-6xl font-bold font-grotesk text-white px-8"
              style={{ textShadow: '8px 8px 0px #111111' }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Icons Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {[
            { name: 'PostgreSQL', icon: '🐘', color: '#FFD700' },
            { name: 'MongoDB', icon: '🍃', color: '#00FF00' },
            { name: 'RabbitMQ', icon: '🐰', color: '#FF006E' },
            { name: 'Java', icon: '☕', color: '#FFD700' },
            { name: 'Spring', icon: '🌱', color: '#00FF00' },
            { name: 'Python', icon: '🐍', color: '#FFD700' },
            { name: 'React', icon: '⚛️', color: '#00F0FF' },
            { name: 'Telegram', icon: '✈️', color: '#FFD700' },
            { name: 'AI', icon: '🤖', color: '#FF006E' },
            { name: 'Auto', icon: '⚡', color: '#00FF00' }
          ].map((tech, i) => (
            <div
              key={i}
              className="group relative aspect-square"
              style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
            >
              <div
                className={`
                  w-full h-full border-4 border-black bg-white
                  flex flex-col items-center justify-center
                  group-hover:shadow-[8px_8px_0px_#111111]
                  group-hover:-translate-y-2
                  transition-all duration-200
                `}
                style={{ backgroundColor: tech.color }}
              >
                <span className="text-4xl">{tech.icon}</span>
                <span className="text-xs font-bold text-black mt-1 uppercase">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
CSS Marquee
css@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-33.333%); }
  100% { transform: translateX(0); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

.animate-marquee:hover,
.animate-marquee-reverse:hover {
  animation-play-state: paused;
}

🎨 СЕКЦІЯ 3: Services Section (Bento Grid)
Концепція
Неправильні розміри, rotation, різні кольори, overlapping shadows.
jsx// sections/ServicesSection.tsx
export default function ServicesSection({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const services = [
    {
      title: 'ВЕБ-РОЗРОБКА',
      icon: '🖥️',
      items: ['Лендінги', 'Інтернет-магазини', 'CRM-системи', 'Корпоративні сайти'],
      price: '8K+',
      bgColor: 'bg-[#F8F9FA]',
      borderColor: 'border-[#FF4D00]',
      rotation: '-rotate-2',
      size: 'lg:col-span-2'
    },
    {
      title: 'ТЕЛЕГРАМ БОТИ',
      icon: '🤖',
      items: ['Чат-боти', 'Автоворонки', 'Support AI', 'Інтеграції CRM'],
      price: '5K+',
      bgColor: 'bg-[#FFD700]',
      borderColor: 'border-black',
      rotation: 'rotate-1',
      size: 'lg:col-span-1'
    },
    {
      title: 'AI РІШЕННЯ',
      icon: '🧠',
      items: ['Інтеграція GPT', 'Аналітика даних', 'Автоматизація', 'ML рішення'],
      price: 'Custom',
      bgColor: 'bg-black',
      borderColor: 'border-[#00FF00]',
      rotation: '-rotate-1',
      size: 'lg:col-span-1',
      textWhite: true
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#F8F9FA] relative overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="inline-block bg-[#FF4D00] px-6 py-3 border-4 border-black rotate-2 shadow-[8px_8px_0px_#111111] mb-6">
          <h2 className="text-5xl font-bold font-grotesk text-black uppercase">Послуги</h2>
        </div>
        <p className="text-2xl font-bold text-black/70">
          <span className="text-[#FF4D00]">///</span> Все, що потрібно для вашого бізнесу
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {services.map((service, i) => (
            <div
              key={i}
              className={`
                ${service.size}
                ${service.rotation}
                ${service.bgColor}
                border-8 ${service.borderColor}
                p-8
                hover:shadow-[16px_16px_0px_#111111]
                hover:-translate-y-2
                transition-all duration-300
                group
              `}
            >
              {/* Icon Badge */}
              <div className="inline-block mb-6">
                <div className={`
                  w-20 h-20 bg-${service.textWhite ? '[#FFD700]' : 'black'}
                  border-4 border-black
                  flex items-center justify-center
                  text-4xl
                  ${i % 2 === 0 ? 'rotate-6' : '-rotate-6'}
                  group-hover:rotate-0
                  transition-transform
                `}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className={`
                text-3xl font-bold font-grotesk mb-6
                ${service.textWhite ? 'text-white' : 'text-black'}
              `}>
                {service.title}
              </h3>

              {/* Items List */}
              <ul className="space-y-3 mb-8">
                {service.items.map((item, j) => (
                  <li
                    key={j}
                    className={`
                      text-lg font-bold
                      ${service.textWhite ? 'text-white/90' : 'text-black/80'}
                    `}
                  >
                    <span className="text-[#FF4D00]">///</span> {item}
                  </li>
                ))}
              </ul>

              {/* Price Badge */}
              <div className={`
                inline-block bg-${service.textWhite ? '[#00FF00]' : '[#FF4D00]'}
                px-6 py-3 border-4 border-black
                ${i % 2 === 0 ? '-rotate-3' : 'rotate-3'}
                shadow-[6px_6px_0px_#111111]
                mb-6
              `}>
                <span className="text-2xl font-bold text-black">
                  {service.price}
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={onOpenConsultation}
                className={`
                  w-full py-3 font-bold uppercase
                  border-4 border-black
                  ${service.textWhite 
                    ? 'bg-[#FFD700] text-black hover:bg-[#00FF00]' 
                    : 'bg-black text-white hover:bg-[#FF4D00] hover:text-black'
                  }
                  ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}
                  hover:rotate-0
                  hover:shadow-[8px_8px_0px_#111111]
                  transition-all
                `}
              >
                Замовити →
              </button>

            </div>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className="
              inline-block bg-[#FFD700] px-12 py-5 text-2xl font-bold uppercase
              border-4 border-black rotate-2
              hover:rotate-0 hover:shadow-[16px_16px_0px_#111111]
              transition-all
            "
          >
            Безкоштовна Консультація →
          </button>
        </div>
      </div>

    </section>
  );
}

🎨 СЕКЦІЯ 4: Why Us (Stacked Cards)
jsx// sections/WhyUsSection.tsx
export default function WhyUsSection() {
  const reasons = [
    {
      badge: '01',
      title: 'ШВИДКІСТЬ',
      desc: 'Здаємо проєкт за 7 днів.',
      color: '#FF4D00',
      rotation: '-rotate-2'
    },
    {
      badge: '02',
      title: 'ПРОЗОРІСТЬ',
      desc: 'Ніяких прихованих доплат.',
      color: '#FFD700',
      rotation: 'rotate-1'
    },
    {
      badge: '03',
      title: 'ТЕХНОЛОГІЇ',
      desc: 'Next.js, Python, AI.',
      color: '#00FF00',
      rotation: '-rotate-1'
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-6xl font-bold font-grotesk text-white uppercase mb-4">
          Чому Ми?
        </h2>
        <div className="w-32 h-2 bg-[#FF4D00] mx-auto"></div>
      </div>

      {/* Stacked Cards */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-8">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`
                relative bg-white border-8 border-black p-8
                ${reason.rotation}
                hover:rotate-0
                hover:shadow-[16px_16px_0px_${reason.color}]
                transition-all duration-300
                group
              `}
            >
              {/* Floating Badge */}
              <div
                className={`
                  absolute -top-8 -left-8
                  w-24 h-24 flex items-center justify-center
                  border-8 border-black
                  text-4xl font-bold text-black
                  ${i % 2 === 0 ? 'rotate-12' : '-rotate-12'}
                  shadow-[8px_8px_0px_#111111]
                  z-10
                `}
                style={{ backgroundColor: reason.color }}
              >
                {reason.badge}
              </div>

              <div className="ml-16">
                <h3 className="text-4xl font-bold font-grotesk text-black mb-4 uppercase">
                  {reason.title}
                </h3>
                <p className="text-2xl font-bold text-black/70">{reason.desc}</p>
                
                {/* Accent Line */}
                <div
                  className="mt-6 h-2 w-32"
                  style={{ backgroundColor: reason.color }}
                ></div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '50+', label: 'Проєктів', color: '#FF4D00' },
            { number: '7', label: 'Днів', color: '#FFD700' },
            { number: '100%', label: 'Якість', color: '#00FF00' },
            { number: '24/7', label: 'Підтримка', color: '#FF006E' }
          ].map((stat, i) => (
            <div
              key={i}
              className={`
                bg-white border-4 border-black p-6 text-center
                ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'}
                hover:rotate-0
                hover:shadow-[12px_12px_0px_#111111]
                transition-all
              `}
            >
              <p
                className="text-5xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.number}
              </p>
              <p className="text-sm font-bold text-black uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-16 border-t-4 border-[#FF4D00] pt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-white text-sm">TECHNICAL SPEC /// V1.0</span>
          <span className="font-mono text-white text-sm">VERIFIED /// 2025</span>
        </div>
      </div>

    </section>
  );
}

🎨 СЕКЦІЯ 5: Footer (Asymmetric)
jsx// sections/Footer.tsx
export default function Footer({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  return (
    <footer id="contact" className="bg-[#F8F9FA] py-20 relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-[#FFD700] border-4 border-black rotate-45 -z-10 opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left - Contact Info */}
          <div className="space-y-12">
            
            {/* Email */}
            <div>
              
                href="mailto:hello@lh.studio"
                className="
                  inline-block text-6xl md:text-8xl font-bold font-grotesk text-black
                  hover:text-[#FF4D00]
                  transition-colors
                  leading-none
                  -rotate-2
                  hover:rotate-0
                "
              >
                HELLO@
                <br />
                LH.STUDIO
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {[
                { name: 'Instagram', url: '#' },
                { name: 'Telegram', url: '#' },
                { name: 'LinkedIn', url: '#' }
              ].map((social, i) => (
                
                  key={i}
                  href={social.url}
                  className="
                    group flex items-center gap-4 text-4xl font-bold text-black
                    hover:text-[#FF4D00]
                    transition-colors
                  "
                >
                  {social.name}
                  <span className="inline-block group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </a>
              ))}
            </div>

            {/* Info */}
            <div className="space-y-2 text-black/70 font-bold">
              <p>Веб-студія L&H</p>
              <p>Україна, Київ</p>
              <p>© 2025 L&H STUDIO</p>
            </div>

          </div>

          {/* Right - Contact Form */}
          <div className="relative">
            
            {/* Form Header */}
            <div className="bg-[#FF4D00] px-6 py-4 border-4 border-black rotate-1 shadow-[8px_8px_0px_#111111] mb-8">
              <h3 className="text-3xl font-bold font-grotesk text-black uppercase">
                Зв'яжіться з Нами
              </h3>
            </div>

            {/* Form */}
            <form className="space-y-6">
              
              {/* Name */}
              <div className="rotate-1">
                <label className="block text-sm font-bold text-black mb-2 uppercase">
                  /// Ім'я
                </label>
                <input
                  type="text"
                  required
                  className="
                    w-full bg-transparent border-b-4 border-black
                    focus:border-[#FF4D00]
                    outline-none pb-2 text-xl font-bold
                    transition-colors
                  "
                  placeholder="Ваше ім'я"
                />
              </div>

              {/* Phone */}
              <div className="-rotate-1">
                <label className="block text-sm font-bold text-black mb-2 uppercase">
                  /// Телефон
                </label>
                <input
                  type="tel"
                  required
                  className="
                    w-full bg-transparent border-b-4 border-black
                    focus:border-[#FFD700]
                    outline-none pb-2 text-xl font-bold
                    transition-colors
                  "
                  placeholder="+380"
                />
              </div>

              {/* Message */}
              <div className="rotate-1">
                <label className="block text-sm font-bold text-black mb-2 uppercase">
                  /// Повідомлення
                </label>
                <textarea
                  rows={4}
                  className="
                    w-full bg-transparent border-b-4 border-black
                    focus:border-[#FF4D00]
                    outline-none pb-2 font-bold resize-none
                    transition-colors
                  "
                  placeholder="Розкажіть про ваш проєкт..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                onClick={onOpenConsultation}
                className="
                  w-full py-4 bg-[#FF4D00] text-black font-bold text-xl uppercase
                  border-4 border-black -rotate-2
                  hover:rotate-0 hover:shadow-[12px_12px_0px_#111111]
                  transition-all
                "
              >
                Відправити Заявку
              </button>

            </form>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t-4 border-black flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-sm text-black/50 uppercase">
            Crafted with Brutalist Design Principles
          </span>
          <div className="flex gap-6 text-sm font-bold text-black/70">
            <a href="#" className="hover:text-[#FF4D00]">Політика конфіденційності</a>
            <a href="#" className="hover:text-[#FF4D00]">Умови використання</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

📋 Фінальний Чеклист Змін
✅ Додано

Preloader - термінальний вивід з glitch
Header - sticky nav з rotation buttons
Modal 1 - форма консультації (Neo-Brutalism)
Modal 2 - AI чат з streaming
Hero - colored text blocks, floating badges, 3D wireframe
Marquee - dual direction, colored tech icons
Services - Bento Grid, rotation, різні кольори
Why Us - stacked cards з offset shadows
Footer - asymmetric layout з rotation
Анімації - glitch, blink, marquee, spin, hover effects

🎨 Кольори

Primary: #FF4D00 (Acid Lime)
Secondary: #FFD700 (Electric Yellow)
Tertiary: #00FF00 (Neon Green)
Accent: #FF006E (Hot Pink)
Background: #F8F9FA (Off-white)
Text: #111111 (Ink Black)

📐 Shadows

Small: 4px 4px 0px #111111
Medium: 8px 8px 0px #111111
Large: 12px 12px 0px #111111
XL: 16px 16px 0px #111111

🔄 Rotations

Cards: -3deg to 3deg
Hover: 0deg (normalize)
Badges: -12deg to 12deg


Готово. Це вже повноцінний Neo-Brutalism з controlled chaos.