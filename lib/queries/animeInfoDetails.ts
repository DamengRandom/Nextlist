import { gql } from "@apollo/client";

export const ANIME_DETAILS_QUERY = gql`
  query AnimeDetails($id: Int!, $type: MediaType) {
    Media(id: $id, type: $type) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      description(asHtml: false)
      episodes
      duration
      status
      format
      season
      seasonYear
      type
      source
      genres
      synonyms
      averageScore
      meanScore
      popularity
      favourites
      startDate { year month day }
      endDate { year month day }
      studios { edges { isMain node { id name } } }
      staff { edges { role node { id name { full native } } } }
      characters { edges { role node { id name { full native } image { large } } } }
      relations { edges { relationType node { id title { romaji english native } type } } }
      tags { id name description category rank isGeneralSpoiler isMediaSpoiler }
      siteUrl
      isAdult
      countryOfOrigin
      trailer { id site thumbnail }
      externalLinks { id site url }
    }
  }
`;