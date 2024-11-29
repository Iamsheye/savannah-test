import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar";

describe("FilterBar", () => {
  const defaultProps = {
    total: 50,
    showing: 10,
    search: "",
    onSearchChange: vi.fn(),
    availableTags: {
      frameworks: [
        "AWS Well-Architected",
        "Azure Security Benchmark",
        "CIS GCP",
        "CIS AWS Foundations",
        "ISO 27001",
        "PCI DSS",
        "OWASP Top 10",
        "NIST 800-53",
        "HIPAA",
        "SOC 2",
        "CIS Azure",
        "GDPR",
      ],
      reasons: [
        "Enhances data protection security",
        "Reduces security risks",
        "Ensures compliance requirements",
        "Enhances network security security",
        "Enhances authentication security",
        "Enhances vulnerability management security",
        "Enhances identity management security",
        "Enhances compliance security",
        "Enhances encryption security",
        "Enhances access control security",
        "Enhances configuration management security",
        "Enhances monitoring security",
      ],
      providers: ["UNSPECIFIED", "AWS", "AZURE"],
      classes: [
        "UNSPECIFIED_RECOMMENDATION",
        "COMPUTE_RECOMMENDATION",
        "NETWORKING_RECOMMENDATION",
        "DATA_PROTECTION_RECOMMENDATION",
        "APPLICATION_RECOMMENDATION",
        "AUTHENTICATION_RECOMMENDATION",
        "COMPLIANCE_RECOMMENDATION",
      ],
    },
    filters: {
      providers: [],
      frameworks: [],
      classes: [],
      reasons: [],
    },
    onFiltersChange: vi.fn(),
  };

  it("renders correctly", () => {
    render(<FilterBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search recommendations..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Showing ${defaultProps.showing} of ${defaultProps.total} results`,
      ),
    ).toBeInTheDocument();
  });

  it("calls onSearchChange when search input changes", () => {
    render(<FilterBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(
      "Search recommendations...",
    );
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("test");
  });

  it("toggles filter dropdown", () => {
    render(<FilterBar {...defaultProps} />);

    const filterButton = screen.getByText("Filters");

    fireEvent.click(filterButton);
    expect(screen.getByText("Cloud Providers")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("Classes")).toBeInTheDocument();
    expect(screen.getByText("Reasons")).toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.queryByText("Cloud Providers")).not.toBeInTheDocument();
    expect(screen.queryByText("Frameworks")).not.toBeInTheDocument();
    expect(screen.queryByText("Classes")).not.toBeInTheDocument();
    expect(screen.queryByText("Reasons")).not.toBeInTheDocument();
  });

  it("calls onFiltersChange when a filter is toggled", () => {
    render(<FilterBar {...defaultProps} />);
    const filterButton = screen.getByText("Filters");
    fireEvent.click(filterButton);
    const awsCheckbox = screen.getByLabelText("aws");
    fireEvent.click(awsCheckbox);

    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({
      ...defaultProps.filters,
      providers: ["AWS"],
    });
  });

  it("removes filter", () => {
    const newProps = {
      ...defaultProps,
      filters: {
        providers: ["AWS"],
        frameworks: [],
        classes: [],
        reasons: [],
      },
    };

    render(<FilterBar {...newProps} />);

    const filterButton = screen.getByText("Filters (1)");
    fireEvent.click(filterButton);

    const awsCheckbox = screen.getByLabelText("aws");
    fireEvent.click(awsCheckbox);

    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({
      ...defaultProps.filters,
      providers: [],
    });
  });
});
