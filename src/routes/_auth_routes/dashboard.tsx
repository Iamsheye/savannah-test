import { useState, useCallback, Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { getRecommendations } from "../../services/recommendations";
import useDebounce from "../../hook/useDebounce";
import { Recommendation } from "../../types";
import FilterBar from "../../components/dashboard/FilterBar";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import ArchiveIcon from "../../assets/archive";
import { useMenu } from "../../hook/useMenu";

export const Route = createFileRoute("/_auth_routes/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { showMenu, setShowMenu } = useMenu();

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

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
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

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  return (
    <div>
      <div>
        <div className="mb-8 flex items-center gap-4">
          <Menu className="md:hidden" onClick={() => setShowMenu(!showMenu)} />
          <div className="flex grow items-center justify-between">
            <h2 className="text-3xl font-semibold">Recommendations</h2>
            <button className="flex items-center gap-1.5 text-sm font-medium">
              <ArchiveIcon />
              <span>Archive</span>
            </button>
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
        className="recommendations-list flex h-[calc(100dvh-182px)] flex-col gap-3 overflow-y-auto md:h-[calc(100dvh-158px)]"
        onScroll={handleScroll}
      >
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading recommendations</div>}
        {!isLoading &&
          !isError &&
          data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.data.map((recommendation: Recommendation) => (
                <RecommendationCard
                  key={recommendation.recommendationId}
                  recommendation={recommendation}
                  // onClick={() => setSelectedRecommendation(recommendation)}
                />
              ))}
            </Fragment>
          ))}
        {!isLoading &&
          !isError &&
          data?.pages.reduce((acc, page) => acc + page.data.length, 0) ===
            0 && (
            <div className="mt-8 text-center">No recommendations found</div>
          )}
      </div>
    </div>
  );
}

export default Dashboard;
