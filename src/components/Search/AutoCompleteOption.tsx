import { PackageResult } from "@/utils/search/PackageResult";
import { SiPypi, SiAnaconda, SiNpm } from "react-icons/si";

import { ComboboxOption } from "@headlessui/react";
import { mdiSearchWeb } from "@mdi/js";
import Icon from "@mdi/react";

type Props = {
  item: PackageResult;
};

function SourceIcon({ ecosystem }: { ecosystem: string }) {
  switch (ecosystem) {
    case "pypi":
      return <SiPypi size={34} className="ml-0 mr-4 inline text-[#006dad]" />;
    case "conda":
      return (
        <SiAnaconda size={34} className="ml-0 mr-4 inline text-[#3EB022]" />
      );
    case "npm":
      return <SiNpm size={34} className="ml-0 mr-4 inline text-[#C23B33]" />;
    default:
      return null;
  }
}

export default function AutoCompleteOption({ item }: Props) {
  return (
    <ComboboxOption
      key={`${item.ecosystem}/${item.name}`}
      className={({ active }) =>
        `relative cursor-default select-none px-2 py-2 ${
          active ? "bg-slate-200 text-slate-900" : "text-slate-700"
        }`
      }
      value={item}
    >
      {({ selected, active }) => (
        <>
          <SourceIcon ecosystem={item.ecosystem} />
          <span
            className={`inline truncate ${selected ? "font-medium" : "font-normal"}`}
          >
            {`${item.ecosystem}/${item.name}`}
          </span>
          {selected ? (
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                active ? "text-white" : "text-slate-200"
              }`}
            >
              <Icon className="size-5" aria-hidden="true" path={mdiSearchWeb} />
            </span>
          ) : null}
        </>
      )}
    </ComboboxOption>
  );
}
