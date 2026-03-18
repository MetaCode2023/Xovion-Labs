import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'xv-chat-messages';

// Inline styles keyed to the site's design system
const colors = {
  bgPrimary: '#0A0E17',
  bgSecondary: '#111827',
  bgTertiary: '#1C2333',
  bgElevated: '#232B3E',
  textPrimary: '#E8ECF4',
  textSecondary: '#8892A6',
  textMuted: '#5C6478',
  accentBlue: '#3B82F6',
  accentCyan: '#22D3EE',
  accentGreen: '#34D399',
  border: '#1E293B',
  borderHover: '#334155',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [unread, setUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore session
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Persist + scroll on message change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // ignore
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(false);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    setStatusText('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // Placeholder for streaming assistant message
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const event = JSON.parse(raw);

            if (event.type === 'status') {
              setStatusText(event.text);
            } else if (event.type === 'delta') {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: (updated[updated.length - 1].content ?? '') + event.text,
                };
                return updated;
              });
              setStatusText('');
            } else if (event.type === 'text') {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: event.text,
                };
                return updated;
              });
              setStatusText('');
              if (!open) setUnread(true);
            } else if (event.type === 'error') {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: event.text,
                };
                return updated;
              });
              setStatusText('');
            } else if (event.type === 'done') {
              setStatusText('');
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.role === 'assistant' && !last.content) {
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Something went wrong. Please try again.',
          };
        } else {
          updated.push({ role: 'assistant', content: 'Something went wrong. Please try again.' });
        }
        return updated;
      });
      setStatusText('');
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat panel ────────────────────────────────────────────── */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: 'min(360px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 120px))',
            zIndex: 9998,
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${colors.border}`,
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow:
              '0 25px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.08), 0 0 40px rgba(59,130,246,0.06)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #60AEFF 0%, #3B82F6 55%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 12px rgba(59,130,246,0.4)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: colors.textPrimary,
                    lineHeight: 1.2,
                  }}
                >
                  Xovion Labs
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: colors.accentGreen,
                      boxShadow: `0 0 6px ${colors.accentGreen}`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      color: colors.textMuted,
                      fontFamily: 'Outfit, system-ui, sans-serif',
                    }}
                  >
                    AI Agent · Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: colors.textMuted,
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = colors.textSecondary)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = colors.textMuted)
              }
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              scrollbarWidth: 'thin',
              scrollbarColor: `${colors.borderHover} transparent`,
            }}
          >
            {messages.length === 0 && (
              <div style={{ padding: '20px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>👋</div>
                <p
                  style={{
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    color: colors.textSecondary,
                    fontSize: '14px',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Hey! I'm the Xovion AI agent.
                  <br />
                  Tell me about your business and I'll figure out if — and how — we can help.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 13px',
                    borderRadius:
                      msg.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                    background:
                      msg.role === 'user'
                        ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                        : colors.bgTertiary,
                    border:
                      msg.role === 'assistant'
                        ? `1px solid rgba(30, 41, 59, 0.7)`
                        : 'none',
                    color: colors.textPrimary,
                    fontSize: '14px',
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    lineHeight: 1.65,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content || (
                    loading && i === messages.length - 1 ? (
                      <span style={{ color: colors.textMuted, letterSpacing: '2px' }}>•••</span>
                    ) : null
                  )}
                </div>
              </div>
            ))}

            {/* Tool status indicator */}
            {statusText && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingLeft: '4px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: colors.accentCyan,
                    boxShadow: `0 0 6px ${colors.accentCyan}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    color: colors.accentCyan,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {statusText}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input row */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: `1px solid ${colors.border}`,
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me about your business..."
              disabled={loading}
              style={{
                flex: 1,
                background: colors.bgTertiary,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '9px 12px',
                color: colors.textPrimary,
                fontSize: '14px',
                fontFamily: 'Outfit, system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.15s',
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(59,130,246,0.5)')
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderColor = colors.border)
              }
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background:
                  loading || !input.trim()
                    ? 'rgba(59,130,246,0.25)'
                    : 'linear-gradient(135deg, #60AEFF, #3B82F6)',
                border: 'none',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
              aria-label="Send message"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="white"
                style={{ opacity: loading || !input.trim() ? 0.5 : 1 }}
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle button ──────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #60AEFF 0%, #3B82F6 55%, #2563EB 100%)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow:
            '0 0 0 1px rgba(88,166,255,0.25), 0 4px 24px rgba(59,130,246,0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 0 0 1px rgba(88,166,255,0.4), 0 6px 32px rgba(59,130,246,0.6)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 0 0 1px rgba(88,166,255,0.25), 0 4px 24px rgba(59,130,246,0.45)';
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {/* Unread dot */}
        {unread && !open && (
          <div
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: colors.accentCyan,
              border: '2px solid #0A0E17',
              boxShadow: `0 0 8px ${colors.accentCyan}`,
            }}
          />
        )}
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
