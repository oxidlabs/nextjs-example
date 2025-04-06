"use server";

import { z } from "zod";

// Define stronger types for the return value
interface ActionResult {
    error?: Record<string, string[]>;
    success?: {
        data: {
            name: string;
            email: string;
        };
    };
}

// Define schema once, outside the function
const inputSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
        .string()
        .email({ message: "Valid email is required" })
        .min(1, { message: "Email is required" }),
});

export async function test(formData: FormData): Promise<ActionResult> {
    try {
        // Use a smaller timeout for faster feedback in development
        // In production, you'd likely remove this artificial delay
        await new Promise<void>((resolve) => setTimeout(resolve, 500));

        // Get all values at once
        const name = formData.get("name");
        const email = formData.get("email");

        const result = inputSchema.safeParse({ name, email });
        if (!result.success) {
            return { error: result.error.flatten().fieldErrors };
        }

        // Return validated data
        return {
            success: {
                data: result.data,
            },
        };
    } catch (error) {
        console.error("Form validation error:", error);
        return {
            error: {
                _form: ["An unexpected error occurred. Please try again."],
            },
        };
    }
}
