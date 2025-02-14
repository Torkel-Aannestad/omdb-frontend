import Link from "next/link";
import { Cast } from "@/tmdb/models";

import { MediaCard } from "@/components/media-card";
import { MediaImages } from "./media-image";
// add tooltip for title and character
export function CastCard({ id, name, profile_path, character }: Cast) {
  return (
    <Link href={`/person/${id}`} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster image={profile_path} alt={name} />
        <MediaCard.Content>
          <MediaCard.Title>{name}</MediaCard.Title>
          <MediaCard.Excerpt>{character}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
}
