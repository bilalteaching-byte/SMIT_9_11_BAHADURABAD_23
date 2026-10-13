function FormField({ label, error, registration, className = "", ...inputProps }) {
  const inputId = inputProps.id || inputProps.name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
        className={`border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500"
        } ${className}`}
        {...inputProps}
        {...registration}
      />

      {error ? (
        <p id={errorId} className="text-sm font-medium text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
