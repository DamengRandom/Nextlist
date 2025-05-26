import React from "react";
import { Flex, Heading, HStack, Input, Button, Text, FormLabel } from "@chakra-ui/react";
import PositiveIntegerInput from "../Shared/PositiveIntegerInput";
import { ANIME_TYPES, SORT_OPTIONS } from "../../constants/shared";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface AnimeFiltersProps {
  type: string;
  sort: string;
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onBack: () => void;
  pageInput: string;
  setPageInput: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  page: number;
  hasNextPage: boolean;
  handlePageChange: (page: number) => void;
  reset: () => void;
}

const AnimeFilters: React.FC<AnimeFiltersProps> = ({
  type,
  sort,
  searchInput,
  setSearchInput,
  onSearch,
  onClear,
  onBack,
  pageInput,
  setPageInput,
  onPrev,
  onNext,
  page,
  hasNextPage
}) => (
  <Flex
    as="section"
    aria-label="Anime filters and pagination"
    mb={8}
    justifyContent={{ base: "center", md: "flex-start", lg: "space-between" }}
    alignItems={{ base: "stretch", md: "stretch", lg: "center" }}
    direction={{ base: "column", md: "column", lg: "row" }}
    position={{ base: 'static', md: 'sticky' }}
    top={0}
    zIndex={10}
    bg="white"
    boxShadow="sm"
    py={4}
    gap={{ base: 4, md: 4, lg: 0 }}
  >
    <Flex
      justifyContent={{ base: "center", md: "flex-end" }}
      align={{ base: "center", md: "flex-end" }}
      mb={{ base: 2, md: 4, lg: 0 }}
      width={{ base: "100%", md: "100%", lg: "auto" }}
    >
      <Heading as="h2" size="md">
        {ANIME_TYPES[type as keyof typeof ANIME_TYPES]}
      </Heading>
      <Text fontSize="xs" fontStyle="italic" pl={2}>{SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]}</Text>
    </Flex>
    <HStack
      role="toolbar"
      aria-label="Search and pagination controls"
      flexWrap="wrap"
      spacing={{ base: 2, md: 4 }}
      justifyContent={{ base: "center", md: "flex-end" }}
      alignItems={{ base: "stretch", md: "center" }}
      width={{ base: "100%", md: "100%", lg: "auto" }}
    >
      <Flex
        role="search"
        aria-label="Search anime"
        alignItems={{ base: "stretch", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 0 }}
        width={{ base: "100%", md: "auto" }}
      >
        <FormLabel id="current-page-label" pr={{ base: 0, md: 1 }} mb={{ base: 1, md: 0 }} width={{ base: "100%", md: "auto" }} htmlFor="search-anime-name-input">Search Name:</FormLabel>
        <Input
          type="text"
          placeholder="Please enter an anime name"
          size="sm"
          width={{ base: "100%", md: "320px" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search anime by name"
          id="search-anime-name-input"
          mb={{ base: 2, md: 0 }}
        />
        <FormLabel id="current-page-label" px={{ base: 0, md: 1 }} mb={{ base: 1, md: 0 }} width={{ base: "100%", md: "auto" }} htmlFor="search-anime-page-input">Search Page:</FormLabel>
        <PositiveIntegerInput
          id="search-anime-page-input"
          value={pageInput}
          onChange={setPageInput}
          maxLength={2}
          placeholder="Eg: 1"
          aria-label="Page number input"
          width={{ base: "100%", md: "80px" }}
        />
        <Button
          variant="gradient"
          colorScheme="teal"
          size="sm"
          onClick={() => {
            onSearch();
          }}
          ml={{ base: 0, md: 2 }}
          mt={{ base: 2, md: 0 }}
          aria-label="Apply search and page"
          width={{ base: "100%", md: "auto" }}
        >
          Apply
        </Button>
      </Flex>
      <Flex
        alignItems={{ base: "stretch", md: "center" }}
        direction={{ base: "column", md: "row" }}
        role="navigation"
        aria-label="Pagination actions"
        gap={{ base: 2, md: 0 }}
        width={{ base: "100%", md: "auto" }}
      >
        <Button
          size="sm"
          variant="gradient"
          colorScheme="teal"
          onClick={onPrev}
          isDisabled={page === 1}
          aria-label="Go to previous page"
          ml={{ base: 0, md: 3 }}
          width={{ base: "100%", md: "auto" }}
        >
          <ArrowLeftIcon aria-hidden="true" />
          <Text pl="2">Prev</Text>
        </Button>
        <Button
          ml={{ base: 0, md: 4 }}
          size="sm"
          variant="gradient"
          colorScheme="teal"
          onClick={onNext}
          isDisabled={!hasNextPage}
          aria-label="Go to next page"
          width={{ base: "100%", md: "auto" }}
        >
          <Text pr="2">Next</Text>
          <ArrowRightIcon aria-hidden="true" />
        </Button>
        <Button
          size="sm"
          onClick={onClear}
          ml={{ base: 0, md: 4 }}
          aria-label="Clear search and filters"
          width={{ base: "100%", md: "auto" }}
        >
          Clear
        </Button>
        <Button
          variant={"gradient"}
          size="sm"
          onClick={onBack}
          ml={{ base: 0, md: 4 }}
          aria-label="Back to home"
          width={{ base: "100%", md: "auto" }}
        >
          Back to home
        </Button>
      </Flex>
    </HStack>
  </Flex>
);

export default AnimeFilters;
