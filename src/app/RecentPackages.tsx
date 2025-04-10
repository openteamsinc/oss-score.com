import { fetchRecentPackages } from "@/utils/score_res";
import SmallPackageCard from "./SmallPackageCard";

export default async function RecentPackages() {
  const packages = await fetchRecentPackages();
  console.log("packages", packages);
  return (
    <div className="mt-12 grid grid-cols-4 gap-6">
      {packages.map(([ecosystem, packageName]) => (
        <SmallPackageCard
          key={`${ecosystem}-${packageName}`}
          ecosystem={ecosystem}
          packageName={packageName}
        />
      ))}
    </div>
  );
}
