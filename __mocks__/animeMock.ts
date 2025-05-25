import { AnimeProps } from '../types/anilist';

export const mockAnime: AnimeProps = {
  id: 1,
  title: {
    romaji: 'Test Anime',
    english: 'Test Anime English',
    native: 'テストアニメ'
  },
  bannerImage: 'https://example.com/banner.jpg',
  coverImage: {
    extraLarge: 'https://example.com/cover-xl.jpg',
    large: 'https://example.com/cover.jpg'
  },
  description: 'This is a test anime description.',
  episodes: 12,
  duration: 24,
  status: 'FINISHED',
  format: 'TV',
  season: 'WINTER',
  seasonYear: 2023,
  type: 'ANIME',
  source: 'MANGA',
  genres: ['Action', 'Adventure'],
  synonyms: ['Test Anime Synonym'],
  averageScore: 85,
  meanScore: 80,
  popularity: 1000,
  favourites: 500,
  startDate: { year: 2023, month: 1, day: 10 },
  endDate: { year: 2023, month: 3, day: 28 },
  studios: {
    edges: [
      { node: { name: 'Studio Test' } }
    ]
  },
  siteUrl: 'https://anilist.co/anime/1',
  isAdult: false,
  countryOfOrigin: 'JP',
  trailer: {
    id: 123,
    thumbnail: 'URL_ADDRESS.youtube.com/watch?v=abc123',
    site: 'youtube'
  },
  externalLinks: [
    { id: 1, url: 'https://example.com', site: 'Official Site' }
  ]
};