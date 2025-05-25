import React from "react";
import { Flex, Heading, HStack, Input, Button, Text } from "@chakra-ui/react";
import PositiveIntegerInput from "../Shared/PositiveIntegerInput";
import { ANIME_TYPES } from "../../constants/shared";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface AnimeFiltersProps {
  type: string;
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
    <Heading as="h2" size="md">
      {ANIME_TYPES[type as keyof typeof ANIME_TYPES]} List
    </Heading>
    <HStack role="toolbar" aria-label="Search and pagination controls">
      <Flex role="search" aria-label="Search anime" alignItems="center">
        <Text id="current-page-label" pr={4}>Search Name:</Text>
        <Input
          type="text"
          placeholder="Search by name"
          size="sm"
          width="320px"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search anime by name"
          id="search-anime-input"
        />
        <Text id="current-page-label" px={4}>Search Page:</Text>
        <PositiveIntegerInput
          value={pageInput}
          onChange={setPageInput}
          maxLength={4}
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
          ml={4}
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
          ml={6}
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
          ml={8}
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
