import * as score from "@/utils/score";
import {
  mdiAlert,
  mdiAlertDecagram,
  mdiFireAlert,
  mdiHelpBox,
  mdiLeaf,
} from "@mdi/js";
import Icon from "@mdi/react";

type Props = {
  value: string;
};

export function riskIconPath(value: string) {
  switch (value) {
    case score.HEALTHY:
      return mdiLeaf;
    case score.CAUTION_NEEDED:
      return mdiAlert;
    case score.MODERATE_RISK:
      return mdiAlertDecagram;
    case score.HIGH_RISK:
      return mdiFireAlert;
    case score.UNKNOWN:
      return mdiHelpBox;
    default:
      return "";
  }
}
export function riskColor(value: string) {
  switch (value) {
    case score.HEALTHY:
      return "green-500";
    case score.CAUTION_NEEDED:
      return "yellow-500";
    case score.MODERATE_RISK:
      return "orange-500";
    case score.HIGH_RISK:
      return "red-500";
    default:
      return "slate-500";
  }
}

export default function Risk({ value }: Props) {
  const style = "ml-2 flex items-center space-x-2";
  const iconPath = riskIconPath(value);
  const color = riskColor(value);

  return (
    <span className={`${style} text-${color}`}>
      <Icon path={iconPath} size={0.75} />
      {value}
    </span>
  );
}
