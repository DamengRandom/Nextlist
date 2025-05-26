import React from "react";
import { Flex, Heading, HStack, Input, Button, Text } from "@chakra-ui/react";
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
    justifyContent="space-between" 
    alignItems="center" 
    position="sticky" 
    top={0} 
    zIndex={10} 
    bg="white" 
    boxShadow="sm" 
    py={4}
  >
    <Flex justifyContent={"center"} align={"baseline"}>
      <Heading as="h2" size="md">
        {ANIME_TYPES[type as keyof typeof ANIME_TYPES]}
      </Heading>
      <Text fontSize="xs" fontStyle="italic" pl={2}>{SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]}</Text>
    </Flex>
    <HStack role="toolbar" aria-label="Search and pagination controls">
      <Flex role="search" aria-label="Search anime" alignItems="center">
        <Text id="current-page-label" pr={2}>Search Name:</Text>
        <Input
          type="text"
          placeholder="Please enter an anime name"
          size="sm"
          width="320px"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search anime by name"
          id="search-anime-input"
        />
        <Text id="current-page-label" px={2}>Search Page:</Text>
        <PositiveIntegerInput
          value={pageInput}
          onChange={setPageInput}
          maxLength={2}
          placeholder="Eg: 1"
          aria-label="Page number input"
        />
        <Button
          variant="gradient"
          colorScheme="teal"
          size="sm"
          onClick={() => {
            onSearch();
          }}
          ml={2}
          aria-label="Apply search and page"
        >
          Apply
        </Button>
      </Flex>
      <Flex alignItems="center" role="navigation" aria-label="Pagination">
        <Button 
          size="sm" 
          variant="gradient" 
          colorScheme="teal"
          onClick={onPrev} 
          isDisabled={page === 1}
          aria-label="Go to previous page"
          ml={3}
        >
          <ArrowLeftIcon aria-hidden="true" />
          <Text pl="2">Prev</Text>
        </Button>
        <Button
          ml={4}
          size="sm" 
          variant="gradient" 
          colorScheme="teal" 
          onClick={onNext} 
          isDisabled={!hasNextPage}
          aria-label="Go to next page"
        >
          <Text pr="2">Next</Text>
          <ArrowRightIcon aria-hidden="true" />
        </Button>
        <Button 
          size="sm" 
          onClick={onClear}
          ml={4}
          aria-label="Clear search and filters"
        >
          Clear
        </Button>
        <Button
          variant={"gradient"}
          size="sm"
          onClick={onBack}
          ml={4}
          aria-label="Back to home"
        >
          Back to home
        </Button>
      </Flex>
    </HStack>
  </Flex>
);

export default AnimeFilters;
