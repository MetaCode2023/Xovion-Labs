import { useState, useEffect, useRef, useCallback } from 'react';

const colors = {
  bgPrimary: '#0A0E17',
  bgSecondary: '#111827',
  bgTertiary: '#1C2333',
  textPrimary: '#E8ECF4',
  textSecondary: '#8892A6',
  textMuted: '#5C6478',
  accentBlue: '#3B82F6',
  accentCyan: '#22D3EE',
  accentGreen: '#34D399',
  border: '#1E293B',
};

type Role = 'ai' | 'user' | 'tool';

interface DemoMessage {
  role: Role;
  text: string;
  toolName?: string;
  delay: number;
}

const SCRIPT: DemoMessage[] = [
  {
    role: 'ai',
    text: "Hey — thanks for calling. Fair warning, you're already talking to an AI. What can I help you with today?",
    delay: 700,
  },
  {
    role: 'user',
    text: "I was curious about the AI receptionist. Do you actually know anything about AI?",
    delay: 2600,
  },
  {
    role: 'ai',
    text: "Absolutely. I'm not just answering phones — I'm running live database checks, qualifying leads, and syncing your CRM in real time with sub-second latency. Want to go deeper? What part of AI are you most curious about?",
    delay: 5000,
  },
  {
    role: 'user',
    text: "How do you actually go from prompting ChatGPT to building an agent that takes real actions?",
    delay: 8000,
  },
  {
    role: 'ai',
    text: "It's all about wiring the model to real tools and APIs so it can do things — not just talk. Book jobs, update your pipeline, pull live data, all triggered from conversation. What kind of business do you run?",
    delay: 10500,
  },
  {
    role: 'user',
    text: "Plumbing company. I waste a ton of time on admin. What could AI actually do for me?",
    delay: 13500,
  },
  {
    role: 'ai',
    text: "Missed calls get answered and jobs booked automatically. Quote requests pull your schedule and reply with availability. Invoices go out without you touching them. No more phone tag eating your day. Want to see how that'd look for your operation?",
    delay: 16000,
  },
  {
    role: 'user',
    text: "Yeah — book me for Monday. Name's Austin Michael, 605-102-1255.",
    delay: 19500,
  },
  {
    role: 'tool',
    toolName: 'CreateContact',
    text: 'Saving Austin Michael to CRM...',
    delay: 21000,
  },
  {
    role: 'tool',
    toolName: 'CheckCalendar',
    text: 'Checking Monday availability...',
    delay: 22500,
  },
  {
    role: 'tool',
    toolName: 'BookAppointment',
    text: 'Booking Monday at 8:00 AM...',
    delay: 24000,
  },
  {
    role: 'ai',
    text: "Done, Austin — you're locked in for Monday at 8 AM. Check your phone for a confirmation. Talk soon.",
    delay: 25500,
  },
];

const STATS = [
  { value: '< 1s', label: 'Call answer time' },
  { value: '3', label: 'Live tool executions' },
  { value: '90s', label: 'Lead to booked call' },
];

export default function DemoConversation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasStartedRef = useRef(false);

  const runDemo = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleCount(0);
    setIsRunning(true);
    setIsDone(false);

    SCRIPT.forEach((msg, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1);
        if (i === SCRIPT.length - 1) {
          setIsRunning(false);
          setIsDone(true);
        }
      }, msg.delay);
      timeoutsRef.current.push(t);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          runDemo();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [runDemo]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount]);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const messages = SCRIPT.slice(0, visibleCount);
  const lastIsAi = messages.length > 0 && messages[messages.length - 1].role === 'ai';
  const showTyping = isRunning && visibleCount > 0 && !lastIsAi;

  return (
    <section
      ref={sectionRef}
      style={{ padding: '5rem 0', borderTop: `1px solid rgba(30, 41, 59, 0.3)` }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Header */}
        <div style={{ maxWidth: '560px', marginBottom: '3rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 500,
              borderRadius: '9999px',
              border: `1px solid rgba(59, 130, 246, 0.3)`,
              color: colors.accentBlue,
              background: 'rgba(59, 130, 246, 0.1)',
              marginBottom: '1rem',
            }}
          >
            Live Demo
          </span>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              color: colors.textPrimary,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            One call.{' '}
            <span
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundImage: `linear-gradient(to right, ${colors.accentBlue}, ${colors.accentCyan})`,
              }}
            >
              Three tool executions.
            </span>{' '}
            One booked client.
          </h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: colors.textSecondary,
              fontSize: '1.1rem',
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1.65,
            }}
          >
            This is a real conversation from a live AI receptionist — qualifying a lead, matching
            to a service, and booking a call without a human in the loop.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Conversation window */}
          <div
            style={{
              maxWidth: '680px',
              background: 'rgba(17, 24, 39, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${colors.border}`,
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow:
                '0 25px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.06), 0 0 40px rgba(59,130,246,0.04)',
            }}
          >
            {/* Window chrome */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(28, 35, 51, 0.5)',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors.accentGreen,
                  boxShadow: `0 0 8px ${colors.accentGreen}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  color: colors.textPrimary,
                }}
              >
                Dakota
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: colors.textMuted,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                · AI Receptionist · Inbound call
              </span>
              {isRunning && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 11,
                    color: colors.accentCyan,
                    fontFamily: 'JetBrains Mono, monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: colors.accentCyan,
                      display: 'inline-block',
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                  LIVE
                </span>
              )}
              {isDone && !isRunning && (
                <button
                  onClick={() => {
                    hasStartedRef.current = false;
                    runDemo();
                  }}
                  style={{
                    marginLeft: 'auto',
                    background: 'none',
                    border: `1px solid rgba(59, 130, 246, 0.3)`,
                    borderRadius: 6,
                    padding: '3px 10px',
                    color: colors.accentBlue,
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(59,130,246,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'none';
                  }}
                >
                  ↺ Replay
                </button>
              )}
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                height: 400,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                scrollbarWidth: 'thin',
                scrollbarColor: `${colors.border} transparent`,
              }}
            >
              {messages.length === 0 && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: colors.textMuted,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    Connecting call...
                  </span>
                </div>
              )}

              {messages.map((msg, i) => {
                if (msg.role === 'tool') {
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '7px 11px',
                        background: 'rgba(34, 211, 238, 0.05)',
                        border: `1px solid rgba(34, 211, 238, 0.15)`,
                        borderRadius: 8,
                        animation: 'fadeInUp 0.35s ease-out both',
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: colors.accentCyan,
                          boxShadow: `0 0 6px ${colors.accentCyan}`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: 'JetBrains Mono, monospace',
                          fontWeight: 600,
                          color: colors.accentCyan,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {msg.toolName}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: 'JetBrains Mono, monospace',
                          color: colors.textMuted,
                        }}
                      >
                        — {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      gap: 3,
                      animation: 'fadeInUp 0.35s ease-out both',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: colors.textMuted,
                        fontFamily: 'JetBrains Mono, monospace',
                        paddingLeft: msg.role === 'user' ? 0 : 2,
                        paddingRight: msg.role === 'user' ? 2 : 0,
                      }}
                    >
                      {msg.role === 'ai' ? 'Dakota' : 'Caller'}
                    </span>
                    <div
                      style={{
                        maxWidth: '78%',
                        padding: '10px 13px',
                        borderRadius:
                          msg.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                        background:
                          msg.role === 'user'
                            ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                            : colors.bgTertiary,
                        border:
                          msg.role === 'ai' ? `1px solid rgba(30, 41, 59, 0.7)` : 'none',
                        color: colors.textPrimary,
                        fontSize: 14,
                        fontFamily: 'Outfit, system-ui, sans-serif',
                        lineHeight: 1.65,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing dots */}
              {showTyping && (
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 2, gap: 4 }}>
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: colors.textMuted,
                        animation: `pulse 1.2s ease-in-out ${dot * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              maxWidth: '680px',
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.value}
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: `1px solid rgba(30, 41, 59, 0.6)`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 22,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    backgroundImage: `linear-gradient(to right, ${colors.accentBlue}, ${colors.accentCyan})`,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: colors.textMuted,
                    fontFamily: 'Outfit, sans-serif',
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ maxWidth: '680px' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundImage: 'linear-gradient(135deg, #60AEFF 0%, #3B82F6 55%, #2563EB 100%)',
                boxShadow:
                  '0 0 0 1px rgba(88, 166, 255, 0.25), 0 4px 16px -2px rgba(59, 130, 246, 0.35)',
                color: 'white',
                fontWeight: 600,
                borderRadius: '0.5rem',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 14,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundImage =
                  'linear-gradient(135deg, #58A6FF 0%, #3B82F6 50%, #2563EB 100%)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow =
                  '0 0 0 1px rgba(88, 166, 255, 0.4), 0 0 20px rgba(88, 166, 255, 0.35), 0 8px 32px -4px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundImage =
                  'linear-gradient(135deg, #60AEFF 0%, #3B82F6 55%, #2563EB 100%)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow =
                  '0 0 0 1px rgba(88, 166, 255, 0.25), 0 4px 16px -2px rgba(59, 130, 246, 0.35)';
              }}
            >
              Build this for your business
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
