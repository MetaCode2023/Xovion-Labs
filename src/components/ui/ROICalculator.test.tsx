import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ROICalculator from './ROICalculator';

// Suppress fetch errors in the submission test
global.fetch = vi.fn();

describe('ROICalculator', () => {
  it('renders the first question on mount', () => {
    render(<ROICalculator />);
    expect(screen.getByText(/manually following up/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 1 of 4/i)).toBeInTheDocument();
  });

  it('advances to the next step when an option is clicked', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    await user.click(screen.getByText('1–3 hours'));
    expect(screen.getByText(/Question 2 of 4/i)).toBeInTheDocument();
    expect(screen.getByText(/manual reporting/i)).toBeInTheDocument();
  });

  it('shows a Back button after the first step', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    await user.click(screen.getByText('Less than 1 hour'));
    expect(screen.getByText(/← Back/i)).toBeInTheDocument();
  });

  it('going back returns to the previous question', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    await user.click(screen.getByText('Less than 1 hour'));
    await user.click(screen.getByText(/← Back/i));
    expect(screen.getByText(/Question 1 of 4/i)).toBeInTheDocument();
  });

  it('shows result after answering all four questions', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    // followup: 2 hrs
    await user.click(screen.getByText('1–3 hours'));
    // reporting: 1.5 hrs
    await user.click(screen.getByText('1–2 hours'));
    // triage: 0.75 hrs
    await user.click(screen.getByText('30 minutes to 1 hour'));
    // rate: $100
    await user.click(screen.getByText('$100/hr'));

    // weeklyHours = 2 + 1.5 + 0.75 = 4.25 → monthlyHours = round(17) = 17
    // monthlyCost = 17 * 100 = 1700
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText(/\$1,700\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20,400\/year/i)).toBeInTheDocument();
  });

  it('calculates monthly hours correctly for max selections', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    // followup: 8 hrs, reporting: 5 hrs, triage: 4 hrs → weekly = 17
    // monthlyHours = round(17 * 4) = 68
    await user.click(screen.getByText('6+ hours'));
    await user.click(screen.getByText('4+ hours'));
    await user.click(screen.getByText('3+ hours'));
    await user.click(screen.getByText('$300+/hr'));

    expect(screen.getByText('68')).toBeInTheDocument();
    // monthlyCost = 68 * 300 = 20400
    expect(screen.getByText(/\$20,400\/month/i)).toBeInTheDocument();
  });

  it('shows email form after result and submits successfully', async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockResolvedValueOnce(new Response('ok', { status: 200 }));
    render(<ROICalculator />);

    await user.click(screen.getByText('1–3 hours'));
    await user.click(screen.getByText('1–2 hours'));
    await user.click(screen.getByText('30 minutes to 1 hour'));
    await user.click(screen.getByText('$100/hr'));

    await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
    await user.type(screen.getByPlaceholderText('you@company.com'), 'test@example.com');
    await user.click(screen.getByText('Send Me the Blueprint'));

    expect(await screen.findByText(/You're in/i)).toBeInTheDocument();
  });
});
