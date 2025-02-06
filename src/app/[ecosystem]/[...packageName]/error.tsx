"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const invalidEcosystemMatch = error.message.match(/(.+?) doesn't exist/);
  const invalidEcosystem = invalidEcosystemMatch
    ? invalidEcosystemMatch[1]
    : null;

  return (
    <div>
      <h2>Something went wrong!</h2>
      {invalidEcosystem ? (
        <p>{invalidEcosystem} doesn&apos;t exist</p>
      ) : (
        <p>An unexpected error occurred.</p>
      )}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
