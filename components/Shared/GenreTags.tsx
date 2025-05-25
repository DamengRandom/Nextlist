import React from "react";
import { HStack, Box } from "@chakra-ui/react";

interface GenreTagsProps {
  genres: string[];
  spacing?: number;
  mb?: number;
}

const colors = [
  "teal.200",
  "blue.200",
  "pink.200",
  "orange.200",
  "purple.200",
  "green.200",
  "yellow.200"
];

export const GenreTags: React.FC<GenreTagsProps> = ({ genres, spacing = 1, mb = 2 }) => (
  <HStack spacing={spacing} mb={mb} flexWrap="wrap" data-testid="genre-tags-container">
    {genres?.map((genre, idx) => (
      <Box
        key={genre}
        px={2}
        py={0.5}
        bg={colors[idx % colors.length]}
        borderRadius="md"
        fontSize="xs"
        opacity={0.8}
        data-testid="genre-tag"
      >
        {genre}
      </Box>
    ))}
  </HStack>
);