"use client";
import { memo } from "react";
import { BounceLoader } from "react-spinners";

export interface ButtonProps {
    type?: "submit" | "button" | "reset";
    className?: string;
    isPending?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

// Use memo to prevent unnecessary re-renders
const Button = memo<ButtonProps>(
    ({ type = "button", className, isPending, children, onClick }) => {
        return (
            <button
                type={type}
                className={className}
                disabled={isPending}
                onClick={onClick}
            >
                {isPending ? (
                    <BounceLoader color="white" size={24} />
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
