import { cachedNotes, Notes } from "@/utils/database";
import packageScore from "@/utils/packageScore";
import { Package, Score } from "@/utils/score";
import { NextRequest } from "next/server";

type Props = {
  params: {
    ecosystem: string;
  };
};

type T = {
  health_risk?: { notes?: string[] };
  maturity?: { notes?: string[] };
};

function replaceNoteIdWithTextCode(val: T, notes: Notes) {
  if (val.health_risk?.notes != null) {
    val.health_risk.notes = val.health_risk.notes.map(
      (noteId) => notes[noteId]?.code || "Unknown",
    );
  }
  if (val.maturity?.notes != null) {
    val.maturity.notes = val.maturity.notes.map(
      (noteId) => notes[noteId]?.code || "Unknown",
    );
  }
}
interface Requirement {
  name: string;
  comparator: string;
  version: string;
}

function parsePythonRequirements(requirements: string): Requirement[] {
  const requirementRegex = /^([\w.-]+)\s*([<>=!~]+)\s*([\w.-]+)$/;

  return requirements
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("-"))
    .map((req) => {
      const match = req.match(requirementRegex);
      if (!match) {
        throw new Error(`Invalid requirement format: ${req}`);
      }

      const [, name, comparator, version] = match;
      return { name, comparator, version };
    });
}

export async function POST(
  request: NextRequest,
  { params: { ecosystem } }: Props,
) {
  const notes = await cachedNotes();
  const text = await request.text();
  const reqs = parsePythonRequirements(text);

  const packages: Record<string, { source: Score; pkg: Package }> = {};

  await Promise.all(
    reqs.map(async ({ name }) => {
      const { pkg, source } = await packageScore(ecosystem, name);
      if (pkg && source) {
        // @ts-expect-error Dont care about packages
        delete source?.packages;
        replaceNoteIdWithTextCode(pkg, notes);
        replaceNoteIdWithTextCode(source, notes);
        packages[name] = { source, pkg };
      }
    }),
  );

  return Response.json({ ecosystem, reqs, packages });
}
