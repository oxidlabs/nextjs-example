"use client";

import { useCallback } from "react";
import { test } from "@/app/actions";
import Button from "./button";
import Form from "./form";
import InputBox from "./input";

interface InputData {
    name: string;
    email: string;
}

// Define this outside component to prevent recreation on each render
const initialData: InputData = {
    name: "",
    email: "",
};

export default function HomeForm() {
    // Use useCallback for stable function reference
    const handleSubmit = useCallback((data: any) => {
        console.log(data);
    }, []);

    return (
        <Form
            className="bg-white w-96 p-4 rounded-lg text-black flex flex-col gap-4"
            initialState={initialData}
            action={test}
            onSubmit={handleSubmit}
        >
            <label className="text-2xl font-semibold" htmlFor="name">
                Name
            </label>
            <InputBox placeholder="Enter your name" label="name" />
            <label className="text-2xl font-semibold" htmlFor="email">
                Email
            </label>
            <InputBox
                placeholder="Enter your email"
                label="email"
                inputType="email"
            />
            <Button
                type="submit"
                className="w-full bg-black p-4 rounded-full text-white text-3xl font-bold flex justify-center items-center"
            >
                Submit
            </Button>
        </Form>
    );
}
