import Risk from "@/components/Risk";
import {
  CategorizedScore,
  NoteDescr,
  Package,
  Source,
} from "@/utils/scoreTypes";
import NoteList from "./NotesList";

type RiskSectionProps = {
  title: string;
  name: string;
  ecosystem: string;
  notes: { [key: string]: NoteDescr };
  source: Source;
  pkg: Package;
  categorizedScore: CategorizedScore;
};
export default function RiskSection({
  title,
  notes,
  ecosystem,
  source,
  categorizedScore,
  name,
  pkg,
}: RiskSectionProps) {
  return (
    <section className="">
      <h2 className="flex items-center font-semibold">
        <span className="grow">{title}:</span>
        <Risk value={categorizedScore.value} />
      </h2>
      <NoteList
        notes={notes}
        ecosystem={ecosystem}
        scoreNotes={categorizedScore.notes}
        name={name}
        source={source}
        pkg={pkg}
      />
    </section>
  );
}
