import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from '../../pages/Search'; // Ensure this path points to your page component
import * as api from '@/api/fetchApi';

// Mock Header and GameCard
vi.mock('@/components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('@/components/GameCard', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>
}));
// Mock InfiniteScroll to render children immediately
vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Search Page', () => {
  const mockGames = [
    { id: 1, title: 'Valorant', genre: 'Shooter', platform: 'PC', thumbnail: 'val.jpg' },
    { id: 2, title: 'WoW', genre: 'MMORPG', platform: 'PC', thumbnail: 'wow.jpg' },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
    // Default mock behavior
    vi.spyOn(api, 'getFilteredGames').mockResolvedValue(mockGames);
  });

  const renderSearch = () => {
    // FIX: Create a NEW QueryClient for each render.
    // This prevents tests from sharing cache, ensuring the component 
    // always fetches fresh data from our mocks.
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Turn off retries for faster error testing
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('renders search input and filters', () => {
    renderSearch();
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('filters games based on search input', async () => {
    renderSearch();

    // Wait for games to load
    await waitFor(() => {
      expect(screen.getByText('Valorant')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(input, { target: { value: 'Valorant' } });

    await waitFor(() => {
      expect(screen.getByText('Valorant')).toBeInTheDocument();
      expect(screen.queryByText('WoW')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('shows no games found state', async () => {
    // Override the mock to return empty array
    vi.spyOn(api, 'getFilteredGames').mockResolvedValue([]);
    renderSearch();

    await waitFor(() => {
      expect(screen.getByText('No games found')).toBeInTheDocument();
    });
  });

  it('handles API errors', async () => {
    // Override the mock to reject
    vi.spyOn(api, 'getFilteredGames').mockRejectedValue(new Error('API Error'));
    renderSearch();

    // We check for the error text.
    // Using a function matcher or regex helps avoid issues with text broken by HTML tags.
    await waitFor(() => {
      expect(screen.getByText(/Error loading games/i)).toBeInTheDocument();
      // Also check for the Retry button to be sure
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });
});