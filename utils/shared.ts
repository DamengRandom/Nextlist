import { Dict } from "@chakra-ui/utils"; // try to use Chakra provided type instead own definition

const TAG_COLORS = [
  "teal.200",
  "blue.200",
  "pink.200",
  "orange.200",
  "purple.200",
  "green.200",
  "yellow.200",
  "red.200",
  "cyan.200"
] as const;

const genreColorMap: Dict<string> = {};

export const getTagColor = (genre: string): string => {
  if (genreColorMap[genre]) {
    return genreColorMap[genre];
  }

  const colorIndex = Object.keys(genreColorMap).length % TAG_COLORS.length;
  const selectedColor = TAG_COLORS[colorIndex];

  genreColorMap[genre] = selectedColor;
  
  return selectedColor;
};

const COMMON_GENRES: Dict<string> = {
  "Action": "red.200",
  "Adventure": "orange.200",
  "Comedy": "yellow.200",
  "Drama": "purple.200",
  "Fantasy": "teal.200",
  "Sci-Fi": "blue.200",
  "Romance": "pink.200",
  "Horror": "gray.200",
  "Mystery": "cyan.200"
};

export const getTagColorV2 = (genre: string): string => {
  if (COMMON_GENRES[genre]) {
    return COMMON_GENRES[genre];
  }
  
  return getTagColor(genre);
};

