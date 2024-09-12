import packageScore from "@/utils/packageScore";
import { NextRequest } from "next/server";

type Props = {
  params: {
    ecosystem: string;
    packageName: string[];
  };
};
export async function GET(
  request: NextRequest,
  { params: { ecosystem, packageName } }: Props,
) {
  const name = packageName.join("/");
  const { pkg, source } = await packageScore(ecosystem, name);
  if (pkg == null) {
    return Response.json({ error: "Not Found" }, { status: 404 });
  }

  return Response.json({ ecosystem, name, source, pkg });
}
