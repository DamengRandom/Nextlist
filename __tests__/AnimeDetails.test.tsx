import { render, screen, fireEvent, mockRouter } from '../__mocks__/test-utils';
import AnimeDetails from '../components/Anime/AnimeDetails';
import { mockAnime } from '../__mocks__/animeMock';

describe('AnimeDetails', () => {
  const renderComponent = (props = {}) => {
    const defaultProps = {
      anime: mockAnime,
    };
    return render(<AnimeDetails {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    mockRouter.push.mockClear();
    renderComponent();
  });

  it('renders without crashing', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays the anime title', () => {
    const headings = screen.getAllByRole('heading', { name: /test anime english/i });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('displays the banner image when available', () => {
    const bannerImage = screen.getByRole('img', { name: /test anime english/i });
    expect(bannerImage).toHaveAttribute('src', mockAnime.bannerImage);
  });
  

  it('displays the anime description', () => {
    const descriptions = screen.getAllByText(mockAnime?.description as string);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('displays anime details correctly', () => {
    const episodes = screen.getAllByText(`Episodes: ${mockAnime.episodes}`);
    expect(episodes.length).toBeGreaterThan(0);
  
    const status = screen.getAllByText(`Status: ${mockAnime.status}`);
    expect(status.length).toBeGreaterThan(0);
  });
  
  it('displays genre tags', () => {
    (mockAnime?.genres ?? []).forEach(genre => {
      const genreElements = screen.getAllByText(genre);
      expect(genreElements.length).toBeGreaterThan(0);
    });
  });
  
  it('handles the back button click', () => {
    const backButton = screen.getByRole('button', { name: /back to anime list/i });
    fireEvent.click(backButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/information');
  });

  it('does not render banner when bannerImage is not provided', () => {
    renderComponent({ anime: { ...mockAnime, bannerImage: undefined } });
    expect(screen.queryByRole('img', { name: /anime banner image/i })).toBeNull();
  });

  it('shows fallback text when description is not available', () => {
    renderComponent({ anime: { ...mockAnime, description: undefined } });
    expect(screen.getByText('No description.')).toBeInTheDocument();
  });
});
