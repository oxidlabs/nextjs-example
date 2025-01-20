"use client";
import { BounceLoader } from "react-spinners";

export interface ButtonProps {
    type?: "submit" | "button" | "reset" | undefined;
    className?: string;
    isPending?: boolean;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, isPending, children }) => {
    return (
        <button type={type} className={className} disabled={isPending}>
            {isPending ? <BounceLoader color="white" /> : children}
        </button>
    );
};

export default Button