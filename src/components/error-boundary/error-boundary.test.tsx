import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from '@/components';

describe('ErrorBoundary Component', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  describe('when an error is thrown in children', () => {
    it('should render the fallback message', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(
        screen.getByText(
          'Something went wrong. Please update the page now or try again it later.'
        )
      ).toBeInTheDocument();
    });

    it('should render a custom fallback message if provided', () => {
      const customMessage = 'Custom Error Message';

      render(
        <ErrorBoundary message={customMessage}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });
});
