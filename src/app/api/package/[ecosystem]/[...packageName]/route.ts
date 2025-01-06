import { fetchPackageScore } from "@/utils/score_res";
import { NextRequest } from "next/server";

type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { ecosystem, packageName } = await params;
  const name = packageName.join("/");
  const {
    package: pkg,
    status,
    source,
  } = await fetchPackageScore(ecosystem, name);

  if (status === "not_found") {
    return Response.json({ error: "Not Found" }, { status: 404 });
  }
  // @ts-expect-error dont care about packages for json response
  delete source.packages;

  return Response.json({ ecosystem, name, source, pkg });
}
