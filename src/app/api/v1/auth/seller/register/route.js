import db from "@/lib/db"

import { z } from "zod";

import { createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse } from "@/lib/errorException";

import hashPass from "@/lib/hash";
import { jwtSign } from "@/lib/jwtTokenControl";

import logger from "@/services/logger";

const SellerSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name must be at least 3 characters long' })
        .max(30, { message: "Name must be at most 30 characters long."}),
    email: z
        .string()
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long."})
        .refine(value => /\d/.test(value), {
            message: "Password must contain at least one number.",
        })
        .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: "Password must contain at least one symbol.",
        }),
});


export async function POST(
    req
) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        const validationError = [];

        const validation = SellerSchema.safeParse({
            name: name,
            email: email,
            password: password
        })

        if (!validation.success) {
            validation.error.errors.map((validation) => {
              const key = 
                {
                  name: validation.path[0],
                  message: validation.message,
                };
              validationError.push(key);
            })

            return Response.json(validationErrorResponse(validationError), { status: 422 });
        }

        const role = await db.role.findFirst({
            where:{
                name: "seller"
            }
        })

        if (!role) {
            return Response.json(notFoundResponse("Role seller doesn't exist"), { status: 404 })
        }

        const userExist = !!await db.user.findFirst({
            where:{
                email: email,
                role: {
                    name: "seller"
                }
            }
        })

        if (userExist) {
            const key = {
                name: "email",
                message: "Email already exist"
            }

            validationError.push(key);

            return Response.json(validationErrorResponse(validationError), { status: 422 });
        }

        const hashedPassword = await hashPass(password);

        const user = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role_id: role.id
            }
        });

        const payload = {
            id: user.id,
            email: user.email,
            role: role.name
        }

        const token = await jwtSign(payload);

        const resp = {
            token : token,
        }

        logger.info(req);

        return Response.json(createdResponse(resp), { status: 201 });

    } catch (error) {
        console.log('[REGISTER_SELLER]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}