import { CastCarousel } from "@/components/cast-carousel";
import { ReviewsView } from "@/components/reviews-view";
import { VideoImageCarousel } from "@/components/video-image-view";
import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { MediaImages } from "@/components/media-image";
import { SerieRecommendedCarousel } from "@/components/serie-recommened-carousel";
import { SerieLastSeason } from "@/components/serie-last-season";

type DetailProps = {
  params: Promise<{ serieid: string }>;
};
export default async function Details({ params }: DetailProps) {
  const { serieid } = await params;

  const {
    name,
    overview,
    genres,
    vote_average,
    backdrop_path,
    poster_path,
    tagline,
    first_air_date,
    seasons,
    last_episode_to_air,
  } = await tmdb.series.details({
    id: serieid,
  });

  const { crew } = await tmdb.series.credits({
    id: serieid,
  });
  const director = crew.find((crew) => crew.job === "Director");

  const { cast } = await tmdb.series.credits({
    id: serieid,
  });

  const { results } = await tmdb.series.reviews({
    id: serieid,
  });
  const review = results[0];
  const numberOfReviews = results.length;

  const videos = (await tmdb.series.videos({ id: serieid })).results;

  const { posters, backdrops } = await tmdb.series.images({
    id: serieid,
  });

  const recommendedMoviesSliced = (
    await tmdb.series.recommendations({ id: serieid })
  ).results.slice(0, 20);

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaImages.Backdrop alt={name} image={backdrop_path} priority />
        <div className="overlay-top" />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaImages.Poster
            image={poster_path}
            alt={name}
            size="w780"
            priority
          />
        </MediaDetailView.Poster>
        <div className="space-y-4">
          <MediaDetailView.Title>
            {name}{" "}
            <span className="font-light text-muted-foreground">
              ({format.year(format.date(first_air_date))})
            </span>
          </MediaDetailView.Title>
          <MediaDetailView.Genres>
            <MediaDetailView.Rating>
              {vote_average
                ? `${(vote_average * 10).toFixed(0)}% User Rating`
                : "N/A"}
            </MediaDetailView.Rating>
          </MediaDetailView.Genres>
          <MediaDetailView.Genres>
            {genres?.map((genre) => (
              <MediaDetailView.Genre key={genre.id}>
                {genre.name}
              </MediaDetailView.Genre>
            ))}
          </MediaDetailView.Genres>

          {tagline && (
            <MediaDetailView.Overview>
              &quot;{tagline}&quot;
            </MediaDetailView.Overview>
          )}
          <MediaDetailView.Overview>{overview}</MediaDetailView.Overview>
          <MediaDetailView.Overview>
            {director && (
              <span className="flex flex-col ">
                <span className="font-bold">{director.name}</span>
                <span>{director.job}</span>
              </span>
            )}
          </MediaDetailView.Overview>
          <MediaDetailView.ContentSpacer>
            <MediaTrailerDialog videos={videos} />
          </MediaDetailView.ContentSpacer>
        </div>
      </MediaDetailView.Hero>
      <MediaDetailView.Content>
        <CastCarousel
          title={"Cast"}
          items={cast}
          link={`/series/${serieid}/credits`}
          linkTitle="View Cast & Crew"
        />
        <SerieLastSeason
          id={serieid}
          lastEpisode={last_episode_to_air}
          title={"Last Season"}
          seasonScore={
            seasons[last_episode_to_air.season_number - 1].vote_average
          }
          link={`/series/${serieid}/seasons`}
          linkTitle={""}
        />

        {numberOfReviews > 0 && (
          <ReviewsView.Single
            title="Reviews"
            review={review}
            numberOfReviews={numberOfReviews}
            link={`/series/${serieid}/reviews`}
            linkTitle="All Reviews"
          />
        )}
        <VideoImageCarousel
          title="Media"
          videos={videos}
          posters={posters}
          backdrops={backdrops}
          link={`/series/${serieid}/media/posters`}
          linkTitle="View All Media"
        />

        <SerieRecommendedCarousel
          title={"Recommended"}
          items={recommendedMoviesSliced}
          link={`/series/${serieid}/recommended`}
          linkTitle="View All Recommended"
        />
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
