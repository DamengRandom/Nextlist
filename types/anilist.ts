// Anime data props definitions - start
type Title = {
  romaji: string;
  english?: string;
  native?: string;
};

type CoverImage = {
  large: string;
  medium?: string;
  color?: string;
  extraLarge?: string;
};

type DateInfo = {
  year: number;
  month: number;
  day: number;
};

type Staff = {
  edges?: {
    node: {
      name: {
        full: string;
      };
    };
  }[];
};

type Studio = {
  edges?: {
    node: {
      name: string;
    };
  }[];
};

type Character = {
  edges?: {
    node: {
      name: {
        full: string;
      };
      image: {
        large: string;
      };
    };
  }[];
};

type Relation = {
  edges?: {
    node: {
      title: Title;
      type: string;
    };
  }[];
};

type TagProps = {
  id: number;
  name: string;
  description: string;
  category: string;
  rank: number;
  isGeneralSpoiler: boolean;
  isMediaSpoiler: boolean;
}

type Trailer = {
  id: number;
  site: string;
  thumbnail: string;
}

type ExternalLink = {
  id: number;
  site: string;
  url: string;
}

interface BaseAnimeProps {
  id: number;
  title: Title;
  coverImage: CoverImage;
  description?: string;
  episodes?: number;
  siteUrl?: string;
  genres?: string[];
  averageScore?: number;
  status?: string;
  startDate?: DateInfo;
  endDate?: DateInfo;
  season?: string;
  seasonYear?: number;
}

export interface AnimeProps extends BaseAnimeProps {
  studios?: Studio;
  bannerImage?: string;
  duration?: number;
  format?: string;
  type?: string;
  meanScore?: number;
  synonyms?: string[];
  popularity?: number;
  source?: string;
  favourites?: number;
  staff?: Staff;
  characters?: Character;
  countryOfOrigin?: string;
  relations?: Relation,
  tags?: TagProps[],
  isAdult?: boolean;
  trailer?: Trailer;
  externalLinks?: ExternalLink[];
}

type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

export type AnimeModalListDataProps = WithRequired<
  Partial<BaseAnimeProps>,
  'id' | 'coverImage'
> & {
  coverImage: { large: string };
  title: { romaji?: string; english?: string };
};

// Anime basic props definitions - end

// Define the anime modal props - start
export interface AnimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  anime: AnimeModalListDataProps | null;
};

export interface AnimeModalNavProps extends AnimeModalProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  type: string;
}
// Define the anime modal props - end

// Define the anime zustand state props 
export interface StateProps {
  pageInput: string;
  searchInput: string | undefined;
  isModalOpen: boolean;
  currentIndex: number;
}

// Define the action type (using a discriminated union)
export type ActionProps =
  | { type: 'SET_PAGE_INPUT'; payload: string }
  | { type: 'SET_SEARCH_INPUT'; payload: string | undefined }
  | { type: 'SET_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'RESET_INPUTS'; payload: { page: string; search: string } };

export interface AnimeFilterProps {
  searchInput: string | undefined;
  pageInput: string;
}
