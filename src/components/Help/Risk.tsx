import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import HelpContent from "./Codes";
import { HelpProps } from "./Codes/HelpProps";
import { DialogDescription } from "@radix-ui/react-dialog";

export type Note = {
  code: string;
  description: string;
};

type Props = HelpProps & {
  children: React.ReactNode;
};

export default function RiskHelp({
  note,
  ecosystem,
  packageName,
  source,
  children,
  pkg,
}: Props) {
  if (note == null) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{note.code}</DialogTitle>
          <DialogDescription>{note.description}</DialogDescription>
        </DialogHeader>

        <HelpContent
          note={note}
          ecosystem={ecosystem}
          packageName={packageName}
          source={source}
          pkg={pkg}
        />
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <span className="sr-only">Close</span>
          {/* You can add an X icon here if needed */}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
