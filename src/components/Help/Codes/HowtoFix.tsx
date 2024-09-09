type Props = {
  children: React.ReactNode;
};
export default function HowToFix({ children }: Props) {
  return (
    <>
      <h2 className="mb-2 text-base text-slate-900">How to Fix</h2>
      <p className="p-2 text-sm">{children}</p>
    </>
  );
}
