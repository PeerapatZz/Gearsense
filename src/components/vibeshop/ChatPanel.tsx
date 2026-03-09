'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  User,
  Bot,
  Loader2,
  MessageCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { askAboutProducts, askAboutProduct, type ProductContext, type ChatMessage } from '@/lib/ai-client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatPanelProps {
  products: ProductContext[];
  selectedProduct?: ProductContext | null;
  onClose?: () => void;
  isOpen?: boolean;
}

// Suggested questions for quick access
const SUGGESTED_QUESTIONS = [
  "Which one is best for gaming?",
  "Which has the best battery life?",
  "Which is the fastest?",
  "Best value for money?",
];

export function ChatPanel({ products, selectedProduct, onClose, isOpen = true }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = selectedProduct
        ? `Hi! I'm here to help you learn more about the ${selectedProduct.name}. Ask me anything about its features, performance, or whether it's right for you!`
        : `Hi! I'm your GearSense AI advisor. I can help you compare the ${products.length} recommended products, answer questions about specifications, or help you decide which one is best for your needs.`;

      setMessages([{ role: 'assistant', content: welcomeMessage }]);
    }
  }, [isOpen, selectedProduct, products.length, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Debounce wrapper for sending messages
  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response: string;
      if (selectedProduct) {
        response = await askAboutProduct(messageText, selectedProduct, messages);
      } else {
        response = await askAboutProducts(messageText, products, messages);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble responding right now. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={cn(
          'fixed z-50 flex flex-col',
          'bg-white dark:bg-zinc-900',
          'border border-zinc-200 dark:border-zinc-700',
          'shadow-2xl shadow-violet-500/10',
          'transition-all duration-300',
          isMinimized
            ? 'bottom-4 right-4 w-80 h-14 rounded-full'
            : 'bottom-4 right-4 w-96 h-[600px] max-h-[80vh] rounded-2xl'
        )}
      >
        {/* Header */}
        <div className={cn(
          'flex items-center justify-between px-4 py-3',
          'border-b border-zinc-200 dark:border-zinc-700',
          'bg-gradient-to-r from-violet-500 to-purple-600',
          isMinimized ? 'rounded-full' : 'rounded-t-2xl'
        )}>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div className={cn('text-white', isMinimized && 'hidden sm:block')}>
              <p className="font-semibold text-sm">GearSense AI</p>
              <p className="text-xs text-white/70">Ask me anything</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4 text-white" />
              ) : (
                <Minimize2 className="w-4 h-4 text-white" />
              )}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors text-white hover:text-white"
                aria-label="Close chat"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Chat content (hidden when minimized) */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea ref={scrollRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center',
                        message.role === 'user'
                          ? 'bg-violet-100 dark:bg-violet-900/30'
                          : 'bg-gradient-to-br from-violet-500 to-purple-600'
                      )}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        message.role === 'user'
                          ? 'bg-violet-500 text-white rounded-tr-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm'
                      )}
                    >
                      {message.role === 'user' ? (
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      ) : (
                        <div className="text-sm prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-800 break-words w-full" style={{ maxWidth: '100%' }}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 className="w-4 h-4 text-violet-500" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <motion.button
                      key={question}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about products..."
                  className="flex-1 rounded-xl border-zinc-200 dark:border-zinc-700 focus:ring-violet-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Floating Chat Button to open the panel
interface ChatButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export function ChatButton({ onClick, hasUnread }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className={cn(
        'fixed bottom-6 right-6 z-40',
        'w-14 h-14 rounded-full',
        'bg-gradient-to-r from-violet-500 to-purple-600',
        'shadow-lg shadow-violet-500/30',
        'flex items-center justify-center',
        'hover:shadow-xl hover:shadow-violet-500/40',
        'transition-shadow duration-300',
        'group'
      )}
    >
      <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      {hasUnread && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"
        />
      )}

      {/* Pulse animation */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-violet-500"
      />
    </motion.button>
  );
}
