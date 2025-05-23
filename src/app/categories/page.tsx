import React from "react";
import { fetchNotes } from "@/utils/score_res";
import CategoriesTable from "./Table";

export default async function CategoriesPage() {
  const { notes, categories, groups } = await fetchNotes();

  return (
    <CategoriesTable notes={notes} groups={groups} categories={categories} />
  );
}
