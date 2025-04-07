import * as score from "@/utils/score";
import { mdiCheckCircle, mdiFlask, mdiHelpBox, mdiHistory } from "@mdi/js";
import Icon from "@mdi/react";

type Props = {
  value: string;
};
export function maturityColor(value: score.MaturityValue) {
  switch (value) {
    default:
      return "slate-500";
  }
}

export function maturityIconPath(value: string): string {
  switch (value) {
    case score.MATURE:
      return mdiCheckCircle;
    case score.EXPERIMENTAL:
      return mdiFlask;
    case score.LEGACY:
      return mdiHistory;
    default:
      return mdiHelpBox;
  }
}

export default function Maturity({ value }: Props) {
  const style = "ml-2 flex items-center space-x-2 text-slate-500";
  switch (value) {
    case score.MATURE:
      return (
        <span className={`${style}`}>
          <Icon path={mdiCheckCircle} size={0.75} />
          {value}
        </span>
      );
    case score.EXPERIMENTAL:
      return (
        <span className={`${style}`}>
          <Icon path={mdiFlask} size={0.75} />
          {value}
        </span>
      );
    case score.LEGACY:
      return (
        <span className={`${style}`}>
          <Icon path={mdiHistory} size={0.75} />
          {value}
        </span>
      );
    case score.UNKNOWN:
      return (
        <span className={`${style} `}>
          <Icon path={mdiHelpBox} size={0.75} />
          {value}
        </span>
      );

    default:
      return <span>{value}</span>;
  }
}
