type Props = {
  title: string;
  children: React.ReactNode;
};
export default function Header({ title, children }: Props) {
  return (
    <>
      <h1 className="mb-4 border-b text-lg text-slate-900">{title}</h1>

      <h2 className="mb-2 text-base text-slate-900">What could this mean?</h2>
      <p className="p-2 text-sm">{children}</p>
    </>
  );
}
