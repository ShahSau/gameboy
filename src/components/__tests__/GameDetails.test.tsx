import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GameDetails from '../../pages/GameDetails';
import * as api from '@/api/fetchApi';

// Mocks
vi.mock('@/components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('@/components/GameCard', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe('GameDetails Page', () => {
  const mockGame = {
    id: 1,
    title: 'Test Game Details',
    thumbnail: 'thumb.jpg',
    short_description: 'Desc',
    description: 'Full Description',
    game_url: 'http://game.com',
    genre: 'Shooter',
    platform: 'PC',
    publisher: 'Pub',
    developer: 'Dev',
    release_date: '2024-01-01',
    status: 'Live',
    screenshots: [{ id: 1, image: 'screen1.jpg' }],
    minimum_system_requirements: {
      os: 'Win 10',
      processor: 'i5',
      memory: '8GB',
      graphics: 'GTX 1060',
      storage: '50GB'
    }
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(api, 'getDetails').mockResolvedValue(mockGame);
    vi.spyOn(api, 'getRecommendedGames').mockResolvedValue([]);
  });

  const renderDetails = () => {
    window.history.pushState({}, 'Test page', '/game/1');
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('renders game details correctly', async () => {
    renderDetails();

    await waitFor(() => {
      expect(screen.getByText('Test Game Details')).toBeInTheDocument();
      expect(screen.getByText('Full Description')).toBeInTheDocument();
      expect(screen.getByText('Dev')).toBeInTheDocument();
      expect(screen.getByText('Pub')).toBeInTheDocument();
    });
  });

  it('toggles favorites', async () => {
    renderDetails();

    await waitFor(() => {
      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });

    const favButton = screen.getByText('Add to Favorites');
    fireEvent.click(favButton);

    expect(screen.getByText('Saved to Favorites')).toBeInTheDocument();
    expect(sessionStorage.getItem('favorites')).toContain('Test Game Details');

    fireEvent.click(favButton);
    expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
  });
});