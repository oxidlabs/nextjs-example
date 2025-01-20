"use client";

import { test } from "@/app/actions";
import Button from "./button";
import Form from "./form";
import InputBox from "./input";

interface InputData {
    name: string;
    email: string;
}

const data: InputData = {
    name: "",
    email: "",
};

export default function HomeForm() {
    return (
        <Form
            className="bg-white w-96 p-4 rounded-lg text-black flex flex-col gap-4"
            initialState={data}
            action={test}
            onSubmit={(data) => console.log(data)}
        >
            <label className="text-2xl font-semibold">Name</label>
            <InputBox placeholder="name" label="name" />
            <label className="text-2xl font-semibold">Email</label>
            <InputBox placeholder="email" label="email" />
            <Button className="w-full bg-black p-4 rounded-full text-white text-3xl font-bold flex justify-center items-center">
                Submit
            </Button>
        </Form>
    );
}
