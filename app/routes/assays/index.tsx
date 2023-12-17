import { Link } from "@remix-run/react";

export default function AssayIndexPage() {
  return (
    <p>
      No assay selected. Select an assay on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new assay.
      </Link>
    </p>
  );
}
