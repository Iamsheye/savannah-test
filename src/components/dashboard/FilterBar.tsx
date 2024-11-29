import { useState } from "react";
import Accordion from "./Accordion";

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

  const toggleFilter = (
    type: "providers" | "frameworks" | "classes" | "reasons",
    value: string
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
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search recommendations..."
            className="w-64 px-2.5 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <div className="relative">
            <button
              className="px-2.5 py-1.5 border rounded-lg hover:bg-white text-sm font-medium"
              onClick={() => setIsFilterOpen(!isFilterOpen)}>
              Filters{" "}
              {filters.providers.length +
                filters.frameworks.length +
                filters.classes.length +
                filters.reasons.length >
                0 &&
                `(${filters.providers.length + filters.frameworks.length + filters.classes.length + filters.reasons.length})`}
            </button>

            {isFilterOpen && (
              <div className="mt-2 p-1.5 border rounded-lg bg-gray-50 overflow-y-auto absolute top-full left-0 w-80 z-10 h-auto max-h-96">
                <Accordion
                  items={[
                    {
                      title: "Cloud Providers",
                      children: (
                        <>
                          {availableTags?.providers.map((provider) => (
                            <label
                              key={provider}
                              className="flex items-center gap-2 mb-2 capitalize text-sm">
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
                              className="flex items-center gap-2 mb-2 text-sm">
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
                              className="flex items-center gap-2 mb-2 text-sm">
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
                              className="flex items-center gap-2 mb-2 text-sm">
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

        <p className="text-medium text-gray-600 text-sm">
          Showing {showing} of {total} results
        </p>
      </div>
    </div>
  );
}

export default FilterBar;
