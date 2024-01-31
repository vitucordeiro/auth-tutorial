"use server"
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";

import { RegisterSchema } from "@/schemas";

export const register = async(values:z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) return {error: "invalid fields!"}

    const {email, password, name} = validatedFields.data;

    const hashedPassword = await bcryptjs.hash(password, 10)

    const existingUser = await getUserByEmail(email);

    if(existingUser) return { error : "Email already in use!"}

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        }
    })
    // TODO: Send verification token email
    return {success: "Account created with success!"}
}