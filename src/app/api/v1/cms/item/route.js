import db from "@/lib/db";

import { successResponse, createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse, badRequestResponse } from "@/lib/errorException";
import { writeFile } from "fs/promises";
import path from "path";
import { createFilename } from "@/utils/filename";
import { unlink } from 'fs/promises'; 

import { z } from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ItemSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(100, { message: "Name must be at most 100 characters long."}),
    imageUri : z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `The maximum file size that can be uploaded is 2MB`)
        .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    price : z
        .number()
        .min(0, { message: 'Price must be at least 0' }),
    description : z
        .string()
        .min(3, { message: 'Description must be at least 3 characters long' })
        .max(255, { message: "Description must be at most 255 characters long."}),
});

export async function POST(
    req
) {
    try {
        const formData = await req.formData();
        const name = formData.get('name');
        const imageUri = formData.get('imageUri');
        const price = Number(formData.get('price'));
        const description = formData.get('description');

        const validationError = [];

        const validation = ItemSchema.safeParse({
            name: name,
            imageUri: imageUri,
            price: price,
            description: description
        });

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

        const buffer = Buffer.from(await imageUri.arrayBuffer());

        const originalFilename = imageUri.name;
        const filename = createFilename(name, originalFilename);

        try {
            await writeFile(
                path.join(process.cwd(), "public/assets/uploads/item/" + filename),
                buffer
            );
        } catch (error) {
            console.log("Error occured ", error);
        }

        const filePathName = `/assets/uploads/item/${filename}`;

        const item = await db.item.create({
            data: {
                user_id : userId,
                name: name,
                image_uri: filePathName,
                price: price,
                description: description
            }
        });

        return Response.json(createdResponse({ message :'Resource created successfully.' }), { status: 201 });


    } catch (error) {
        console.log('[ITEM_POST]', error);
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}