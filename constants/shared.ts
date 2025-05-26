export const ANIME_TYPES = {
  "ANIME": "Anime",
  "MANGA": "Manga"
} as const;

export const SORT_OPTIONS = {
  "POPULARITY_DESC": "Popularity (High to Low)",
  "POPULARITY": "Popularity (Low to High)",
  "SCORE_DESC": "Score (High to Low)",
  "SCORE": "Score (Low to High)",
  "TRENDING_DESC": "Trending (High to Low)",
  "TRENDING": "Trending (Low to High)",
  "UPDATED_AT_DESC": "Recently Updated",
  "UPDATED_AT": "Oldest Updated",
  "START_DATE_DESC": "Start Date (Newest)",
  "START_DATE": "Start Date (Oldest)",
  "END_DATE_DESC": "End Date (Newest)",
  "END_DATE": "End Date (Oldest)"
} as const;

export const DEFAULT_RECORDS_SIZE = 36; // determine how many data records shown in the information anime list page
