import { ActionProps, AnimeFilterProps, StateProps } from "../types/anilist";

export function animeReducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case 'SET_PAGE_INPUT':
      return { ...state, pageInput: action.payload };
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload };
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'SET_CURRENT_INDEX':
      return { ...state, currentIndex: action.payload };
    case 'RESET_INPUTS':
      return {
        ...state,
        pageInput: "1",
        searchInput: "",
      };
    default:
      return state;
  }
}

export const validateForm = (inputs: AnimeFilterProps) => {
  const newErrors: AnimeFilterProps = {
    searchInput: '',
    pageInput: ''
  };
  
  if (!inputs?.searchInput?.trim()) {
    newErrors.searchInput = 'Anime name is required';
  } else if (inputs?.searchInput?.length > 200) {
    newErrors.searchInput = 'Anime name must be no more than 200 characters';
  }
  
  if (!inputs.pageInput.trim()) {
    newErrors.pageInput = 'Page number is required';
  } else if (inputs.pageInput.length > 3000) {
    newErrors.pageInput = 'Please enter a valid page number (less than 3000)';
  }

  return Object.values(newErrors).every(error => error === '');
};