import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { Mock } from 'vitest';
import { useAppContext } from '@/services/store/provider';
import { userEvent } from '@testing-library/user-event';
import { Header } from './header';

vi.mock('@/services/store/provider', () => ({
  useAppContext: vi.fn(),
}));

describe('Header Component', () => {
  const toggleUnitsMock = vi.fn();

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      toggleUnits: toggleUnitsMock,
    });

    render(<Header />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the logo', () => {
    expect(screen.getByRole('logo')).toBeInTheDocument();
  });

  it('should render the brand name', () => {
    expect(
      screen.getByRole('heading', { name: /forecast/i })
    ).toBeInTheDocument();
  });

  it('should render the switcher with "C" and "F" labels', () => {
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });

  describe('when switcher was clicked', () => {
    it('should call toggleUnits', async () => {
      const switcher = screen.getByRole('switcher');
      await userEvent.click(switcher);

      expect(toggleUnitsMock).toHaveBeenCalledTimes(1);
    });
  });
});
