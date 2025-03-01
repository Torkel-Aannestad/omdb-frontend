import { MediaListView } from "@/components/media-list-view";
import { tmdb } from "@/tmdb/api";
import { movieCategories } from "@/tmdb/utils/categories";
import { notFound } from "next/navigation";

type CategoriesProps = {
  searchParams: Promise<{ with_genres: string; page: string }>;
};

export default async function Categories({ searchParams }: CategoriesProps) {
  const params = await searchParams;
  const { results, total_pages, page } = await tmdb.discover.movie({
    page: params.page,
    with_genres: params.with_genres,
  });

  if (!results?.length) {
    return notFound();
  }

  const categoryFound = movieCategories.find(
    (cat) => cat.id.toString() === params.with_genres
  );

  return (
    <MediaListView
      title={categoryFound ? categoryFound.name : "Categories"}
      movies={results}
      currentPage={page}
      totalPages={total_pages}
      showListOptions={true}
      showCatgeoryOptions={true}
      backButtonHref="/movies"
      backButtonText="Back to Movies"
    />
  );
}
