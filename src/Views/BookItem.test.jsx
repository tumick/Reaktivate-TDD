import { render, screen } from '@testing-library/react';
import BookItem from './BookItem.jsx';
import { describe, it, expect } from 'vitest';

describe('BookItem', () => {
  it('renders author and name correctly', () => {
    render(<BookItem author="Isaac Asimov" name="I, Robot" />);
    expect(screen.getByText(/Isaac Asimov: I, Robot/)).toBeInTheDocument();
  });
});
