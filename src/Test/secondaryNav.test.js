import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondaryNav from './secondaryNav';

describe('secondaryNav Component', () => {
  // Mock function for the setPage prop
  const mockSetPage = jest.fn();

  beforeEach(() => {
    // Clear mock calls between tests
    mockSetPage.mockClear();
    // Render the component before each test
    render(<SecondaryNav setPage={mockSetPage} />);
  });

  test('renders all navigation links', () => {
    // Check if all navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Players')).toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Games')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
  });

  test('calls setPage with "home" when Home link is clicked', () => {
    // Find the Home link and click it
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    // Check if setPage was called with the correct argument
    expect(mockSetPage).toHaveBeenCalledWith('home');
  });

  test('calls setPage with "players" when Players link is clicked', () => {
    const playersLink = screen.getByText('Players');
    fireEvent.click(playersLink);
    expect(mockSetPage).toHaveBeenCalledWith('players');
  });

  test('calls setPage with "standings" when Table link is clicked', () => {
    const tableLink = screen.getByText('Table');
    fireEvent.click(tableLink);
    expect(mockSetPage).toHaveBeenCalledWith('standings');
  });

  test('calls setPage with "games" when Games link is clicked', () => {
    const gamesLink = screen.getByText('Games');
    fireEvent.click(gamesLink);
    expect(mockSetPage).toHaveBeenCalledWith('games');
  });

  test('calls setPage with "news" when News link is clicked', () => {
    const newsLink = screen.getByText('News');
    fireEvent.click(newsLink);
    expect(mockSetPage).toHaveBeenCalledWith('news');
  });

  test('prevents default behavior when links are clicked', () => {
    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };
    
    // Get all links and simulate clicks with our mock event
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      // Reset the mock before each click
      mockEvent.preventDefault.mockClear();
      
      // Fire click event with our mock event
      fireEvent.click(link, mockEvent);
      
      // Check if preventDefault was called
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  test('links have correct href attributes', () => {
    // Get all links
    const links = screen.getAllByRole('link');
    
    // Expected href values
    const expectedHrefs = ['#home', '#players', '#table', '#games', '#news'];
    
    // Check if each link has the correct href
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', expectedHrefs[index]);
    });
  });

  test('navigation items have the correct CSS class', () => {
    // Check if the main nav element has the correct class
    const mainNav = screen.getByRole('navigation', { name: '' });
    expect(mainNav).toHaveClass('secondary-nav');
    
    // Check if each nav item has the correct ID
    const navLinks = screen.getAllByRole('link');
    navLinks.forEach(link => {
      expect(link).toHaveAttribute('id', 'navSection');
    });
  });
});