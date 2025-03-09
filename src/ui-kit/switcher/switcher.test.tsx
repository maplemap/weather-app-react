import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { Switcher } from './switcher';

describe('Switcher component', () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    render(<Switcher label1='C' label2='F' onChange={onChangeMock} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the first label', () => {
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('should render the second label', () => {
    expect(screen.getByText('F')).toBeInTheDocument();
  });

  it('should render the switcher input', () => {
    expect(screen.getByRole('switcher')).toBeInTheDocument();
  });

  describe('when switcher was clicked', () => {
    it('should call onChange with true when the switcher is toggled on', async () => {
      const switcher = screen.getByRole('switcher') as HTMLInputElement;
      await userEvent.click(switcher);

      expect(onChangeMock).toHaveBeenCalledWith(true);
    });
  });
});
