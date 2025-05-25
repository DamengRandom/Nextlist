import { render, screen } from '@testing-library/react';
import Footer from '../components/Shared/Footer'; 
// import { Box, Text, Flex } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  Box: jest.fn(({ children }) => <div data-testid="box">{children}</div>),
  Flex: jest.fn(({ children }) => <div data-testid="flex">{children}</div>),
  Text: jest.fn(({ children }) => <div data-testid="text">{children}</div>),
}));

describe('Footer component', () => {
  beforeAll(() => {
    // Mock the current year to always return 2023 for testing
    jest.spyOn(global.Date, 'now').mockImplementation(() => 
      new Date('2023-01-01T00:00:00Z').valueOf()
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('displays the current year', () => {
    render(<Footer />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('displays the correct version number', () => {
    render(<Footer />);
    expect(screen.getByText(/v1.0.1/)).toBeInTheDocument();
  });

  it('contains the heart symbol', () => {
    render(<Footer />);
    expect(screen.getByText(/♥/)).toBeInTheDocument();
  });

  it('contains the correct author name', () => {
    render(<Footer />);
    expect(screen.getByText(/DamengRandom/)).toBeInTheDocument();
  });

  it('has the correct structure with Box, Flex, and Text components', () => {
    render(<Footer />);
    const box = screen.getByTestId('box');
    const flex = screen.getByTestId('flex');
    
    expect(box).toContainElement(flex);
  });
});
