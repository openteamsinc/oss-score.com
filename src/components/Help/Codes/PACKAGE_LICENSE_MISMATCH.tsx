import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

export default function PACKAGE_LICENSE_MISMATCH({ pkg, source }: HelpProps) {
  const licenses = source.licenses || [];
  const license = licenses[0];
  const packageLicense = pkg.license || "unknown";
  const sourceLicense = license?.spdx_id || "unknown";

  return (
    <div className="text-base font-normal">
      <Header title="PACKAGE_LICENSE_MISMATCH">
        Your package metadata specifies license &quot;{packageLicense}&quot; but
        your source code uses license &quot;{sourceLicense}&quot;. This
        inconsistency creates legal ambiguity for users of your package.
      </Header>
      <HowToFix>
        <p>
          License mismatches can cause confusion about legal usage rights. Two
          options to fix this:
        </p>

        <h3 className="mb-1 mt-3 font-semibold">
          Option 1: Update package metadata (Recommended)
        </h3>
        <h3 className="mb-1 mt-3 font-semibold">
          Option 2: Update source code license
        </h3>
      </HowToFix>
    </div>
  );
}
