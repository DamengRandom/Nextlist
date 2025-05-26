import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Shared/Navbar';
import { useRouter } from 'next/navigation';
import { useAnimeStore } from '../lib/store/animeStore';
import { ChakraProvider } from '@chakra-ui/react';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the anime store
jest.mock('../lib/store/animeStore', () => ({
  useAnimeStore: jest.fn(),
}));

describe('Navbar component', () => {
  const mockPush = jest.fn();
  const mockReset = jest.fn();
  const mockHandleEdit = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAnimeStore as unknown as jest.Mock).mockReturnValue({
      reset: mockReset,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderNavbar = (props = {}) => {
    return render(
      <ChakraProvider>
        <Navbar handleEdit={mockHandleEdit} username="testuser" {...props} />
      </ChakraProvider>
    );
  };

  it('renders correctly with username', () => {
    renderNavbar({ username: "testuser" });
    
    expect(screen.getByText('Nextlist')).toBeInTheDocument();
    expect(screen.getByText('Hello testuser')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders correctly without username', () => {
    renderNavbar({ username: null });
    
    expect(screen.getByText('Nextlist')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls handleEdit when button is clicked', () => {
    renderNavbar({ username: "testuser" });
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
  });

  it('navigates to home and resets store when title is clicked', () => {
    renderNavbar({ username: "testuser" });
    
    fireEvent.click(screen.getByText('Nextlist'));
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot with username', () => {
    const { asFragment } = renderNavbar({ username: "testuser" });
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot without username', () => {
    const { asFragment } = renderNavbar({ username: null });
    expect(asFragment()).toMatchSnapshot();
  });
});