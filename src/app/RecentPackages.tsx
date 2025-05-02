import { fetchRecentPackages } from "@/utils/score_res";
import SmallPackageCard from "./SmallPackageCard";

export default async function RecentPackages() {
  let packages = [];
  try {
    packages = await fetchRecentPackages();
  } catch (err) {
    console.error("Error fetching recent packages:", err);
    return <div>Error loading packages</div>;
  }

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
