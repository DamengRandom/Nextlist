import { render, screen, fireEvent } from '@testing-library/react';
import AnimeModal from '../components/Anime/AnimeModal';
import '@testing-library/jest-dom';
import { AnimeModalNavProps } from '../types/anilist';

const mockAnime = {
  id: 123,
  title: {
    english: 'Attack on Titan',
    romaji: 'Shingeki no Kyojin',
  },
  coverImage: {
    large: 'https://example.com/cover.jpg',
  },
  description: '<p>A thrilling anime.</p>',
  episodes: 25,
  status: 'Finished',
  genres: ['Action', 'Drama'],
};

const defaultProps: AnimeModalNavProps = {
  isOpen: true,
  onClose: jest.fn(),
  onPrev: jest.fn(),
  onNext: jest.fn(),
  hasPrev: true,
  hasNext: true,
  anime: mockAnime,
  type: 'anime',
};

describe('AnimeModal', () => {
  it('renders the anime details correctly', () => {
    render(<AnimeModal {...defaultProps} />);
  
    // Accept multiple matches
    const titleElements = screen.getAllByText(/Attack on Titan/i);
    expect(titleElements.length).toBeGreaterThan(0);
  
    // Check image
    expect(screen.getByAltText(/Shingeki no Kyojin/i)).toHaveAttribute('src', mockAnime.coverImage.large);
  
    // Description should be plain text after HTML is stripped
    expect(screen.getByText(/A thrilling anime/i)).toBeInTheDocument();
  
    // Check metadata
    expect(screen.getByText(/Episodes: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Finished/i)).toBeInTheDocument();
  
    // Check View Details button
    const detailsLink = screen.getByRole('link', { name: /View Details/i });
    expect(detailsLink).toHaveAttribute('href', '/information/anime/123');
  });
  

  it('triggers onPrev when Previous button is clicked', () => {
    render(<AnimeModal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/Previous/i));
    expect(defaultProps.onPrev).toHaveBeenCalled();
  });

  it('triggers onNext when Next button is clicked', () => {
    render(<AnimeModal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/Next/i));
    expect(defaultProps.onNext).toHaveBeenCalled();
  });

  it('does not render if anime is null', () => {
    const props = { ...defaultProps, anime: null };
    const { container } = render(<AnimeModal {...props} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('hides Previous and Next buttons if hasPrev/hasNext are false', () => {
    const props = { ...defaultProps, hasPrev: false, hasNext: false };
    render(<AnimeModal {...props} />);
    expect(screen.queryByLabelText(/Previous/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Next/i)).not.toBeInTheDocument();
  });
});
