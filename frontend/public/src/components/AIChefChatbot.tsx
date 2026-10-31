import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, Minus, Send, Sparkles, User,
  RotateCcw, Clock, ChefHat, Zap, Brain,
  Paperclip, FileText, Music
} from 'lucide-react';
import { Recipe, ChatMessage, AttachmentInfo } from '../types/recipe';
import { askAIChef, askAIChefWithFile } from '../services/aiService';

interface AIChefChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'greeting-1',
  sender: 'assistant',
  content: 'Halo! 👋 Aku AI Chef, asisten memasak dari Recipedia.\n\nAku siap membantumu menemukan inspirasi masakan, memberikan panduan memasak, atau merekomendasikan resep berdasarkan bahan yang kamu punya. Bahan apa yang ada di dapurmu hari ini?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const SUGGESTED_PROMPTS = [
  { icon: '🍽️', text: 'Saran menu hari ini?' },
  { icon: '🥘', text: 'Masak apa dari bahan yang ada?' },
  { icon: '💡', text: 'Tips memasak untuk pemula?' },
  { icon: '🔄', text: 'Cara mengganti bahan masakan?' },
];

// ── Plain Text Renderer ──────────────────────────────────────────────────────
// Membersihkan simbol markdown dari teks agar terbaca natural
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')   // **bold** → bold
    .replace(/\*(.+?)\*/g, '$1')       // *italic* → italic
    .replace(/`(.+?)`/g, '$1')         // `code` → code
    .replace(/~~(.+?)~~/g, '$1')       // ~~strike~~ → strike
    .replace(/^#{1,6}\s+/gm, '')      // ## Heading → Heading
    .replace(/^>\s+/gm, '')           // > quote → quote
    .trim();
}

function renderFormattedText(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const clean = stripMarkdown(line);

    // Baris kosong → spasi
    if (clean.trim() === '') {
      result.push(<div key={key++} className="h-2" />);
      continue;
    }

    // Daftar bernomor: "1. teks" atau "1) teks"
    const numberedMatch = clean.match(/^(\d+)[.):]\s+(.+)/);
    if (numberedMatch) {
      const [, num, content] = numberedMatch;
      result.push(
        <div key={key++} className="flex gap-2.5 items-start mb-1">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#526B50]/15 text-[#526B50] text-[10px] font-bold flex items-center justify-center mt-0.5">
            {num}
          </span>
          <span className="text-[#282B25] leading-relaxed flex-1">{content}</span>
        </div>
      );
      continue;
    }

    // Daftar berpoin: "- teks" atau "• teks"
    const bulletMatch = clean.match(/^[-•]\s+(.+)/);
    if (bulletMatch) {
      result.push(
        <div key={key++} className="flex gap-2.5 items-start mb-1">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#526B50] mt-2" />
          <span className="text-[#282B25] leading-relaxed flex-1">{bulletMatch[1]}</span>
        </div>
      );
      continue;
    }

    // Baris dengan emoji tip: mulai dengan emoji khusus
    const tipMatch = clean.match(/^(💡|✨|⚠️|🔥|⏱️|📝|👨‍🍳|🍽️)\s*(.+)/);
    if (tipMatch) {
      result.push(
        <div key={key++} className="flex gap-2 items-start bg-[#526B50]/8 rounded-lg px-3 py-2 my-1 border-l-2 border-[#526B50]/40">
          <span className="text-sm flex-shrink-0">{tipMatch[1]}</span>
          <span className="text-[#282B25] text-xs leading-relaxed">{tipMatch[2]}</span>
        </div>
      );
      continue;
    }

    // Paragraf biasa
    result.push(
      <p key={key++} className="text-[#282B25] leading-relaxed mb-0.5">
        {clean}
      </p>
    );
  }

  return result;
}
// ─────────────────────────────────────────────────────────────────────────────

// Animated typing dots component
const TypingDots: React.FC = () => (
  <div className="flex items-center gap-1 px-1 py-0.5">
    {[0, 1, 2].map(i => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-[#526B50]/50 inline-block animate-bounce"
        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
      />
    ))}
  </div>
);

export const AIChefChatbot: React.FC<AIChefChatbotProps> = ({
  isOpen,
  onClose,
  onSelectRecipe
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeEngineMode, setActiveEngineMode] = useState<'demo' | 'live'>('demo');
  const [charCount, setCharCount] = useState(0);
  const [pendingAttachment, setPendingAttachment] = useState<{ file: File; info: AttachmentInfo } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized, scrollToBottom]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    // Allow sending if there's text OR a pending attachment
    if ((!text && !pendingAttachment) || isTyping) return;

    const attachment = pendingAttachment?.info;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text || (attachment ? `[${attachment.type === 'image' ? '📷 Foto' : attachment.type === 'audio' ? '🎵 Audio' : '📄 Dokumen'}: ${attachment.name}]` : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setCharCount(0);
    setIsTyping(true);
    const capturedFile = pendingAttachment?.file;
    const capturedAttachmentType = pendingAttachment?.info.type;
    setPendingAttachment(null);

    try {
      let response;
      if (capturedFile && capturedAttachmentType) {
        response = await askAIChefWithFile(capturedFile, capturedAttachmentType, text || undefined);
      } else {
        response = await askAIChef(text);
      }
      setActiveEngineMode(response.mode);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedRecipes: response.suggestedRecipes
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: 'Maaf, terjadi kendala teknis saat memproses pertanyaanmu. Silakan coba lagi ya! 🙏',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setActiveEngineMode('demo');
    setPendingAttachment(null);
  };

  // ── File attachment handler ──────────────────────────────────────────────
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Detect type
    let attachType: AttachmentInfo['type'];
    if (file.type.startsWith('image/')) attachType = 'image';
    else if (file.type.startsWith('audio/')) attachType = 'audio';
    else attachType = 'document';

    const previewUrl = attachType === 'image' ? URL.createObjectURL(file) : undefined;

    setPendingAttachment({
      file,
      info: {
        name: file.name,
        type: attachType,
        mimeType: file.type,
        previewUrl,
        size: file.size,
      }
    });

    // Reset so same file can be re-selected
    e.target.value = '';
  };

  const removePendingAttachment = () => {
    if (pendingAttachment?.info.previewUrl) {
      URL.revokeObjectURL(pendingAttachment.info.previewUrl);
    }
    setPendingAttachment(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ── Minimized pill view ─────────────────────────────────────────────────
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-3 bg-gradient-to-r from-[#526B50] to-[#435842] hover:from-[#435842] hover:to-[#354835] text-white pl-3 pr-4 py-2.5 rounded-full shadow-[0_8px_24px_rgba(82,107,80,0.35)] border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(82,107,80,0.45)]"
        >
          <div className="relative w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
            <ChefHat className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#526B50] animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold leading-tight">AI Chef</p>
            <p className="text-[10px] text-white/70 leading-tight">Sedang Aktif</p>
          </div>
          {messages.length > 1 && (
            <span className="ml-1 text-[11px] bg-[#D98B55] text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
              {messages.length - 1}
            </span>
          )}
        </button>
      </div>
    );
  }

  // ── Main chatbot window ──────────────────────────────────────────────────
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[440px] flex flex-col bg-white rounded-2xl shadow-[0_20px_60px_rgba(40,43,37,0.18)] border border-[#EAE8E0] overflow-hidden"
      style={{ maxHeight: 'min(680px, 88vh)', height: 'min(680px, 88vh)' }}>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#3D5C3B] via-[#526B50] to-[#5E7A5B] text-white px-4 py-3 flex items-center justify-between shrink-0 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-6 right-12 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-[15px] font-bold text-white leading-tight tracking-tight">
                AI Chef Recipedia
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-white/70">Asisten Kuliner Pribadi</span>
              <span className="text-white/40 text-[10px]">·</span>
              <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                activeEngineMode === 'live'
                  ? 'bg-emerald-400/20 text-emerald-300'
                  : 'bg-white/15 text-white/80'
              }`}>
                {activeEngineMode === 'live'
                  ? <><Zap className="w-2.5 h-2.5" /> Live AI</>
                  : <><Brain className="w-2.5 h-2.5" /> Cerdas</>
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 relative z-10">
          <button onClick={handleResetChat} title="Mulai ulang percakapan"
            className="p-2 rounded-lg hover:bg-white/15 text-white/70 hover:text-white transition-all">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsMinimized(true)} title="Kecilkan"
            className="p-2 rounded-lg hover:bg-white/15 text-white/70 hover:text-white transition-all">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} title="Tutup"
            className="p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-white transition-all">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Messages Area ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-[#F7F6F2] px-4 py-4 space-y-4 scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#D1D5BC transparent' }}>

        {/* Info banner */}
        <div className="flex items-center gap-2 bg-[#526B50]/8 border border-[#526B50]/15 rounded-xl px-3 py-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D98B55] shrink-0" />
          <p className="text-[11px] text-[#526B50] leading-tight font-medium">
            Mode Cerdas Recipedia — tanya bahan, resep, tips, atau rekomendasi menu!
          </p>
        </div>

        {/* Messages */}
        {messages.map((msg, index) => {
          const isAssistant = msg.sender === 'assistant';
          const isLatest = index === messages.length - 1;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'} ${
                isLatest ? 'animate-[fadeSlideIn_0.25s_ease-out]' : ''
              }`}
            >
              {/* Avatar — AI */}
              {isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#526B50] to-[#435842] flex items-center justify-center shrink-0 shadow-sm mb-4">
                  <ChefHat className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div className={`flex flex-col gap-1 ${isAssistant ? 'items-start' : 'items-end'} max-w-[85%]`}>
                {/* Bubble */}
                <div className={`rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                  isAssistant
                    ? 'bg-white text-[#282B25] rounded-bl-sm border border-[#EAE8E0]'
                    : 'bg-gradient-to-br from-[#526B50] to-[#435842] text-white rounded-br-sm'
                }`}>
                  {/* Attachment preview inside user bubble */}
                  {!isAssistant && msg.attachment && (
                    <div className="mb-2">
                      {msg.attachment.type === 'image' && msg.attachment.previewUrl ? (
                        <img
                          src={msg.attachment.previewUrl}
                          alt={msg.attachment.name}
                          className="rounded-xl max-h-40 max-w-full object-cover border border-white/20"
                        />
                      ) : msg.attachment.type === 'audio' ? (
                        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                          <Music className="w-4 h-4 text-white/80 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">{msg.attachment.name}</p>
                            <p className="text-[10px] text-white/60">{formatFileSize(msg.attachment.size)}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                          <FileText className="w-4 h-4 text-white/80 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">{msg.attachment.name}</p>
                            <p className="text-[10px] text-white/60">{formatFileSize(msg.attachment.size)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {isAssistant
                    ? <div className="space-y-0.5 text-sm">{renderFormattedText(msg.content)}</div>
                    : msg.content ? <p className="text-sm leading-relaxed">{msg.content}</p> : null
                  }
                </div>

                {/* Recipe suggestion cards */}
                {isAssistant && msg.suggestedRecipes && msg.suggestedRecipes.length > 0 && (
                  <div className="w-full space-y-1.5 mt-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#809276] uppercase tracking-wider px-1">
                      <ChefHat className="w-3 h-3" />
                      Rekomendasi Terkait
                    </div>
                    {msg.suggestedRecipes.map(rec => (
                      <button
                        key={rec.id}
                        onClick={() => onSelectRecipe(rec)}
                        className="w-full bg-white hover:bg-[#F7F6F2] border border-[#EAE8E0] hover:border-[#526B50]/40 rounded-xl p-2.5 flex items-center gap-3 transition-all duration-200 group shadow-sm hover:shadow-md text-left"
                      >
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-11 h-11 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform duration-200"
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-xs text-[#282B25] group-hover:text-[#526B50] truncate transition-colors">
                            {rec.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#77796F] mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{rec.cookingTime} menit</span>
                            <span className="text-[#C0BFB5]">·</span>
                            <span>{rec.difficulty}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-[#526B50] bg-[#526B50]/10 px-2 py-1 rounded-lg shrink-0 group-hover:bg-[#526B50] group-hover:text-white transition-all">
                          Buka
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <span className={`text-[9px] text-[#B0AFA7] px-1 ${isAssistant ? 'text-left' : 'text-right'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {/* Avatar — User */}
              {!isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-[#D98B55] flex items-center justify-center shrink-0 shadow-sm mb-4">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#526B50] to-[#435842] flex items-center justify-center shrink-0 shadow-sm">
              <ChefHat className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white border border-[#EAE8E0] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Suggested Prompts ─────────────────────────────────────────── */}
      <div className="bg-white border-t border-[#EAE8E0] px-3 pt-2.5 pb-2 shrink-0">
        <p className="text-[10px] font-semibold text-[#A8A79F] uppercase tracking-wider mb-2">Pertanyaan Umum</p>
        <div className="grid grid-cols-2 gap-1.5">
          {SUGGESTED_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p.text)}
              disabled={isTyping}
              className="flex items-center gap-2 px-3 py-2 bg-[#F7F6F2] hover:bg-[#526B50]/10 hover:border-[#526B50]/30 border border-[#EAE8E0] rounded-xl text-[11px] text-[#282B25] font-medium transition-all duration-200 disabled:opacity-50 text-left group"
            >
              <span className="text-base leading-none shrink-0">{p.icon}</span>
              <span className="leading-snug line-clamp-2">{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Input Area ────────────────────────────────────────────────── */}
      <div className="bg-white border-t border-[#EAE8E0] px-3 py-3 shrink-0">
        {/* Pending attachment preview */}
        {pendingAttachment && (
          <div className="mb-2 flex items-center gap-2 bg-[#F7F6F2] border border-[#E0DED7] rounded-xl px-3 py-2">
            {pendingAttachment.info.type === 'image' && pendingAttachment.info.previewUrl ? (
              <img
                src={pendingAttachment.info.previewUrl}
                alt={pendingAttachment.info.name}
                className="w-10 h-10 rounded-lg object-cover border border-[#E0DED7] shrink-0"
              />
            ) : pendingAttachment.info.type === 'audio' ? (
              <div className="w-10 h-10 rounded-lg bg-[#526B50]/10 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5 text-[#526B50]" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#D98B55]/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#D98B55]" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#282B25] truncate">{pendingAttachment.info.name}</p>
              <p className="text-[10px] text-[#A8A79F]">
                {pendingAttachment.info.type === 'image' ? '📷 Foto' : pendingAttachment.info.type === 'audio' ? '🎵 Audio' : '📄 Dokumen'}
                {' · '}{formatFileSize(pendingAttachment.info.size)}
              </p>
            </div>
            <button
              onClick={removePendingAttachment}
              className="w-6 h-6 rounded-full bg-[#EAE8E0] hover:bg-red-100 hover:text-red-500 text-[#A8A79F] flex items-center justify-center transition-all shrink-0"
              aria-label="Hapus lampiran"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <form
          onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
          className="flex items-center gap-2"
        >
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Attach button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isTyping || !!pendingAttachment}
            title="Lampirkan file (foto, audio, atau dokumen)"
            className="w-10 h-10 rounded-xl bg-[#F7F6F2] hover:bg-[#526B50]/10 border border-[#E0DED7] hover:border-[#526B50]/40 text-[#A8A79F] hover:text-[#526B50] flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => { setInputValue(e.target.value); setCharCount(e.target.value.length); }}
              onKeyDown={handleKeyDown}
              placeholder={pendingAttachment ? 'Tambahkan pesan (opsional)...' : 'Tanya resep, bahan, atau tips memasak...'}
              maxLength={500}
              disabled={isTyping}
              className="w-full bg-[#F7F6F2] border border-[#E0DED7] text-[#282B25] placeholder-[#A8A79F] text-sm rounded-xl px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-[#526B50]/30 focus:border-[#526B50]/60 transition-all disabled:opacity-60"
            />
            {charCount > 400 && (
              <span className="absolute right-3 bottom-2 text-[9px] text-[#A8A79F]">
                {charCount}/500
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={(!inputValue.trim() && !pendingAttachment) || isTyping}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#526B50] to-[#435842] hover:from-[#435842] hover:to-[#354835] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg shrink-0"
            aria-label="Kirim pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
