import { useState } from "react";
import Accordion from "./Accordion";
import { useOutsideClick } from "@/hook/useOutsideClick";
import { Input } from "../ui/input";

interface FilterBarProps {
  total: number;
  showing: number;
  search: string;
  onSearchChange: (value: string) => void;
  availableTags?: {
    frameworks: string[];
    providers: string[];
    reasons: string[];
    classes: string[];
  };
  filters: {
    providers: string[];
    frameworks: string[];
    classes: string[];
    reasons: string[];
  };
  onFiltersChange: (filters: {
    providers: string[];
    frameworks: string[];
    classes: string[];
    reasons: string[];
  }) => void;
}

function FilterBar({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  total,
  showing,
  availableTags,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const ref = useOutsideClick(() => setIsFilterOpen(false));

  const toggleFilter = (
    type: "providers" | "frameworks" | "classes" | "reasons",
    value: string,
  ) => {
    const currentFilters = filters[type];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    onFiltersChange({
      ...filters,
      [type]: newFilters,
    });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            className="w-64"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recommendations..."
          />

          <div className="relative">
            <button
              className="rounded-lg border-[1.5px] border-teal-600 bg-teal-600 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-white hover:text-teal-600"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filters{" "}
              {filters.providers.length +
                filters.frameworks.length +
                filters.classes.length +
                filters.reasons.length >
                0 &&
                `(${filters.providers.length + filters.frameworks.length + filters.classes.length + filters.reasons.length})`}
            </button>

            {isFilterOpen && (
              <div
                ref={ref}
                className="absolute right-0 top-full z-10 mt-2 h-auto max-h-96 w-80 overflow-y-auto rounded-lg border bg-gray-50 p-1.5 md:left-0"
              >
                <Accordion
                  items={[
                    {
                      title: "Cloud Providers",
                      children: (
                        <>
                          {availableTags?.providers.map((provider) => (
                            <label
                              key={provider}
                              className="mb-2 flex items-center gap-2 text-sm capitalize"
                            >
                              <input
                                type="checkbox"
                                checked={filters.providers.includes(provider)}
                                onChange={() =>
                                  toggleFilter("providers", provider)
                                }
                              />
                              {provider.toLowerCase()}
                            </label>
                          ))}
                        </>
                      ),
                    },
                    {
                      title: "Frameworks",
                      children: (
                        <>
                          {availableTags?.frameworks.map((framework) => (
                            <label
                              key={framework}
                              className="mb-2 flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={filters.frameworks.includes(framework)}
                                onChange={() =>
                                  toggleFilter("frameworks", framework)
                                }
                              />
                              {framework}
                            </label>
                          ))}
                        </>
                      ),
                    },

                    {
                      title: "Classes",
                      children: (
                        <>
                          {availableTags?.classes.map((class_) => (
                            <label
                              key={class_}
                              className="mb-2 flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={filters.classes.includes(class_)}
                                onChange={() => toggleFilter("classes", class_)}
                              />
                              {class_}
                            </label>
                          ))}
                        </>
                      ),
                    },
                    {
                      title: "Reasons",
                      children: (
                        <>
                          {availableTags?.reasons.map((reason) => (
                            <label
                              key={reason}
                              className="mb-2 flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={filters.reasons.includes(reason)}
                                onChange={() => toggleFilter("reasons", reason)}
                              />
                              {reason}
                            </label>
                          ))}
                        </>
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>

        <p className="text-medium text-sm text-gray-600">
          Showing {showing} of {total} results
        </p>
      </div>
    </div>
  );
}

export default FilterBar;
