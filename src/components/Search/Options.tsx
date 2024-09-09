import { PackageResult } from "@/utils/search_packages";
import AutoCompleteOption from "./AutoCompleteOption";

type Props = {
  packages: PackageResult[];
  query: string;
  loading: boolean;
};
export default function Options({ packages, query, loading }: Props) {
  if (query.length < 3) {
    return (
      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
        Longer query
      </div>
    );
  }
  if (loading) {
    return (
      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
        Loading...
      </div>
    );
  }
  if (packages.length === 0) {
    return (
      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
        Nothing found.
      </div>
    );
  }
  return (
    <>
      {packages.map((item: PackageResult) => (
        <AutoCompleteOption
          key={`${item.ecosystem}/${item.name}`}
          item={item}
        />
      ))}
    </>
  );
}
