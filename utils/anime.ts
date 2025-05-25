import { ActionProps, StateProps } from "../types/anilist";

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
