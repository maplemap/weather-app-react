import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { SearchBar } from './search-bar';

describe('SearchBar Component', () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    render(<SearchBar onChange={onChangeMock} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the placeholder text', () => {
    expect(screen.getByText('Your city name')).toBeInTheDocument();
  });

  it('should render the search button', () => {
    expect(screen.getByRole('search-button')).toBeInTheDocument();
  });

  it('should render the clean button as hidden by default', () => {
    expect(screen.getByRole('clean-button')).toHaveClass(/cleanButton_hide/);
  });

  describe('when search text was entered', () => {
    let input: HTMLInputElement;

    beforeEach(async () => {
      input = screen.getByRole('searchbox');
      await userEvent.type(input, 'Test city');
    });

    it('should show the clean button', async () => {
      expect(screen.getByRole('clean-button')).not.toHaveClass(
        /cleanButton_hide/
      );
    });

    describe('when clean button was clicked', () => {
      let cleanButton: HTMLButtonElement;

      beforeEach(async () => {
        cleanButton = screen.getByRole('clean-button');

        await userEvent.type(input, 'Test city');
        await userEvent.click(cleanButton);
      });

      it('should clear the input', async () => {
        expect(input).toHaveValue('');
      });

      it('should hide the clean button', async () => {
        expect(cleanButton).toHaveClass(/cleanButton_hide/);
      });
    });

    describe('when `Enter` was clicked', () => {
      beforeEach(async () => {
        await userEvent.type(input, '{enter}');
      });

      it('should call `onChange` with the query as parameter', async () => {
        expect(onChangeMock).toHaveBeenCalledWith('Test city');
      });

      it('should cleanup the input', async () => {
        expect(input).toHaveValue('');
      });
    });
  });

  describe('when search text was not entered', () => {
    describe('when `Enter` was clicked', () => {
      it('should not call `onChange`', async () => {
        const input = screen.getByRole('searchbox');
        await userEvent.type(input, '{enter}');

        expect(onChangeMock).not.toHaveBeenCalled();
      });
    });
  });
});
