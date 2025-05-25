import { gql } from "@apollo/client";

export const GET_PAGINATED_ANIME = gql`
  query GetPaginatedAnime($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort], $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        lastPage
        hasNextPage
      }
      media(type: $type, sort: $sort, search: $search) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        description(asHtml: false)
        episodes
        status
        genres
        averageScore
        seasonYear
      }
    }
  }
`;