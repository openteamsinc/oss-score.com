export default function ErrorMessage({
  status,
  message,
}: {
  status?: string;
  message?: string;
}) {
  const errorMessage = message || `Unknown error: ${status}`;
  return (
    <div>
      <strong>{errorMessage}</strong>
    </div>
  );
}
