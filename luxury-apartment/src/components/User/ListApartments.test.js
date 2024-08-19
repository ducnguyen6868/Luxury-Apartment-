import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListApartments from './ListApartments';
import { BrowserRouter as Router } from 'react-router-dom';

const mockApartment = {
  _id: '1',
  images: ['image1.jpg', 'image2.jpg'],
  name: 'Luxury Apartment',
  description: 'A luxurious apartment with modern amenities.',
  location: {
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    country: 'USA'
  },
  price: 500000,
  features: {
    area: '1200 sqft',
    bedrooms: 3,
    bathrooms: 2,
    balconies: 2,
    floor: 5,
    furnishing: 'Furnished',
    parking: '2 spots'
  }
};

describe('ListApartments Component', () => {
  test('renders apartment details correctly', async () => {
    render(
      <Router>
        <ListApartments apartment={mockApartment} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Luxury Apartment/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/A luxurious apartment with modern amenities./i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/New York, NY 10001/i)).toBeInTheDocument();
    expect(screen.getByText(/USA/i)).toBeInTheDocument();
    expect(screen.getByText(/\$500000/i)).toBeInTheDocument();
    expect(screen.getByText(/Area: 1200 sqft/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Bathrooms: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Balconies: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Floor: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Furnishing: Furnished/i)).toBeInTheDocument();
    expect(screen.getByText(/Parking: 2 spots/i)).toBeInTheDocument();
  });

  test('renders the first image and handles image error', async () => {
    render(
      <Router>
        <ListApartments apartment={mockApartment} />
      </Router>
    );

    const image = await waitFor(() => screen.getByAltText('Product View'));
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('image1.jpg');

    fireEvent.error(image);
    expect(image.src).toContain('image-not-found.jpg');
  });

  test('link to the apartment detail page works correctly', async () => {
    render(
      <Router>
        <ListApartments apartment={mockApartment} />
      </Router>
    );

    const link = await waitFor(() => screen.getByRole('link', { name: /Visit Apartment/i }));
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(`/detail-apartments/${mockApartment._id}`);
  });
});
