"use client";

import React, { useState, useTransition } from "react";
import InputBox, { InputProps } from "./input";
import Button, { ButtonProps } from "./button";

interface FormProps<T> {
    initialState: T;
    action: (formData: FormData) => Promise<any>;
    onSubmit?: (data: any) => void;
    className?: string;
    children: React.ReactElement[];
}

const Form = <T,>({
    initialState,
    action,
    onSubmit,
    className,
    children,
}: FormProps<T>) => {
    const [error, setError] = useState(initialState);
    const [isPending, startTransition] = useTransition();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        const formData = new FormData(e.currentTarget);
        e.preventDefault();

        startTransition(async () => {
            const { error } = await action(formData);
            console.log(error);
            if (error) {
                setError(error);
            }
        });

        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === InputBox) {
                    return (
                        <InputBox
                            state={error}
                            {...(child.props as InputProps)}
                        />
                    );
                } else if (
                    React.isValidElement(child) &&
                    child.type === Button
                ) {
                    return (
                        <Button
                            isPending={isPending}
                            {...(child.props as ButtonProps)}
                        />
                    );
                }

                return child;
            })}
        </form>
    );
};

export default Form;
