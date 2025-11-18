import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import GameCard from '../GameCard';

describe('GameCard', () => {
  const mockGame = {
    id: 1,
    title: 'Test Game',
    coverImage: 'https://test.com/image.jpg',
    rating: 8.5,
    platforms: ['PC', 'PS5', 'Xbox'],
    releaseDate: 'Jan 2024',
  };

  it('renders game title correctly', () => {
    render(<GameCard {...mockGame} />);
    expect(screen.getByText('Test Game')).toBeInTheDocument();
  });

  it('displays rating when provided', () => {
    render(<GameCard {...mockGame} />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('shows platforms (max 3)', () => {
    render(<GameCard {...mockGame} />);
    expect(screen.getByText('PC')).toBeInTheDocument();
    expect(screen.getByText('PS5')).toBeInTheDocument();
    expect(screen.getByText('Xbox')).toBeInTheDocument();
  });

  it('displays release date when provided', () => {
    render(<GameCard {...mockGame} />);
    expect(screen.getByText('Jan 2024')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<GameCard {...mockGame} onClick={handleClick} />);
    
    const card = screen.getByText('Test Game').closest('.group');
    if (card) {
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('renders without rating', () => {
    const gameWithoutRating = { ...mockGame, rating: undefined };
    render(<GameCard {...gameWithoutRating} />);
    expect(screen.queryByText('8.5')).not.toBeInTheDocument();
  });

  it('renders without platforms', () => {
    const gameWithoutPlatforms = { ...mockGame, platforms: undefined };
    render(<GameCard {...gameWithoutPlatforms} />);
    expect(screen.queryByText('PC')).not.toBeInTheDocument();
  });

  it('limits platforms display to 3', () => {
    const gameWithManyPlatforms = {
      ...mockGame,
      platforms: ['PC', 'PS5', 'Xbox', 'Switch', 'Mobile'],
    };
    render(<GameCard {...gameWithManyPlatforms} />);
    
    expect(screen.getByText('PC')).toBeInTheDocument();
    expect(screen.getByText('PS5')).toBeInTheDocument();
    expect(screen.getByText('Xbox')).toBeInTheDocument();
    expect(screen.queryByText('Switch')).not.toBeInTheDocument();
    expect(screen.queryByText('Mobile')).not.toBeInTheDocument();
  });
});
