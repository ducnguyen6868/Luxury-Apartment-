import { render, screen } from '@testing-library/react';
import Detailapartment from './DetailApartments';

const mockApartmentDetails = {
  name: 'Luxury Apartment',
  images: ['image1.jpg', 'image2.jpg'],
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
  },
  amenities: ['Swimming Pool', 'Gym', 'Playground'],
  contactInfo: {
    name: 'John Doe',
    email: 'john.doe@example.com'
  },
  nearbyFacilities: {
    shoppingMalls: ['Mall 1', 'Mall 2'],
    schools: ['School 1', 'School 2'],
    hospitals: ['Hospital 1', 'Hospital 2'],
    publicTransport: ['Bus Stop 1', 'Train Station 1']
  },
  videoTour: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

describe('Detailapartment Component', () => {
  test('renders apartment details correctly', () => {
    render(<Detailapartment apartmentDetails={mockApartmentDetails} />);

    // Kiểm tra tên apartment
    expect(screen.getByText(/Luxury Apartment/i)).toBeInTheDocument();

    // Kiểm tra hình ảnh
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockApartmentDetails.images.length);
    expect(images[0].src).toContain('image1.jpg');

    // Kiểm tra mô tả
    expect(screen.getByText(/A luxurious apartment with modern amenities./i)).toBeInTheDocument();

    // Kiểm tra vị trí
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/New York, NY 10001, USA/i)).toBeInTheDocument();

    // Kiểm tra giá
    expect(screen.getByText(/\$500000/i)).toBeInTheDocument();

    // Kiểm tra các tính năng
    expect(screen.getByText(/Area: 1200 sqft/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Bathrooms: 2/i)).toBeInTheDocument();

    // Kiểm tra các tiện ích
    expect(screen.getByText(/Swimming Pool/i)).toBeInTheDocument();
    expect(screen.getByText(/Gym/i)).toBeInTheDocument();

    // Kiểm tra thông tin liên hệ
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();

    // Kiểm tra các cơ sở gần đó
    expect(screen.getByText(/Mall 1/i)).toBeInTheDocument();
    expect(screen.getByText(/School 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Hospital 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Bus Stop 1/i)).toBeInTheDocument();

    // Kiểm tra video tour
    const iframe = screen.getByTitle('Video Tour');
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe(mockApartmentDetails.videoTour);
  });

  test('renders "Loading..." when apartmentDetails is not provided', () => {
    render(<Detailapartment apartmentDetails={null} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders "No images available" when images are not provided', () => {
    const detailsWithoutImages = { ...mockApartmentDetails, images: [] };
    render(<Detailapartment apartmentDetails={detailsWithoutImages} />);
    expect(screen.getByText(/No images available/i)).toBeInTheDocument();
  });

  test('renders "No description available" when description is not provided', () => {
    const detailsWithoutDescription = { ...mockApartmentDetails, description: '' };
    render(<Detailapartment apartmentDetails={detailsWithoutDescription} />);
    expect(screen.getByText(/No description available/i)).toBeInTheDocument();
  });

  test('renders "No video tour available" when videoTour is not provided', () => {
    const detailsWithoutVideoTour = { ...mockApartmentDetails, videoTour: '' };
    render(<Detailapartment apartmentDetails={detailsWithoutVideoTour} />);
    expect(screen.getByText(/No video tour available/i)).toBeInTheDocument();
  });
});
