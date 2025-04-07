import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  diff?: string | null;
  modified: boolean;
};
export default function DiffDialog({ modified, diff }: Props) {
  if (!modified) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-500">
          (modified)
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-full p-2">
        <DialogHeader>
          <DialogTitle>License Diff</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 overflow-scroll">
          <pre>
            <code>{diff}</code>
          </pre>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
