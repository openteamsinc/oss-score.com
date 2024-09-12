"use client";
import React from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
} from "@headlessui/react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import useSearchPackages from "./useSearchPackages";
import Options from "./Options";
import { PackageResult } from "@/utils/search_packages";
import { useRouter } from "next/navigation";

export default function SearchAutocomplete() {
  const [query, setQuery] = React.useState("");
  const { packages, loading } = useSearchPackages(query);
  const router = useRouter();
  return (
    <div className="mx-auto w-full max-w-md">
      <Combobox
        onChange={(value: PackageResult | null) => {
          if (value == null) {
            return;
          }
          router.push(`/${value.ecosystem}/${value.name}`);
        }}
      >
        <div className="relative mt-1">
          <div className="focus-visible:ring-opacity/75 relative w-full cursor-default overflow-hidden rounded-lg  bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <ComboboxInput
              className="w-full rounded-lg border-none p-2 pl-3 pr-10 text-xl leading-10 text-gray-900 focus:ring-0"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item: PackageResult | null) =>
                item ? `${item.ecosystem}/${item.name}` : ""
              }
              placeholder="Search packages..."
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon
                path={mdiChevronDown}
                className="size-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <ComboboxOptions className="ring-opacity/5 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
            <Options query={query} packages={packages} loading={loading} />
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
