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
      className="p-4 rounded-lg border cursor-pointer transition-all border-gray-200 hover:shadow-md bg-white">
      <div className="flex justify-between items-start gap-1">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <h3 className="text-lg font-semibold">{recommendation.title}</h3>
            <div className="flex gap-2 shrink-0">
              {recommendation.provider.map((provider) => (
                <img
                  key={provider}
                  src={CloudIcons[provider]}
                  className="object-contain h-6 w-6"
                />
              ))}
            </div>
          </div>
          <div className="text-xs font-medium flex items-center gap-1">
            Risk Score:
            <RiskScoreIndicator score={recommendation.score} />(
            {recommendation.score})
          </div>
          <p className="text-gray-600 line-clamp-3">
            {recommendation.description}
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {recommendation.frameworks.map((framework) => (
              <span
                key={framework.name}
                className="text-xs font-medium bg-gray-100 text-gray-900 px-2 py-1 rounded-md">
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
