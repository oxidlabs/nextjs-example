"use client";

// Define a proper type for the state object
interface State {
    [key: string]: string[];
}

export interface InputProps {
    label: string;
    value?: string;
    placeholder?: string;
    inputType?: string;
    required?: boolean;
    state?: State;
}

export default function InputBox({
    label,
    value,
    placeholder,
    inputType = "text",
    required,
    state,
}: InputProps) {
    // Use const for immutable values
    const hasError = state && state[label];
    const errorMessage = hasError ? state[label][0] : null;
    return (
        <div className="mb-4">
            <input
                name={label}
                type={inputType}
                defaultValue={value}
                placeholder={placeholder}
                required={required}
                aria-invalid={hasError ? "true" : "false"}
                className={`block p-2 text-sm text-gray-700 border ${
                    hasError ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 w-full`}
            />
            {hasError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
