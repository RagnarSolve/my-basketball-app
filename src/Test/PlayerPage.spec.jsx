import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlayerPage from '../pages/PlayerPage'; 

// Mock the API module
vi.mock('../api/nbaApi', () => ({
  fetchPlayersStats: vi.fn(),
}));

// Import the mock after setting it up
import { fetchPlayersStats } from '../api/nbaApi';

describe('PlayerPage', () => {
  const mockStatsData = [
    {
      player: { id: 1, firstname: 'LeBron', lastname: 'James' },
      team: { name: 'Los Angeles Lakers' },
      pos: 'F',
      points: 25,
      assists: 8,
      totReb: 7,
      steals: 1,
      blocks: 1,
    },
    {
      player: { id: 2, firstname: 'Stephen', lastname: 'Curry' },
      team: { name: 'Golden State Warriors' },
      pos: 'G',
      points: 30,
      assists: 6,
      totReb: 5,
      steals: 2,
      blocks: 0,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('renders the component with initial state', () => {
    render(<PlayerPage />);
    
    expect(screen.getByText('NBA Player Stats (2024 Season)')).toBeInTheDocument();
    expect(screen.getByLabelText('Select a Team:')).toBeInTheDocument();
    expect(screen.getByText('Loading player stats...')).toBeInTheDocument();
  });

    it("displays a dropdown with all the teams" , () => {
        render(<PlayerPage />);
        const options = screen.getAllByRole("option");
        expect(options.length).toBeGreaterThan(0); 
    });

    it("calls fetchPlayerstats with the selected team ID on initial render", async () => {
        fetchPlayersStats.mockResolvedValueOnce(mockStatsData);

        render(<PlayerPage />);

        await waitFor(() => {
            expect(fetchPlayersStats).toHaveBeenCalledTimes(1);
            expect(fetchPlayersStats).toHaveBeenCalledWith(1);
        });
    });

});