"use client";
import React from "react";
import { useState } from "react";
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
import { SiPypi, SiAnaconda, SiNpm } from "react-icons/si";

export default function SearchAutocomplete() {
  const [query, setQuery] = React.useState("");
  const { packages, loading } = useSearchPackages(query);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSource, setSelectedSource] = useState("Source");
  const router = useRouter();

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setShowDropdown(false);
  };

  return (
    <div className="mx-auto w-screen">
      <Combobox
        onChange={(value: PackageResult | null) => {
          if (value == null) {
            return;
          }
          router.push(`/${value.ecosystem}/${value.name}`);
        }}
      >
        <div className="relative mt-1 flex justify-center">
          <div className="flex w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
            {/* Dropdown Button */}
            <div>
              <button
                className="flex h-full w-32 items-center justify-center rounded-l-lg bg-blue-500 px-4 text-sm font-medium text-white lg:w-52"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="text-center">{selectedSource}</span>
                <Icon
                  path={mdiChevronDown}
                  className="ml-2 size-5 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Input Field */}
            <ComboboxInput
              className="w-full rounded-r-lg border-none p-2 pl-3 pr-10 text-xl leading-10 text-gray-900 focus:ring-0"
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

          {/* Source Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-0 top-full z-10 mt-1 w-32 rounded-md bg-white shadow-lg ring-1 ring-black lg:w-52">
              <ul className="py-1 text-gray-700">
                <li
                  className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSourceSelect("pypi")}
                >
                  <SiPypi className="mr-2 text-blue-500" />{" "}
                  {/* PyPI logo in blue */}
                  pypi
                </li>
                <li
                  className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSourceSelect("conda")}
                >
                  <SiAnaconda className="mr-2" style={{ color: "#3EB022" }} />{" "}
                  {/* Conda logo in green */}
                  conda
                </li>
                <li
                  className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSourceSelect("npm")}
                >
                  <SiNpm className="mr-2" style={{ color: "#C23B33" }} />{" "}
                  {/* NPM logo in red */}
                  npm
                </li>
              </ul>
            </div>
          )}

          {/* Combobox Options */}
          <ComboboxOptions className="absolute left-0 top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
            <Options query={query} packages={packages} loading={loading} />
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
