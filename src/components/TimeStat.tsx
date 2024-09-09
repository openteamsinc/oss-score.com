import { formatDistanceToNow } from "date-fns";

type Props = {
  title: string;
  time: Date | null;
};
export default function TimeStat({ title, time }: Props) {
  return (
    <div className="flex flex-row pb-3">
      <dt className="mb-1 grow text-slate-500">{title}</dt>
      <dd className="flex items-center">
        {time == null ? "n/a" : formatDistanceToNow(time, { addSuffix: true })}
      </dd>
    </div>
  );
}
