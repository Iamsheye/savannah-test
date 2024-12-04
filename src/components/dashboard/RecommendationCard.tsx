// import ArchiveIcon from "../../assets/archive";
import { Recommendation } from "@/types";
import { CloudIcons } from "@/utils";
import RiskScoreIndicator from "./RiskIndicator";

interface Props {
  recommendation: Recommendation;
  // onClick: () => void;
}

function RecommendationCard({ recommendation }: Props) {
  return (
    <div
      // onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
    >
      <div className="flex flex-wrap justify-between gap-4 lg:flex-nowrap">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <h3 className="text-lg font-semibold">{recommendation.title}</h3>
            <div className="flex shrink-0 gap-2">
              {recommendation.provider.map((provider) => (
                <img
                  key={provider}
                  src={CloudIcons[provider]}
                  className="h-6 w-6 object-contain"
                />
              ))}
            </div>
          </div>
          <p className="line-clamp-3 text-gray-600">
            {recommendation.description}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {recommendation.frameworks.map((framework) => (
              <span
                key={framework.name}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-900"
              >
                {framework.name}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 grow rounded-md bg-gray-100 p-3 text-center">
          <p className="text-sm font-medium">Impact assessment</p>
          <p className="text-xs font-medium text-gray-500">
            ~{recommendation.impactAssessment.totalViolations} violations /
            month
          </p>
          <hr className="my-3 border-gray-300" />
          <div className="flex items-center justify-center gap-1 text-xs font-medium">
            Risk Score:
            <RiskScoreIndicator score={recommendation.score} />(
            {recommendation.score})
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
