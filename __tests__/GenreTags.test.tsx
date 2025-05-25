import { render, screen } from '@testing-library/react';
import { GenreTags } from '../components/Shared/GenreTags';
import { ChakraProvider } from '@chakra-ui/react';

describe('GenreTags', () => {
  const testGenres = ['Action', 'Comedy', 'Drama', 'Sci-Fi'];
  const testSingleGenre = ['Thriller'];

  const renderWithChakra = (ui: React.ReactElement) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
  };

  it('renders all genre tags', () => {
    renderWithChakra(<GenreTags genres={testGenres} />);
    testGenres.forEach(genre => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('renders nothing when genres array is empty', () => {
    const { container } = renderWithChakra(<GenreTags genres={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('handles undefined genres prop gracefully', () => {
    const { container } = renderWithChakra(<GenreTags genres={undefined as never} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('wraps tags when they overflow', () => {
    renderWithChakra(<GenreTags genres={testGenres} />);
    const hstack = screen.getByTestId('genre-tags-container');
    expect(hstack).toHaveStyle('flex-wrap: wrap');
  });

  it('matches snapshot with multiple genres', () => {
    const { asFragment } = renderWithChakra(<GenreTags genres={testGenres} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with single genre', () => {
    const { asFragment } = renderWithChakra(<GenreTags genres={testSingleGenre} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with empty genres', () => {
    const { asFragment } = renderWithChakra(<GenreTags genres={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});