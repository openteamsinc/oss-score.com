import {
  mdiHelpRhombusOutline,
  mdiLanguageJavascript,
  mdiLanguagePython,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { SiAnaconda } from "react-icons/si";

function EIcon({
  ecosystem,
  className,
}: {
  ecosystem: string;
  className?: string;
}) {
  switch (ecosystem) {
    case "pypi":
      return (
        <Icon
          path={mdiLanguagePython}
          className={`text-[#006DAD] ${className}`}
        />
      );
    case "npm":
      return (
        <Icon
          path={mdiLanguageJavascript}
          className={`text-[#F0DB4F] ${className}`}
        />
      );
    case "conda":
      return (
        <SiAnaconda className={`text-green-500 ${className}`} color="#43B02A" />
      );
    default:
      return <Icon path={mdiHelpRhombusOutline} className={className} />;
  }
}

export default function EcosystemIcon({
  ecosystem,
  className,
  tooltip = true,
}: {
  ecosystem: string;
  className?: string;
  tooltip?: boolean;
}) {
  if (!tooltip) {
    return <EIcon ecosystem={ecosystem} className={className} />;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <EIcon ecosystem={ecosystem} className={className} />
        </TooltipTrigger>
        <TooltipContent>{ecosystem}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
