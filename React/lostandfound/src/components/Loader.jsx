function Loader({ size = "md", label = "Loading...", fullPage = false, inline = false }) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-blue-200 border-t-blue-600 animate-spin shrink-0`}
      role="status"
      aria-label={label || "Loading"}
    />
  );

  if (inline) {
    return spinner;
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {spinner}
      {label ? <p className="text-sm text-gray-500">{label}</p> : null}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-10">{content}</div>;
}

export default Loader;
