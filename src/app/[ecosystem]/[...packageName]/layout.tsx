type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
  children: React.ReactNode;
};

export default async function Package({ params, children }: Props) {
  const { ecosystem, packageName } = await params;
  const name = packageName.join("/");
  return (
    <article className="container m-auto">
      <h1 className="my-10 text-2xl font-bold">
        {ecosystem}/{name}
      </h1>
      {children}
    </article>
  );
}
