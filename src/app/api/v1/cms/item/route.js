import db from "@/lib/db";

import { successResponse, createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse, badRequestResponse } from "@/lib/errorException";
import { writeFile } from "fs/promises";
import path from "path";
import { createFilename } from "@/utils/filename";
import { Auth } from "@/lib/jwtTokenControl";

import { z } from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ItemSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(100, { message: "Name must be at most 100 characters long."}),
    imagesUri : z
        .array(z.instanceof(File))
        .nonempty({ message: "At least one image is required" })
        .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
            { message: `The maximum file size that can be uploaded is 2MB` }
        )
        .refine(
            (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            { message: "Only .jpg, .jpeg, .png and .webp formats are supported." }
        ),
    price : z
        .number()
        .min(0, { message: 'Price must be at least 0' }),
    description : z
        .string()
        .min(3, { message: 'Description must be at least 3 characters long' })
        .max(255, { message: "Description must be at most 255 characters long."}),
});

export async function GET() {
    try {
        const data = await db.item.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                item_image: true
            }
        });

        return Response.json(successResponse(data, data.length), { status: 200 });

    } catch (error) {
        console.log('[ITEM_GET]', error);
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function POST(
    req
) {
    try {
        const { id } = await Auth(req);
        const userId = id;
        
        const formData = await req.formData();
        const name = formData.get('name');
        const imagesUri = formData.getAll('imagesUri');
        const price = Number(formData.get('price'));
        const description = formData.get('description');

        const validationError = [];

        const validation = ItemSchema.safeParse({
            name: name,
            imagesUri: imagesUri,
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

        const fileUploadPromises = imagesUri.map(async (imageUri, index) => {
            const buffer = Buffer.from(await imageUri.arrayBuffer());
            const originalFilename = imageUri.name;
            const filename = createFilename(name + "_" + index, originalFilename);
            const filePath = path.join(process.cwd(), "public/assets/uploads/item/" + filename);

            await writeFile(filePath, buffer);

            return `/assets/uploads/item/${filename}`;
        });

        const filePaths = await Promise.all(fileUploadPromises);

        console.log(filePaths)

        const item = await db.item.create({
            data: {
                user_id : userId,
                name: name,
                price: price,
                description: description
            }
        });

        await db.itemImage.createMany({
            data: filePaths.map((imageUri) => {
                return {
                    item_id: item.id,
                    uri: imageUri,
                };
            }),
        });

        return Response.json(createdResponse({ message :'Resource created successfully.' }), { status: 201 });


    } catch (error) {
        console.log('[ITEM_POST]', error);
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}