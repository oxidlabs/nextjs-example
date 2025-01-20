"use client";

import Form from "@/components/form";
import InputBox from "@/components/input";
import Image from "next/image";
import { test } from "./actions";
import Button from "@/components/button";

export interface InputData {
    name: string;
    email: string;
}

const data: InputData = {
    name: "",
    email: ""
};

export default function Home() {
    return (
        <div className="bg-black flex w-full min-h-screen justify-center items-center">
            <Form
                className="bg-white w-96 p-4 rounded-lg text-black flex flex-col gap-4"
                initialState={data}
                action={test}
                //onSubmit={(data) => console.log(data)}
            >
                <label className="text-2xl font-semibold">Name</label>
                <InputBox placeholder="name" label="name" />
                <label className="text-2xl font-semibold">Email</label>
                <InputBox placeholder="email" label="email" />
                <Button className="w-full bg-black p-4 rounded-full text-white text-3xl font-bold flex justify-center items-center">Submit</Button>
            </Form>
        </div>
    );
}
