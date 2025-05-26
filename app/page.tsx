"use client";

import { Center, Heading, Select, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { ANIME_TYPES, SORT_OPTIONS } from "../constants/shared";
import { useAnimeStore } from "../lib/store/animeStore";
import { useNavigation } from "../hooks/useNavigation";

export default function HomePage() {
  const { type, sort, setType, setSort } = useAnimeStore();
  const { navigateTo } = useNavigation();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  }

  return (
    <Center minH="calc(100vh - 125px)">
      <VStack spacing={8} align="center" px={{ base: 2, md: 2, lg: 0 }}>
        <Heading textAlign="center">
          Welcome to Nextlist
        </Heading>
        <Text>Please select the anime type and sorting method to start exploring ~</Text>
        <HStack spacing={{ base: 3, md: 4, lg: 6 }} width={{ base: "100%", md: "100%", lg: "auto" }} flexDirection={{ base: "column", md: "column", lg: "row" }} align="stretch">
          <Select
            placeholder="Select anime type"
            value={type}
            onChange={handleTypeChange}
            minW={280}
            width={{ base: "100%", md: "100%", lg: "auto" }}
          >
            {Object.entries(ANIME_TYPES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Select
            placeholder="Select anime sort method"
            value={sort}
            onChange={handleSortChange}
            minW={280}
            width={{ base: "100%", md: "100%", lg: "auto" }}
          >
            {Object.entries(SORT_OPTIONS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Button
            variant="gradient"
            colorScheme="teal"
            onClick={() => navigateTo('/information')}
            whiteSpace="normal"
            minW={140}
            width={{ base: "100%", md: "100%", lg: "auto" }}
            disabled={!type || !sort}
          >
            Search
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}
