import { mdiHelpCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function Help() {
  return (
    <button>
      <Icon
        path={mdiHelpCircleOutline}
        className="cursor-pointer text-slate-300 hover:text-slate-500"
        size={0.75}
      />
    </button>
  );
}
