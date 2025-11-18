import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('renders the logo text', () => {
    renderHeader();
    expect(screen.getByText('GameBoy')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderHeader();
    
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('has correct navigation link hrefs', () => {
    renderHeader();
    
    const discoverLink = screen.getByText('Discover').closest('a');
    const searchLink = screen.getByText('Search').closest('a');
    const insightsLink = screen.getByText('Insights').closest('a');
    const favoritesLink = screen.getByText('Favorites').closest('a');
    
    expect(discoverLink).toHaveAttribute('href', '/');
    expect(searchLink).toHaveAttribute('href', '/search');
    expect(insightsLink).toHaveAttribute('href', '/insights');
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  it('renders navigation icons', () => {
    renderHeader();
    
    const icons = document.querySelectorAll('svg');
    // Should have at least 5 icons (logo + 4 nav items)
    expect(icons.length).toBeGreaterThanOrEqual(5);
  });
});
