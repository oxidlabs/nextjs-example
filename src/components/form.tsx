"use client";

import React, { useCallback, useState, useTransition } from "react";
import InputBox, { InputProps } from "./input";
import Button, { ButtonProps } from "./button";

interface FormProps<T> {
    /**
     * The initial state of the form.
     * This is used to display error messages.
     */
    initialState: T;

    /**
     * The action to be performed on submit of the form.
     */
    action: (formData: FormData) => Promise<any>;

    /**
     * Callback function that is called after the form is submitted
     */
    onSubmit?: (data: any) => void;

    /**
     * Additional CSS classes for the form
     */
    className?: string;

    /**
     * Child components of the form
     */
    children: React.ReactNode;
}

function Form<T>({
    initialState,
    action,
    onSubmit,
    className,
    children,
}: FormProps<T>) {
    const [errors, setErrors] = useState<T | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
        async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            startTransition(async () => {
                try {
                    const result = await action(formData);

                    if (result.error) {
                        setErrors(result.error);
                    } else {
                        // Clear errors on success
                        setErrors(null);

                        // Call onSubmit with the success data
                        if (onSubmit) {
                            onSubmit(result.success);
                        }
                    }
                } catch (error) {
                    console.error("Form submission error:", error);
                    // Handle unexpected errors here
                }
            });
        },
        [action, onSubmit]
    );

    // Use memo to avoid re-processing children on every render
    const processedChildren = React.useMemo(() => {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;

            if (child.type === InputBox) {
                return React.cloneElement(child, {
                    state: errors,
                    ...(child.props as InputProps),
                });
            }

            if (child.type === Button) {
                return React.cloneElement(child, {
                    isPending,
                    ...(child.props as ButtonProps),
                });
            }
            return child;
        });
    }, [children, errors, isPending]);

    return (
        <form onSubmit={handleSubmit} className={className} noValidate>
            {processedChildren}
        </form>
    );
}
export default Form;
