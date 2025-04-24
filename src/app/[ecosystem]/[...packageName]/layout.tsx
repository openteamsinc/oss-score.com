import { Metadata } from "next";

type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ecosystem, packageName } = await params;
  const name = packageName.map(decodeURIComponent).join("/");
  return {
    title: `Score • ${ecosystem}/${name}`,
    description: `Score for the ${ecosystem} package ${name}`,
  };
}

export default async function Package({ params, children }: Props) {
  const { ecosystem, packageName } = await params;
  const name = packageName.map(decodeURIComponent).join("/");
  return (
    <article className="container m-auto">
      <h1 className="my-10 text-2xl font-bold">
        {ecosystem}/{name}
      </h1>
      {children}
    </article>
  );
}
