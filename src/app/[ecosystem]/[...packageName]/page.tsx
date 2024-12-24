import React from "react";

import PackageScore from "./Score";
import LoadingScore from "./LoadingScore";

type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
};

export default async function Package({ params }: Props) {
  const { ecosystem, packageName } = await params;
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
