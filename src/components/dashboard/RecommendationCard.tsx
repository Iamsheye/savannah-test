// import ArchiveIcon from "../../assets/archive";
import { Recommendation } from "../../types";
import { CloudIcons } from "../../utils";
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
      <div className="flex items-start justify-between gap-1">
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
          <div className="flex items-center gap-1 text-xs font-medium">
            Risk Score:
            <RiskScoreIndicator score={recommendation.score} />(
            {recommendation.score})
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
      </div>
    </div>
  );
}

export default RecommendationCard;
