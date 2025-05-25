import { notFound } from "next/navigation";
import client from "../../../../lib/apolloClient";
import { ANIME_DETAILS_QUERY } from "../../../../lib/queries/animeInfoDetails";
import AnimeDetails from "../../../../components/Anime/AnimeDetails";

interface PageProps {
  params: {
    type: string;
    id: string;
  };
}

export default async function AnimeDetailsPage({ params }: PageProps) {
  const { type, id } = params;
  const idNumber = Number(id);

  if (isNaN(idNumber)) return notFound();

  let anime;

  try {
    const { data } = await client.query({
      query: ANIME_DETAILS_QUERY,
      variables: { id, type },
      fetchPolicy: "no-cache",
    });

    anime = data.Media;
  } catch {
    return notFound();
  }

  if (!anime) return notFound();

  return <AnimeDetails anime={anime} />;
}
