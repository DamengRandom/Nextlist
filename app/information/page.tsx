"use client";

import { notFound } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Box, Text, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import AnimeModal from "../../components/Anime/AnimeModal";
import { AnimeProps } from "../../types/anilist";
import { ANIME_TYPES, DEFAULT_RECORDS_SIZE, SORT_OPTIONS } from "../../constants/shared";
import { GET_PAGINATED_ANIME } from "../../lib/queries/animeInfo";
import { useAnimeStore } from '../../lib/store/animeStore';
import { animeReducer } from "../../utils/anime";
import AnimeFilters from "../../components/Anime/AnimeFilters";
import AnimeGrid from "../../components/Anime/AnimeGrid";
import { useNavigation } from "../../hooks/useNavigation";

export default function InformationPage() {
  const { navigateTo } = useNavigation();
  const { type, sort, page, searchName, setPage, setSearchName, reset } = useAnimeStore();
  console.log();
  
  const { data, loading, error } = useQuery(GET_PAGINATED_ANIME, {
    variables: { type, sort: [sort], page, perPage: DEFAULT_RECORDS_SIZE, search: searchName || undefined },
    skip: !type || !sort ||
    !Object.prototype.hasOwnProperty.call(ANIME_TYPES, type) ||
    !Object.prototype.hasOwnProperty.call(SORT_OPTIONS, sort) ||
    isNaN(page) || page < 1,
  }); // query search with parameters (type, sort, name and page)

  const initialState = {
    pageInput: page ? `${page}` : '1',
    searchInput: searchName,
    isModalOpen: false,
    currentIndex: 0,
  };
  
  const [state, dispatch] = useReducer(animeReducer, initialState); // avoid using useState for multiple times
  
  const { pageInput, searchInput, isModalOpen, currentIndex } = state;

  const setPageInput = (value: string) => dispatch({ type: 'SET_PAGE_INPUT', payload: value });

  const animeList = data?.Page?.media || [];

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH_INPUT', payload: searchName });
    dispatch({ type: 'SET_PAGE_INPUT', payload: page ? `${page}` : '1' });
  }, [searchName, page]);

  const handlePrev = () => {
    dispatch({ type: 'SET_CURRENT_INDEX', payload: Math.max(0, currentIndex - 1) });
  }
  const handleNext = () => {
    dispatch({ type: 'SET_CURRENT_INDEX', payload: Math.min(animeList.length - 1, currentIndex + 1) });
  }
  
  const handleAnimeCardClick = (anime: AnimeProps) => {
    const idx = animeList.findIndex((animeRecord: AnimeProps) => animeRecord.id === anime.id);

    dispatch({ type: 'SET_CURRENT_INDEX', payload: idx });
    dispatch({ type: 'SET_MODAL_OPEN', payload: true });
  };

  const handleAnimeModalClose = () => {
    dispatch({ type: 'SET_MODAL_OPEN', payload: false });
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  if (!type || !sort || !page || !Object.prototype.hasOwnProperty.call(ANIME_TYPES, type) || !Object.prototype.hasOwnProperty.call(SORT_OPTIONS, sort) || isNaN(page) || page < 1) notFound();

  if (loading)
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );

  if (error)
    return (
      <Center minH="60vh">
        <Text color="red.500">Failed to load the anime list data</Text>
      </Center>
    );

  return (
    <Box p={6} mx="auto">
      <AnimeFilters
        type={type}
        searchInput={searchInput || ""}
        setSearchInput={value => dispatch({ type: 'SET_SEARCH_INPUT', payload: value })}
        onSearch={() => {
          const currentPageNumber = Number(pageInput) || 1;
          
          setSearchName(searchInput || '');
          setPage(currentPageNumber);

          if (searchInput && searchInput !== searchName) { // reset to first page on new search
            setPage(1);
            dispatch({ type: 'SET_PAGE_INPUT', payload: '1' });
          }
        }}
        onClear={() => {
          dispatch({ type: 'SET_PAGE_INPUT', payload: "1" });
          dispatch({ type: 'SET_SEARCH_INPUT', payload: "" });
          setPage(1);
          setSearchName("");
          reset();
        }}
        onBack={() => {
          navigateTo('/');
        }}
        pageInput={pageInput}
        setPageInput={value => dispatch({ type: 'SET_PAGE_INPUT', payload: value })}
        onPrev={() => {
          setPageInput(`${page - 1}`);
          handlePageChange(page - 1);
        }}
        onNext={() => {
          setPageInput(`${page + 1}`);
          handlePageChange(page + 1);
        }}
        page={page}
        hasNextPage={data.Page.pageInfo.hasNextPage}
        handlePageChange={handlePageChange}
        reset={reset}
      />
      <AnimeGrid animeList={animeList} handleCardClick={handleAnimeCardClick} />
      <AnimeModal
        isOpen={isModalOpen}
        onClose={handleAnimeModalClose}
        anime={animeList[currentIndex]}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < animeList.length - 1}
        type={type}
      />
    </Box>
  );
}