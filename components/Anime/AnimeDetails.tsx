"use client";

import { Box, Flex, Image, Text, Heading, Button } from "@chakra-ui/react";
import DOMPurify from 'dompurify';
import { AnimeProps } from "../../types/anilist";
import { GenreTags } from "../Shared/GenreTags";
import { useNavigation } from "../../hooks/useNavigation";

export default function AnimeDetails({ anime }: { anime: AnimeProps }) {
  const { navigateTo } = useNavigation();

  return (
    <Box tabIndex={0} aria-label="Anime details page" role="main">
      {anime?.bannerImage && (
        <Box
          w="full"
          position="relative"
          overflow="hidden"
          h={{ base: "600px", md: "400px" }}
          aria-label="Anime banner image"
        >
          <Image
            loading="lazy"
            src={anime.bannerImage}
            alt={
              anime?.title?.english ||
              anime?.title?.romaji ||
              "Anime banner image"
            }
            w="100%"
            height="100%"
            objectFit="cover"
            objectPosition="center"
            borderRadius="none"
            role="img"
          />
        </Box>
      )}
      <Flex justifyContent={"center"}>
        <Box maxW="1600px" w="full" borderRadius="none" p={8} aria-label="Anime details content">
          <Heading size={"md"} mb={6} as="h1">
            {anime?.title?.english || anime?.title?.romaji}
          </Heading>
          <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
            <Box flexShrink={0} minW={{ base: '100%', md: '240px' }}>
              <Image
                loading="lazy"
                src={anime?.coverImage?.extraLarge || anime?.coverImage?.large}
                alt={
                  anime?.title?.english ||
                  anime?.title?.romaji ||
                  "Anime cover image"
                }
                borderRadius="lg"
                width="100%"
                maxW="240px"
                objectFit="cover"
                role="img"
                aria-label="Anime cover image"
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" fontSize="md" mb={2} as="h2">
                {anime?.title?.english || anime?.title?.romaji} ({anime?.title?.native})
              </Text>
              <Text fontSize="md" color="gray.700" mb={4} aria-label="Anime description">
                {anime?.description?.replace(/<[^>]+>/g, '') || 'No description.'}
              </Text>
              {anime?.episodes && <Text fontSize="sm" color="gray.600" mb={1}>Episodes: {anime.episodes}</Text>}
              {anime?.duration && <Text fontSize="sm" color="gray.600" mb={1}>Duration: {anime.duration} min</Text>}
              {anime?.status && <Text fontSize="sm" color="gray.600" mb={1}>Status: {anime.status}</Text>}
              {anime?.format && <Text fontSize="sm" color="gray.600" mb={1}>Format: {anime.format}</Text>}
              {anime?.season && anime?.seasonYear && <Text fontSize="sm" color="gray.600" mb={1}>Season: {anime.season} {anime.seasonYear}</Text>}
              {anime?.type && <Text fontSize="sm" color="gray.600" mb={1}>Type: {anime.type}</Text>}
              {anime?.source && <Text fontSize="sm" color="gray.600" mb={1}>Source: {anime.source}</Text>}
              {anime?.genres && <GenreTags genres={anime.genres} />}
              {anime?.synonyms && <Text fontSize="sm" color="gray.600" mb={1}>Synonyms: {(anime.synonyms || []).join(', ')}</Text>}
              {anime?.averageScore && <Text fontSize="sm" color="gray.600" mb={1}>Average Score: {anime.averageScore}</Text>}
              {anime?.meanScore && <Text fontSize="sm" color="gray.600" mb={1}>Mean Score: {anime.meanScore}</Text>}
              {anime?.popularity && <Text fontSize="sm" color="gray.600" mb={1}>Popularity: {anime.popularity}</Text>}
              {anime?.favourites && <Text fontSize="sm" color="gray.600" mb={1}>Favourites: {anime.favourites}</Text>}
              {anime?.startDate?.year && anime?.startDate?.month && anime?.startDate?.day && <Text fontSize="sm" color="gray.600" mb={1}>Start Date: {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</Text>}
              {anime?.endDate?.year && anime?.endDate?.month && anime?.endDate?.day && <Text fontSize="sm" color="gray.600" mb={1}>End Date: {anime.endDate.year}-{anime.endDate.month}-{anime.endDate.day}</Text>}
              {anime?.studios?.edges && <Text fontSize="sm" color="gray.600" mb={1}>Studios: {anime.studios.edges.map(edge => edge.node.name).join(', ')}</Text>}
              {anime?.staff?.edges && <Text fontSize="sm" color="gray.600" mb={1}>Staff: {(anime.staff.edges || []).map(edge => edge.node.name.full).join(', ')}</Text>}
              {anime?.characters?.edges && <Text fontSize="sm" color="gray.600" mb={1}>Characters: {anime.characters.edges.map(edge => edge.node.name.full).join(', ')}</Text>}
              {anime?.relations?.edges && <Text fontSize="sm" color="gray.600" mb={1}>Relations: {anime.relations.edges.map(edge => edge.node.title.romaji).join(', ')}</Text>}
              {anime?.tags && <Text fontSize="sm" color="gray.600" mb={1}>Tags: {anime.tags.map(tag => tag.name).join(', ')}</Text>}
              {anime?.siteUrl && <Text fontSize="sm" color="gray.600" mb={1}>Site URL: <a href={DOMPurify?.sanitize(anime.siteUrl)} target="_blank" rel="noopener noreferrer" aria-label="AniList site URL">{anime.siteUrl}</a></Text>}
              {anime?.isAdult && <Text fontSize="sm" color="gray.600" mb={1}>Adult: {anime.isAdult ? 'Yes' : 'No'}</Text>}
              {anime?.countryOfOrigin && <Text fontSize="sm" color="gray.600" mb={1}>Country of Origin: {anime.countryOfOrigin}</Text>}
              {anime?.trailer && (
                <Text fontSize="sm" color="gray.600" mb={1}>
                  Trailer: <a href={DOMPurify?.sanitize(`https://www.youtube.com/watch?v=${anime.trailer.id}`)} target="_blank" rel="noopener noreferrer" aria-label="Watch trailer on YouTube">Watch</a>
                </Text>
              )}
              {anime?.externalLinks && (
                <Box fontSize="sm" color="gray.600" mb={1} aria-label="External links">
                  <Text mb={1}>External Links:</Text>
                  {anime.externalLinks.map(link => (
                    <Box key={link?.id}>
                      <a href={DOMPurify?.sanitize(link?.url)} target="_blank" rel="noopener noreferrer" aria-label={`External link to ${link?.site}`}>{link?.site}</a>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Flex>
          <Flex justifyContent={"end"}>
            <Button
              size={"sm"}
              variant={"gradient"}
              mb={4}
              onClick={() => navigateTo('/information')}
              aria-label="Back to anime list"
            >
              Back to List
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
