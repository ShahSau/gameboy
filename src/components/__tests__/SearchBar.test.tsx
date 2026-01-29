import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    expect(screen.getByPlaceholderText('Search games...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} placeholder="Custom placeholder" />);
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="Test search" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search games...') as HTMLInputElement;
    expect(input.value).toBe('Test search');
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search games...');
    await user.type(input, 'Valorant');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders search icon', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const searchIcon = document.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });
});
