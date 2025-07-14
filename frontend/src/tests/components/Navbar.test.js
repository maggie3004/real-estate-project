import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from '../../components/Navbar';

// Extend expect to include axe matchers
expect.extend(toHaveNoViolations);

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock logo import
jest.mock('../../assets/logo.png', () => 'mocked-logo.png');

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Home: () => <span data-testid="home-icon">Home</span>,
  Building2: () => <span data-testid="building-icon">Building</span>,
  MapPin: () => <span data-testid="map-icon">Map</span>,
  Phone: () => <span data-testid="phone-icon">Phone</span>,
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="close-icon">Close</span>,
  User: () => <span data-testid="user-icon">User</span>,
  LogOut: () => <span data-testid="logout-icon">Logout</span>,
  Search: () => <span data-testid="search-icon">Search</span>,
  Bell: () => <span data-testid="bell-icon">Bell</span>,
  Settings: () => <span data-testid="settings-icon">Settings</span>,
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('Rendering', () => {
    test('renders navbar with logo and company name', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByAltText('Sai Prasad Builders and Developers Logo')).toBeInTheDocument();
      expect(screen.getByText('Sai Prasad Group')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Properties')).toBeInTheDocument();
      expect(screen.getByText('Map View')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('renders action buttons', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByLabelText('Search properties')).toBeInTheDocument();
      expect(screen.getByLabelText('View notifications')).toBeInTheDocument();
    });

    test('renders sign in and get started buttons when not authenticated', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    test('renders user menu when authenticated', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('mock-token')
        .mockReturnValueOnce(JSON.stringify({ name: 'John Doe', email: 'john@example.com' }));
      
      renderWithRouter(<Navbar />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByLabelText('Logout from account')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu', () => {
    test('toggles mobile menu when menu button is clicked', () => {
      renderWithRouter(<Navbar />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
      
      fireEvent.click(menuButton);
      
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('closes mobile menu when escape key is pressed', () => {
      renderWithRouter(<Navbar />);
      
      const menuButton = screen.getByLabelText('Open menu');
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByRole('menu');
      fireEvent.keyDown(mobileMenu, { key: 'Escape' });
      
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('supports keyboard navigation in mobile menu', () => {
      renderWithRouter(<Navbar />);
      
      const menuButton = screen.getByLabelText('Open menu');
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByRole('menu');
      fireEvent.keyDown(mobileMenu, { key: 'ArrowDown' });
      
      // Should focus first menu item
      expect(screen.getByText('Home')).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Authentication', () => {
    test('handles logout correctly', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('mock-token')
        .mockReturnValueOnce(JSON.stringify({ name: 'John Doe' }));
      
      renderWithRouter(<Navbar />);
      
      const logoutButton = screen.getByLabelText('Logout from account');
      fireEvent.click(logoutButton);
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });

    test('updates UI after logout', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce('mock-token')
        .mockReturnValueOnce(JSON.stringify({ name: 'John Doe' }));
      
      renderWithRouter(<Navbar />);
      
      const logoutButton = screen.getByLabelText('Logout from account');
      fireEvent.click(logoutButton);
      
      await waitFor(() => {
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    test('highlights active navigation item', () => {
      renderWithRouter(<Navbar />);
      
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });

    test('navigates to correct routes', () => {
      renderWithRouter(<Navbar />);
      
      const propertiesLink = screen.getByText('Properties').closest('a');
      expect(propertiesLink).toHaveAttribute('href', '/listings');
      
      const mapLink = screen.getByText('Map View').closest('a');
      expect(mapLink).toHaveAttribute('href', '/map');
    });
  });

  describe('Accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderWithRouter(<Navbar />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has proper ARIA labels', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Search properties')).toBeInTheDocument();
      expect(screen.getByLabelText('View notifications')).toBeInTheDocument();
      expect(screen.getByLabelText('Sign in to your account')).toBeInTheDocument();
      expect(screen.getByLabelText('Create a new account')).toBeInTheDocument();
    });

    test('has proper roles', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('menubar')).toBeInTheDocument();
    });

    test('supports keyboard navigation', () => {
      renderWithRouter(<Navbar />);
      
      const searchButton = screen.getByLabelText('Search properties');
      expect(searchButton).toHaveAttribute('tabIndex', '0');
      
      const notificationButton = screen.getByLabelText('View notifications');
      expect(notificationButton).toHaveAttribute('tabIndex', '0');
    });

    test('has proper focus management', () => {
      renderWithRouter(<Navbar />);
      
      const menuButton = screen.getByLabelText('Open menu');
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Responsive Design', () => {
    test('shows mobile menu button on small screens', () => {
      renderWithRouter(<Navbar />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveClass('lg:hidden');
    });

    test('hides desktop navigation on small screens', () => {
      renderWithRouter(<Navbar />);
      
      const desktopNav = screen.getByRole('menubar');
      expect(desktopNav).toHaveClass('hidden lg:flex');
    });
  });

  describe('Error Handling', () => {
    test('handles missing user data gracefully', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('mock-token')
        .mockReturnValueOnce(null);
      
      renderWithRouter(<Navbar />);
      
      expect(screen.getByText('User')).toBeInTheDocument();
    });

    test('handles invalid JSON in localStorage', () => {
      localStorageMock.getItem
        .mockReturnValueOnce('mock-token')
        .mockReturnValueOnce('invalid-json');
      
      renderWithRouter(<Navbar />);
      
      expect(screen.getByText('User')).toBeInTheDocument();
    });
  });
}); 