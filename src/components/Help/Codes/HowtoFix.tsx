type Props = {
  children: React.ReactNode;
};
export default function HowToFix({ children }: Props) {
  return (
    <div>
      <h2 className="mb-2 text-base text-slate-900">How to Fix</h2>
      <div className="p-2 text-sm">{children}</div>
    </div>
  );
}
