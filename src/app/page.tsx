import React from "react";
import SearchAutocomplete from "@/components/Search/SearchAutocomplete";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="my-8 text-center text-3xl font-bold">
        Welcome to OpenTeams • Open Source Scoring
      </h1>
      <div className="mx-auto max-w-2xl">
        <SearchAutocomplete />
      </div>
      <div className="mt-12 text-center">
        <p className="mb-4 text-xl">
          Discover and evaluate open source projects with ease.
        </p>
        <p className="text-gray-600">
          Will integrating project <span className="font-extrabold">X</span> as
          a dependency enhance the stability and maintainability of our
          applications while minimizing potential risks and challenges?
        </p>
      </div>
    </div>
  );
}
