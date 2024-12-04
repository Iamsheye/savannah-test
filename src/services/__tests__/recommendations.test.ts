// recommendations.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRecommendations } from "../recommendations";
import api from "../api";

// Mock API
vi.mock("../api", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getRecommendations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it("should fetch recommendations successfully", async () => {
  //   const mockResponse = {
  //     data: {
  //       data: [
  //         {
  //           recommendationId: "1",
  //           title: "Test Recommendation",
  //           description: "Test Description",
  //           impact: "HIGH",
  //           effort: "LOW",
  //           risk: 75,
  //         },
  //       ],
  //       pagination: {
  //         cursor: {
  //           next: "next-cursor",
  //           previous: null,
  //         },
  //         totalItems: 1,
  //       },
  //       availableTags: {
  //         providers: ["AWS"],
  //         frameworks: ["HIPAA"],
  //         classes: ["SECURITY"],
  //         reasons: ["Cost Optimization"],
  //       },
  //     },
  //   };

  //   vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

  //   const result = await getRecommendations({});

  //   expect(api.get).toHaveBeenCalledWith("/recommendations", {
  //     params: { limit: 10 },
  //   });
  //   expect(result).toEqual(mockResponse.data);
  // });

  it("should handle pagination parameters", async () => {
    const mockResponse = { data: { data: [], pagination: { cursor: {} } } };
    vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

    await getRecommendations({ cursor: "next-page", limit: 20 });

    expect(api.get).toHaveBeenCalledWith("/recommendations", {
      params: { cursor: "next-page", limit: 20 },
    });
  });

  // it("should handle search parameter", async () => {
  //   const mockResponse = { data: { data: [], pagination: { cursor: {} } } };
  //   vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

  //   await getRecommendations({ search: "test query" });

  //   expect(api.get).toHaveBeenCalledWith("/recommendations", {
  //     params: { search: "test query", limit: 10 },
  //   });
  // });

  // it("should handle tags parameter", async () => {
  //   const mockResponse = { data: { data: [], pagination: { cursor: {} } } };
  //   vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

  //   await getRecommendations({ tags: "AWS,HIPAA" });

  //   expect(api.get).toHaveBeenCalledWith("/recommendations", {
  //     params: { tags: "AWS,HIPAA", limit: 10 },
  //   });
  // });

  it("should handle API errors", async () => {
    const mockError = new Error("API Error");
    vi.mocked(api.get).mockRejectedValueOnce(mockError);

    await expect(getRecommendations({})).rejects.toThrow("API Error");
  });

  it("should combine multiple parameters", async () => {
    const mockResponse = { data: { data: [], pagination: { cursor: {} } } };
    vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

    await getRecommendations({
      cursor: "next-page",
      limit: 20,
      search: "test",
      tags: "AWS",
    });

    expect(api.get).toHaveBeenCalledWith("/recommendations", {
      params: {
        cursor: "next-page",
        limit: 20,
        search: "test",
        tags: "AWS",
      },
    });
  });
});
