import { mdiCloseCircle, mdiGithub, mdiLink } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

type Props = {
  url: string;
};
function makeName(url: string) {
  if (url.startsWith("https://github.com")) {
    return url.replace("https://github.com/", "");
  }
  return url.replace("https://", "");
}
function makePath(url: string) {
  if (url.startsWith("https://github.com")) {
    return mdiGithub;
  }
  return mdiLink;
}

export default function SourceCodeLink({ url }: Props) {
  const name = makeName(url);
  const path = makePath(url);
  if (!url.startsWith("https://")) {
    return (
      <span className="inline items-center text-red-900">
        <Icon className="inline" path={mdiCloseCircle} size={0.75} />{" "}
        <span className="">{name}</span>
      </span>
    );
  }
  return (
    <Link className="inline items-center text-blue-900" href={url}>
      <Icon className="inline" path={path} size={0.75} />{" "}
      <span className="underline">{name}</span>
    </Link>
  );
}
