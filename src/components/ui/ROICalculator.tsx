import { useState } from 'react';

const STEPS = [
  {
    id: 'followup',
    question: 'How much time do you spend each week manually following up with leads or customers?',
    options: [
      { label: 'Less than 1 hour', hours: 0.5 },
      { label: '1–3 hours', hours: 2 },
      { label: '3–6 hours', hours: 4.5 },
      { label: '6+ hours', hours: 8 },
    ],
  },
  {
    id: 'reporting',
    question: 'How much time do you spend each week on manual reporting, pipeline review, or data entry?',
    options: [
      { label: 'Less than 1 hour', hours: 0.5 },
      { label: '1–2 hours', hours: 1.5 },
      { label: '2–4 hours', hours: 3 },
      { label: '4+ hours', hours: 5 },
    ],
  },
  {
    id: 'triage',
    question: 'How much time do you spend each week deciding which leads or tasks to prioritize?',
    options: [
      { label: 'Almost none — it\'s obvious', hours: 0.25 },
      { label: '30 minutes to 1 hour', hours: 0.75 },
      { label: '1–3 hours', hours: 2 },
      { label: '3+ hours', hours: 4 },
    ],
  },
  {
    id: 'rate',
    question: 'What\'s a fair value for one hour of your time?',
    options: [
      { label: '$50/hr', rate: 50 },
      { label: '$100/hr', rate: 100 },
      { label: '$200/hr', rate: 200 },
      { label: '$300+/hr', rate: 300 },
    ],
  },
];

type Answers = {
  followup?: number;
  reporting?: number;
  triage?: number;
  rate?: number;
};

export default function ROICalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const currentStep = STEPS[step];
  const isRateStep = currentStep?.id === 'rate';

  function handleOption(value: number) {
    const key = currentStep.id as keyof Answers;
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  const weeklyHours = (answers.followup ?? 0) + (answers.reporting ?? 0) + (answers.triage ?? 0);
  const monthlyHours = Math.round(weeklyHours * 4);
  const monthlyCost = Math.round(monthlyHours * (answers.rate ?? 100));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const payload = {
      name,
      email,
      source: 'ai-roi',
      tags: 'lead-magnet-ai-roi',
      ai_roi_hours: monthlyHours,
      ai_roi_monthly_cost: monthlyCost,
    };

    try {
      await fetch(
        'https://services.leadconnectorhq.com/hooks/fKNgkg4PDWsOfFTAOWYE/webhook-trigger/cd9f3d43-0726-4640-b166-56eea3dfc46a',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (showResult) {
    return (
      <div className="glass-card rounded-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <p className="text-xv-text-muted text-sm font-mono uppercase tracking-wider mb-3">Your estimate</p>
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="font-display font-bold text-5xl sm:text-6xl text-xv-accent-blue">{monthlyHours}</span>
            <span className="text-xv-text-secondary text-xl">hrs/month</span>
          </div>
          <p className="text-xv-text-secondary text-lg">
            lost to manual work — worth approximately{' '}
            <span className="text-xv-text-primary font-semibold">${monthlyCost.toLocaleString()}/month</span> of your time.
          </p>
          <p className="text-xv-text-muted text-sm mt-3">
            That's <span className="text-xv-text-secondary">${(monthlyCost * 12).toLocaleString()}/year</span> in manual overhead that a system should be handling.
          </p>
        </div>

        <div className="border-t border-xv-border/40 pt-8">
          {submitted ? (
            <div className="text-center">
              <p className="text-xv-accent-green font-medium mb-2">You're in. Check your inbox.</p>
              <p className="text-xv-text-muted text-sm mb-6">I'll follow up with a breakdown of exactly where those hours are going and how to get them back.</p>
              <a href="/contact" className="btn-primary justify-center inline-flex">
                Book a 30-minute call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ) : (
            <>
              <h3 className="font-display font-semibold text-xv-text-primary text-lg mb-2">Want the blueprint to get those hours back?</h3>
              <p className="text-xv-text-secondary text-sm mb-6">
                Enter your email and I'll send you a breakdown of exactly where that time is going — and what it takes to automate it in your specific setup.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-xv-bg-primary border border-xv-border rounded-lg text-xv-text-primary text-sm placeholder:text-xv-text-muted focus:outline-none focus:border-xv-accent-blue/50 focus:ring-1 focus:ring-xv-accent-blue/20 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-xv-bg-primary border border-xv-border rounded-lg text-xv-text-primary text-sm placeholder:text-xv-text-muted focus:outline-none focus:border-xv-accent-blue/50 focus:ring-1 focus:ring-xv-accent-blue/20 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center"
                >
                  {submitting ? 'Sending…' : 'Send Me the Blueprint'}
                  {!submitting && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  )}
                </button>
                {error && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
                <p className="text-xs text-xv-text-muted text-center">No spam. Unsubscribe anytime.</p>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-10">
      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-xv-accent-blue' : 'bg-xv-border'
            }`}
          />
        ))}
      </div>

      <p className="text-xv-text-muted text-xs font-mono uppercase tracking-wider mb-3">
        Question {step + 1} of {STEPS.length}
      </p>
      <h2 className="font-display font-semibold text-xl text-xv-text-primary mb-6 leading-snug">
        {currentStep.question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentStep.options.map((opt) => {
          const value = isRateStep ? (opt as { label: string; rate: number }).rate : (opt as { label: string; hours: number }).hours;
          return (
            <button
              key={opt.label}
              onClick={() => handleOption(value)}
              className="glass-card rounded-xl px-5 py-4 text-left text-sm text-xv-text-secondary hover:text-xv-text-primary hover:border-xv-accent-blue/40 transition-all"
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 text-xs text-xv-text-muted hover:text-xv-text-secondary transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
