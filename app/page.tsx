"use client";

import { Center, Heading, Select, Button, VStack, HStack } from "@chakra-ui/react";
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
    <Center minH="100vh">
      <VStack spacing={8} align="center">
        <Heading textAlign="center">
          Welcome to Nextlist
        </Heading>
        <HStack spacing={4}>
          <Select placeholder="Select anime type" value={type} onChange={handleTypeChange} minW={280}>
            {Object.entries(ANIME_TYPES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Select placeholder="Select anime sort method" value={sort} onChange={handleSortChange} minW={280}>
            {Object.entries(SORT_OPTIONS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Button variant="gradient" colorScheme="teal" onClick={() => navigateTo('/information')} whiteSpace="normal" minW={140} disabled={!type || !sort}>
            Search
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}
