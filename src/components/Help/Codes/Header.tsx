type Props = {
  title?: string;
  children: React.ReactNode;
};
export default function Header({ children }: Props) {
  return (
    <>
      <h2 className="mb-2 text-base text-slate-900">What could this mean?</h2>
      <div className="p-2 text-sm">{children}</div>
    </>
  );
}
