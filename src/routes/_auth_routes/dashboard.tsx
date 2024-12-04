import { useState, Fragment, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Menu } from "lucide-react";
import { getRecommendations } from "@/services/recommendations";
import useDebounce from "@/hook/useDebounce";
import { Recommendation } from "@/types";
import FilterBar from "@/components/dashboard/FilterBar";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import ArchiveIcon from "@/assets/archive";
import useStore from "@/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth_routes/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { showMenu, setShowMenu } = useStore.getState();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    providers: string[];
    frameworks: string[];
    classes: string[];
    reasons: string[];
  }>({
    providers: [],
    frameworks: [],
    classes: [],
    reasons: [],
  });
  // const [selectedRecommendation, setSelectedRecommendation] =
  //   useState<Recommendation | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommendations", debouncedSearch, filters],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
      await getRecommendations({
        cursor: pageParam,
        limit: 10,
        search: debouncedSearch,
        tags: [
          ...filters.providers,
          ...filters.frameworks,
          ...filters.classes,
          ...filters.reasons,
        ].join(","),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.cursor.next || undefined,
  });

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <div>
        <div className="mb-8 flex items-center gap-4">
          <Menu className="md:hidden" onClick={() => setShowMenu(!showMenu)} />
          <div className="flex grow items-center justify-between">
            <h2 className="text-3xl font-semibold text-teal-600">
              Recommendations
            </h2>
            <Button variant="ghost">
              <ArchiveIcon />
              Archive
            </Button>
          </div>
        </div>

        <FilterBar
          showing={
            data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0
          }
          total={data?.pages[0].pagination.totalItems || 0}
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={data?.pages[0].availableTags}
        />
      </div>

      <div
        data-testid="recommendations-list"
        className="recommendations-list relative flex h-[calc(100dvh-182px)] flex-col gap-3 overflow-y-auto md:h-[calc(100dvh-158px)]"
      >
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading recommendations</div>}
        {!isLoading &&
          !isError &&
          data?.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.map((recommendation: Recommendation, index) =>
                index === page.data.length - 1 ? (
                  <div ref={ref} key={recommendation.recommendationId}>
                    <RecommendationCard
                      key={recommendation.recommendationId}
                      recommendation={recommendation}
                    />
                  </div>
                ) : (
                  <RecommendationCard
                    key={recommendation.recommendationId}
                    recommendation={recommendation}
                  />
                ),
              )}
            </Fragment>
          ))}
        {!isLoading &&
          !isError &&
          data?.pages.reduce((acc, page) => acc + page.data.length, 0) ===
            0 && (
            <div className="mt-8 text-center">No recommendations found</div>
          )}
        {isFetchingNextPage && (
          <div className="relative bottom-5 flex justify-center bg-transparent py-1">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-400 border-t-teal-100"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
