import { License } from "@/utils/scoreTypes";
import DiffDialog from "./DiffDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { FileText } from "lucide-react";

type Props = {
  license: License;
};

export default function LicenseItem({ license }: Props) {
  return (
    <div className="flex items-center space-x-2">
      {license.is_osi_approved && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img 
                src="/OSI_Keyhole.svg" 
                alt="OSI Approved" 
                className="w-4 h-auto"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>OSI Approved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <span>{license.name || license.license}</span>
      <DiffDialog
        title={
          license.additional_text?.length ? "text added" : "modified"
        }
        modified={Boolean(
          license.modified || license.additional_text?.length,
        )}
        diff={
          license.additional_text?.length
            ? license.additional_text
            : license.diff
        }
      />
      {license.path && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FileText className="w-4 h-4 text-slate-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{license.path}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}