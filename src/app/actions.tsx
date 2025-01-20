"use server";

import { z } from "zod";

const inputSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
});

export async function test(formData: FormData): Promise<any> {
    // sleep for 1 sec
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    // verify the formdata
    let result = inputSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
    });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    return { success: result };
}
