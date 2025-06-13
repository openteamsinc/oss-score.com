/* eslint-disable @next/next/no-img-element */
import { License } from "@/utils/scoreTypes";
import DiffDialog from "./DiffDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ExternalLink, FileText } from "lucide-react";

type Props = {
  license: License;
  sourceURL: string;
};

function LicensePath({
  path,
  sourceURL,
}: {
  path: string | null;
  sourceURL: string;
}) {
  if (!path) {
    return null;
  }
  if (sourceURL.startsWith("https://github.com")) {
    const filePath = path.startsWith("/") ? path.slice(1) : path;
    const fullPath = `${sourceURL}/blob/main/${filePath}`;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <a
              href={fullPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 underline"
            >
              <ExternalLink className="size-4 text-slate-500" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>View on GitHub</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <FileText className="size-4 text-slate-500" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{path}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default function LicenseItem({ license, sourceURL }: Props) {
  return (
    <div className="flex items-center space-x-2">
      {license.is_osi_approved && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img
                src="/OSI_Keyhole.svg"
                alt="OSI Approved"
                className="h-auto w-4"
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
        title={license.additional_text?.length ? "text added" : "modified"}
        modified={Boolean(license.modified || license.additional_text?.length)}
        diff={
          license.additional_text?.length
            ? license.additional_text
            : license.diff
        }
      />
      <LicensePath path={license.path} sourceURL={sourceURL} />
    </div>
  );
}
