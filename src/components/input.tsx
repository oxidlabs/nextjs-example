import { useState } from "react";

interface State {
  [key: string]: string;
}

export interface InputProps {
    label: string;
    /**
     * The value of the input field.
     */
    value?: string;
    /**
     * The placeholder text for the input field.
     */
    placeholder?: string;
    /**
     * The type of the input field (e.g. text, password, email, etc.).
     */
    inputType?: string;
    required?: boolean;
    state?: any;/* State; */
}

export default function InputBox({ label, value, placeholder, inputType, required, state}: InputProps) {
    /* const [inputState, setInputState] = useState(""); */
    return (
        <div className="mb-4">
            <input
                name={label}
                type={inputType || "text"}
                value={value}
                placeholder={placeholder}
                required={required}
                //onChange={e => setInputState(e.target.value)}
                className={`block p-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 w-full ${
                    state && state[label] ? "border-red-500" : ""
                }`}
            />
            {state && state[label] && (
                <p className="mt-2 text-sm text-red-600">{state && state[label]}</p>
            )}
        </div>
    );
}
