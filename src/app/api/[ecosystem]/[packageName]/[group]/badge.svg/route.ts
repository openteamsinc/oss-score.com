import generateBadgeSVG from "@/utils/badge/generateBadgeSVG";
import { fetchPackageScore } from "@/utils/score_res";
import { Score } from "@/utils/scoreTypes";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    ecosystem: string;
    packageName: string;
    group: string;
  }>;
};

function getValue(score: Score, group: string): string | null {
  // Check if the group exists in the score object
  if (group in score) {
    // @ts-expect-error we will check this via the null
    return score[group].value || null;
  }
  return null;
}
export async function GET(request: NextRequest, { params }: Params) {
  const { searchParams } = new URL(request.url);
  const { ecosystem, packageName, group } = await params;

  console.log({ ecosystem, packageName, group });
  // console.log({ request });

  const {
    // package: pkg,
    status,
    score,
    // source,
    // errorMessage,
  } = await fetchPackageScore(ecosystem, packageName);

  if (status === "not_found") {
    return new NextResponse("Package not found", { status: 404 });
  }

  // const scoreField: score[group as keyof typeof score]
  // const value: string = score[group as keyof typeof score]?.value || null;
  const value = getValue(score, group);

  if (!value) {
    return new NextResponse("Invalid group", { status: 400 });
  }

  // Get parameters with defaults
  const label = group;
  const labelColor = searchParams.get("labelColor") || "24292e"; // Dark gray
  const statusColor = getStatusColor(value, searchParams.get("statusColor"));

  // Create SVG
  const svg = generateBadgeSVG(label, value, labelColor, statusColor);

  // Return SVG
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "max-age=3600",
    },
  });
}

// Helper function to get status color based on status
function getStatusColor(status: string, customColor: string | null) {
  if (customColor) return customColor;

  switch (status.toLowerCase()) {
    case "passing":
    case "success":
      return "94d3a2"; // Green
    case "failing":
    case "error":
    case "failed":
      return "ff6b6b"; // Red
    case "pending":
    case "running":
      return "f1e05a"; // Yellow
    case "skipped":
    case "cancelled":
      return "6a737d"; // Gray
    default:
      return "94d3a2"; // Default to green
  }
}
