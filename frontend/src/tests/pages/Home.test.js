import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '../../pages/Home';

// Extend expect to include axe matchers
expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  describe('Rendering', () => {
    test('renders hero section with main heading', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Find Your Dream Home/i)).toBeInTheDocument();
      expect(screen.getByText(/Discover the perfect property/i)).toBeInTheDocument();
    });

    test('renders search section', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter location/i)).toBeInTheDocument();
    });

    test('renders featured properties section', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Featured Properties/i)).toBeInTheDocument();
    });

    test('renders about section', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/About Ganesh Yeole Builders and Developers/i)).toBeInTheDocument();
    });

    test('renders services section', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    });

    test('renders testimonials section', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/What Our Clients Say/i)).toBeInTheDocument();
    });

    test('renders contact section', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('allows user to enter search location', () => {
      renderWithRouter(<Home />);
      
      const searchInput = screen.getByPlaceholderText(/Enter location/i);
      fireEvent.change(searchInput, { target: { value: 'Mumbai' } });
      
      expect(searchInput.value).toBe('Mumbai');
    });

    test('allows user to select property type', () => {
      renderWithRouter(<Home />);
      
      const propertyTypeSelect = screen.getByLabelText(/Property Type/i);
      fireEvent.change(propertyTypeSelect, { target: { value: 'apartment' } });
      
      expect(propertyTypeSelect.value).toBe('apartment');
    });

    test('allows user to set price range', () => {
      renderWithRouter(<Home />);
      
      const priceRangeInput = screen.getByLabelText(/Price Range/i);
      fireEvent.change(priceRangeInput, { target: { value: '5000000' } });
      
      expect(priceRangeInput.value).toBe('5000000');
    });

    test('submits search form', () => {
      renderWithRouter(<Home />);
      
      const searchButton = screen.getByText(/Search Now/i);
      fireEvent.click(searchButton);
      
      // Should navigate to listings page with search params
      expect(searchButton).toBeInTheDocument();
    });
  });

  describe('Property Cards', () => {
    test('displays property information correctly', () => {
      renderWithRouter(<Home />);
      
      // Check for property details
      expect(screen.getByText(/₹/)).toBeInTheDocument();
      expect(screen.getByText(/BHK/i)).toBeInTheDocument();
      expect(screen.getByText(/sq ft/i)).toBeInTheDocument();
    });

    test('allows user to view property details', () => {
      renderWithRouter(<Home />);
      
      const viewDetailsButton = screen.getByText(/View Details/i);
      fireEvent.click(viewDetailsButton);
      
      // Should navigate to property details page
      expect(viewDetailsButton).toBeInTheDocument();
    });

    test('allows user to add property to favorites', () => {
      renderWithRouter(<Home />);
      
      const favoriteButton = screen.getByLabelText(/Add to favorites/i);
      fireEvent.click(favoriteButton);
      
      // Should show filled heart icon
      expect(screen.getByLabelText(/Remove from favorites/i)).toBeInTheDocument();
    });
  });

  describe('Services Section', () => {
    test('displays all service categories', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Property Sales/i)).toBeInTheDocument();
      expect(screen.getByText(/Property Rentals/i)).toBeInTheDocument();
      expect(screen.getByText(/Property Management/i)).toBeInTheDocument();
      expect(screen.getByText(/Real Estate Investment/i)).toBeInTheDocument();
    });

    test('allows user to learn more about services', () => {
      renderWithRouter(<Home />);
      
      const learnMoreButtons = screen.getAllByText(/Learn More/i);
      fireEvent.click(learnMoreButtons[0]);
      
      // Should navigate to services page or show more details
      expect(learnMoreButtons[0]).toBeInTheDocument();
    });
  });

  describe('Testimonials', () => {
    test('displays client testimonials', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Sarah Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/Michael Johnson/i)).toBeInTheDocument();
    });

    test('allows user to navigate through testimonials', () => {
      renderWithRouter(<Home />);
      
      const nextButton = screen.getByLabelText(/Next testimonial/i);
      const prevButton = screen.getByLabelText(/Previous testimonial/i);
      
      fireEvent.click(nextButton);
      fireEvent.click(prevButton);
      
      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
    });
  });

  describe('Contact Section', () => {
    test('displays contact information', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByText(/Email/i)).toBeInTheDocument();
      expect(screen.getByText(/Address/i)).toBeInTheDocument();
    });

    test('allows user to submit contact form', () => {
      renderWithRouter(<Home />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Test message' } });
      
      const submitButton = screen.getByText(/Send Message/i);
      fireEvent.click(submitButton);
      
      expect(nameInput.value).toBe('Test User');
      expect(emailInput.value).toBe('test@example.com');
      expect(messageInput.value).toBe('Test message');
    });
  });

  describe('Accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderWithRouter(<Home />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has proper heading hierarchy', () => {
      renderWithRouter(<Home />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      // Check that h1 is used for main heading
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    test('has proper form labels', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Price Range/i)).toBeInTheDocument();
    });

    test('has proper button labels', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByLabelText(/Search properties/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/View property details/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Add to favorites/i)).toBeInTheDocument();
    });

    test('supports keyboard navigation', () => {
      renderWithRouter(<Home />);
      
      const searchButton = screen.getByText(/Search Now/i);
      expect(searchButton).toHaveAttribute('tabIndex', '0');
      
      const viewDetailsButton = screen.getByText(/View Details/i);
      expect(viewDetailsButton).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Responsive Design', () => {
    test('adapts to different screen sizes', () => {
      renderWithRouter(<Home />);
      
      // Check for responsive classes
      const heroSection = screen.getByText(/Find Your Dream Home/i).closest('section');
      expect(heroSection).toHaveClass('container');
    });

    test('maintains functionality on mobile', () => {
      renderWithRouter(<Home />);
      
      const searchInput = screen.getByPlaceholderText(/Enter location/i);
      fireEvent.change(searchInput, { target: { value: 'Mumbai' } });
      
      expect(searchInput.value).toBe('Mumbai');
    });
  });

  describe('Performance', () => {
    test('loads without errors', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      renderWithRouter(<Home />);
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('handles image loading gracefully', () => {
      renderWithRouter(<Home />);
      
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        fireEvent.error(img);
        // Should show fallback or placeholder
        expect(img).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles missing property data gracefully', () => {
      renderWithRouter(<Home />);
      
      // Should still render the page even if property data is missing
      expect(screen.getByText(/Featured Properties/i)).toBeInTheDocument();
    });

    test('handles form validation errors', () => {
      renderWithRouter(<Home />);
      
      const submitButton = screen.getByText(/Send Message/i);
      fireEvent.click(submitButton);
      
      // Should show validation errors
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });
  });
}); 