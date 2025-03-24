import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import StandingsPage from '../pages/StandingsPage';
import { fetchStandings } from '../api/nbaApi';

vi.mock('../api/nbaApi', () => ({
  fetchStandings: vi.fn(),
}));

describe('StandingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup(); //clean up the DOM between tests
  });

  it('displays loading message initially', () => {
    fetchStandings.mockResolvedValueOnce([]);
    render(<StandingsPage />);
    expect(screen.getByText('Loading standings...')).toBeInTheDocument();
  });

  it('fetches and displays standings data sorted by wins', async () => {
    const mockStandingsData = [
      {
        team: { name: 'Lakers' },
        win: { total: 42 },
        loss: { total: 30 }
      },
      {
        team: { name: 'Warriors' },
        win: { total: 45 },
        loss: { total: 27 }
      },
      {
        team: { name: 'Celtics' },
        win: { total: 50 },
        loss: { total: 22 }
      }
    ];
    
    fetchStandings.mockResolvedValueOnce(mockStandingsData);
    render(<StandingsPage />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading standings...')).not.toBeInTheDocument();
    });
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Celtics - 50 Wins, 22 Losses');
    expect(listItems[1]).toHaveTextContent('Warriors - 45 Wins, 27 Losses');
    expect(listItems[2]).toHaveTextContent('Lakers - 42 Wins, 30 Losses');
  });

  it('handles API errors gracefully', async () => {
    fetchStandings.mockRejectedValueOnce(new Error('API Error'));
    render(<StandingsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load standings')).toBeInTheDocument();
    });
  });

  it('displays message when no standings data is available', async () => {
    fetchStandings.mockResolvedValueOnce([]);
    render(<StandingsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('No standings data available')).toBeInTheDocument();
    });
  });

  it('sorts the standings data correctly', async () => {
    const unsortedData = [
      {
        team: { name: 'Team A' },
        win: { total: 30 },
        loss: { total: 42 }
      },
      {
        team: { name: 'Team B' },
        win: { total: 45 },
        loss: { total: 27 }
      },
      {
        team: { name: 'Team C' },
        win: { total: 40 },
        loss: { total: 32 }
      }
    ];
    
    fetchStandings.mockResolvedValueOnce(unsortedData);
    render(<StandingsPage />);
    
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
      expect(listItems[0]).toHaveTextContent('Team B - 45 Wins, 27 Losses');
      expect(listItems[1]).toHaveTextContent('Team C - 40 Wins, 32 Losses');
      expect(listItems[2]).toHaveTextContent('Team A - 30 Wins, 42 Losses');
    });
  });
});