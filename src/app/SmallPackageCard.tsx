import Link from "next/link";
import EcosystemIcon from "@/components/Stats/EcosystemIcon";

type Props = {
  ecosystem: string;
  packageName: string;
};

export default function SmallPackageCard({ ecosystem, packageName }: Props) {
  return (
    <Link href={`/${ecosystem}/${packageName}`} className="block">
      <div className="flex items-center rounded-lg border border-gray-200 bg-white ">
        <div className="mr-3 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50">
          <EcosystemIcon
            ecosystem={ecosystem}
            className="size-6 text-gray-500"
          />
        </div>
        <div className="truncate font-medium" title={packageName}>
          {packageName}
        </div>
      </div>
    </Link>
  );
}
