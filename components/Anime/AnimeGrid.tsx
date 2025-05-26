import React from "react";
import { Box, Image, Text, Heading, Button, HStack, Flex, SimpleGrid } from "@chakra-ui/react";
import { AnimeProps } from "../../types/anilist";
import { GenreTags } from "../Shared/GenreTags";
import StrongText from "../Shared/StrongText";

interface AnimeGridProps {
  animeList: AnimeProps[];
  handleCardClick: (anime: AnimeProps) => void;
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animeList, handleCardClick }) => (
  <Flex justifyContent="center" data-testid="anime-grid-root">
    <SimpleGrid
      maxW="1600px"
      columns={animeList?.length > 0 ? { base: 1, sm: 2, md: 3, lg: 4, xl: 6 } : { base: 1 }}
      spacing={6}
      data-testid="anime-grid"
    >
      {animeList?.length > 0 ? animeList.map((anime: AnimeProps) => (
        <Box
          key={anime.id}
          data-testid={`anime-card-${anime.id}`}
          bgGradient="linear(to-br, teal.50, blue.50)"
          borderRadius="lg"
          boxShadow="md"
          mb={6}
          display="inline-block"
          width="100%"
          style={{ breakInside: 'avoid' }}
          cursor="pointer"
          position="relative"
          transition="box-shadow 0.2s, transform 0.2s"
          _hover={{ boxShadow: "xl", transform: "translateY(-4px) scale(1.03)" }}
          role="group"
        >
          {anime?.coverImage?.large && (
            <Image
              loading="lazy"
              src={anime.coverImage.large}
              alt={`Cover image for ${anime?.title?.english || anime?.title?.romaji}`}
              borderRadius="md"
              mb={0}
              w="100%"
              h="100%"
              objectFit="cover"
              data-testid={`anime-image-${anime.id}`}
            />
          )}
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="rgba(255,255,255,0.85)"
            opacity={0}
            transition="opacity 0.2s"
            _groupHover={{ opacity: 1 }}
            p={4}
            zIndex={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="stretch"
            boxShadow="lg"
          >
            <Heading size="sm" mb={2} data-testid={`anime-title-${anime.id}`}>{anime?.title?.english || anime?.title?.romaji}</Heading>
            <Box />
            <Box pb={4}>
              <Text fontSize="sm" mb={1} data-testid={`anime-episodes-${anime.id}`}>Episodes: {anime?.episodes ?? 'N/A'}</Text>
              <Text fontSize="sm" mb={1} data-testid={`anime-status-${anime.id}`}>Status: {anime?.status ?? 'N/A'}</Text>
              <HStack spacing={1} mb={2} flexWrap="wrap">
                <GenreTags genres={anime?.genres || []} />
              </HStack>
              <Button
                variant="gradient"
                colorScheme="teal"
                mt={8}
                size="sm"
                alignSelf="flex-end"
                onClick={() => handleCardClick(anime)}
                data-testid={`anime-viewmore-${anime.id}`}
                aria-label={`View more details about ${anime?.title?.english || anime?.title?.romaji}`}
              >
                View More
              </Button>
            </Box>
          </Box>
        </Box>
      )) : (
        <Box minW="100%" minH="100%" data-testid="anime-empty-state">
          <Heading size="md" color="gray.500">No anime found</Heading>
          <Text>Please click <StrongText>clear</StrongText> button to go back to the first page</Text>
        </Box>
      )}
    </SimpleGrid>
  </Flex>
);

export default AnimeGrid;