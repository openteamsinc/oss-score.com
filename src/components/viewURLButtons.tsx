"use client";
import { ProjectData } from "@/utils/ProjectInterface";

// Open URL in a new window
const openNewWindow = (url: string) => {
  window.open(url, "_blank", "");
};

export default function ViewURLButtons({ data }: { data: ProjectData }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-5 border-t border-slate-300 pt-5">
      <button
        onClick={() => openNewWindow(data.source_url)}
        className="text-start font-semibold text-blue-500 hover:underline"
      >
        Visit Source
      </button>
      <button
        onClick={() => openNewWindow(data.homepage_url)}
        className="text-start font-semibold text-blue-500 hover:underline"
      >
        Visit Homepage
      </button>
    </div>
  );
}
