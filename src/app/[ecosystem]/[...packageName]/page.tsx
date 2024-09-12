import React from "react";

import PackageScore from "./Score";
import LoadingScore from "./LoadingScore";

type Props = {
  params: {
    ecosystem: string;
    packageName: string[];
  };
};

export default async function Package({
  params: { ecosystem, packageName },
}: Props) {
  const name = packageName.join("/");
  return (
    <article className="container m-auto">
      <h1 className="my-10 text-2xl font-bold">
        {ecosystem}/{name}
      </h1>
      <React.Suspense fallback={<LoadingScore />}>
        <PackageScore ecosystem={ecosystem} name={name} />
      </React.Suspense>
    </article>
  );
}
