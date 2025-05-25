import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AnimeGrid from "../components/Anime/AnimeGrid";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

const mockAnimeList = [
  {
    id: 1,
    title: { english: "Naruto", romaji: "Naruto" },
    coverImage: { large: "naruto.jpg" },
    episodes: 220,
    status: "FINISHED",
    genres: ["Action", "Adventure"],
  },
  {
    id: 2,
    title: { english: "One Piece", romaji: "One Piece" },
    coverImage: { large: "onepiece.jpg" },
    episodes: 1000,
    status: "RELEASING",
    genres: ["Action", "Comedy"],
  },
];

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider theme={theme}>{ui}</ChakraProvider>);

describe("AnimeGrid", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders anime cards with correct info and testids", () => {
    renderWithChakra(<AnimeGrid animeList={mockAnimeList} handleCardClick={jest.fn()} />);
    expect(screen.getByTestId("anime-grid-root")).toBeInTheDocument();
    expect(screen.getByTestId("anime-grid")).toBeInTheDocument();
    mockAnimeList.forEach(anime => {
      expect(screen.getByTestId(`anime-card-${anime.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`anime-image-${anime.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`anime-title-${anime.id}`)).toHaveTextContent(anime.title.english);
      expect(screen.getByTestId(`anime-episodes-${anime.id}`)).toHaveTextContent(String(anime.episodes));
      expect(screen.getByTestId(`anime-status-${anime.id}`)).toHaveTextContent(anime.status);
      expect(screen.getByTestId(`anime-viewmore-${anime.id}`)).toBeInTheDocument();
    });
  });

  it("calls handleCardClick when 'View More' is clicked", () => {
    const handleCardClick = jest.fn();
    renderWithChakra(<AnimeGrid animeList={mockAnimeList} handleCardClick={handleCardClick} />);
    fireEvent.click(screen.getByTestId("anime-viewmore-1"));
    expect(handleCardClick).toHaveBeenCalledWith(mockAnimeList[0]);
  });

  it("renders empty state with testid when animeList is empty", () => {
    renderWithChakra(<AnimeGrid animeList={[]} handleCardClick={jest.fn()} />);
    expect(screen.getByTestId("anime-empty-state")).toBeInTheDocument();
    expect(screen.getByText(/no anime found/i)).toBeInTheDocument();
    expect(screen.getByText(/please click/i)).toBeInTheDocument();
  });
});