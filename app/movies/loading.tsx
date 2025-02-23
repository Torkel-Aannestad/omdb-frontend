import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="space-y-8">
      <Skeleton className="h-[60vh] min-h-[560px] rounded-md" />
      <Skeleton className="h-8 w-64" />
      <div className="flex flex-wrap">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="basis-1/2 rounded-md pb-4 pr-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <Skeleton className="aspect-poster w-full" />
          </div>
        ))}
      </div>
    </Container>
  );
}
