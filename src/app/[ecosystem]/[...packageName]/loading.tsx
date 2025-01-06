export default function LoadingScore() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Health & Risk:
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500"></ul>
        </section>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Maturity:
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500"></ul>
        </section>
      </div>
      <div>
        <h2 className="border-b border-b-slate-300">Package Stats</h2>
        <div />
        <h2 className="border-b border-b-slate-300">Source Stats</h2>
        <div />
      </div>
    </div>
  );
}
