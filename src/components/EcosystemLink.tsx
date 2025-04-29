import Link from "next/link";
import EcosystemIcon from "./Stats/EcosystemIcon";

function ecosystemHref(ecosystem: string, pkgName: string) {
  switch (ecosystem) {
    case "npm":
      return `https://www.npmjs.com/package/${pkgName}`;
    case "pypi":
      return `https://pypi.org/project/${pkgName}`;
    // case "rubygems":
    //   return `https://rubygems.org/gems/${pkgName}`;
    // case "maven":
    //   return `https://search.maven.org/artifact/${pkgName}`;
    // case "nuget":
    //   return `https://www.nuget.org/packages/${pkgName}`;
  }
  //   const href = `https://pypi.org/project/${pkgName}`;
  throw new Error(`Unsupported ecosystem: ${ecosystem}`);
}

export default function EcosystemLink({
  pkgName,
  ecosystem,
}: {
  pkgName: string;
  ecosystem: string;
}) {
  const href = ecosystemHref(ecosystem, pkgName);

  return (
    <Link className="flex items-center underline" href={href}>
      <EcosystemIcon ecosystem={ecosystem} tooltip={false} className="size-4" />
      <span className="ml-1">{pkgName}</span>
    </Link>
  );
}
