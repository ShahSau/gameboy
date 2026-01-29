import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Favorites from '../../pages/Favorites';

// 1. Mock Header
vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}));

// 2. Mock GameCard
vi.mock('@/components/GameCard', () => ({
  default: ({ title }: { title: string }) => <div data-testid="game-card">{title}</div>
}));

// 3. Mock Skeleton
vi.mock('@/components/skeletons/GameCardSkeleton', () => ({
  default: () => <div data-testid="skeleton">Loading...</div>
}));

// 4. Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Favorites Page', () => {
  const renderFavorites = () => {
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Ensure storage is clean before each test
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    renderFavorites();
    // Check that skeletons are present immediately
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
    // Check that the empty state text is NOT present yet
    expect(screen.queryByText('No favorites yet')).not.toBeInTheDocument();
  });

  it('renders empty state when no favorites exist', async () => {
    renderFavorites();
    
    // Wait for the 500ms real timer to complete
    await waitFor(() => {
      expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Start exploring and add games to your collection!')).toBeInTheDocument();
    expect(screen.getByText('Browse Games')).toBeInTheDocument();
  });

  it('renders favorite games from sessionStorage', async () => {
    const mockGames = [
      {
        id: 1,
        title: 'Favorite Game 1',
        thumbnail: 'img1.jpg',
        short_description: 'desc1',
        genre: 'Action',
        platform: 'PC',
        release_date: '2023'
      },
      {
        id: 2,
        title: 'Favorite Game 2',
        thumbnail: 'img2.jpg',
        short_description: 'desc2',
        genre: 'RPG',
        platform: 'PS5',
        release_date: '2024'
      }
    ];

    sessionStorage.setItem('favorites', JSON.stringify(mockGames));

    renderFavorites();
    
    // Wait for the 500ms real timer to complete
    await waitFor(() => {
      expect(screen.getByText('Favorite Game 1')).toBeInTheDocument();
      expect(screen.getByText('Favorite Game 2')).toBeInTheDocument();
    });
  });
});