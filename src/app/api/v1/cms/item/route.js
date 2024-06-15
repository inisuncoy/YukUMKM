import db from "@/lib/db";

import { successResponse, createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse, badRequestResponse } from "@/lib/errorException";
import { writeFile } from "fs/promises";
import path from "path";
import { createFilename } from "@/utils/filename";
import { Auth } from "@/lib/jwtTokenControl";

import { z } from "zod";

import logger from "@/services/logger";
import { unlink } from "fs";

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
    itemCategory : z
        .string()
        .uuid(),
    price : z
        .number()
        .min(0, { message: 'Price must be at least 0' }),
    description : z
        .string()
        .min(3, { message: 'Description must be at least 3 characters long' })
        .max(255, { message: "Description must be at most 255 characters long."}),
});

export async function GET(
    req
) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const { id } = await Auth(req);
        const userId = id;

        if (searchParams.get('id')) {
            const id = searchParams.get('id');
            

            const data = await db.item.findUnique({
                where: {
                    id: id,
                    user_id: userId
                },
                include: {
                    item_image: true,
                    item_category: true
                }
            });

            if (!data) {
                return Response.json(notFoundResponse(), { status: 404 });
            }

            return Response.json(successResponse(data, 1), { status: 200 });
        }

        let baseQuery = {
            where: {
                user_id: userId
            },
            include: {
                item_image: true,
                item_category: true
            },
            orderBy: {
                created_at: 'desc'
            }
        };

        const data = await db.item.findMany(baseQuery);
        logger.info(req)
        return Response.json(successResponse(data, data.length), { status: 200 });

    } catch (error) {
        logger.error(req, {
            stack: error,
        });
        
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
        const price = formData.get('price');
        const itemCategory = formData.get('itemCategory');
        const description = formData.get('description');

        const validationError = [];

        const validation = ItemSchema.safeParse({
            name: name,
            imagesUri: imagesUri,
            price: Number(price),
            itemCategory: itemCategory,
            description: description,
            is_active: false,
        });

        if (!validation.success) {
            validation.error.errors.map((validation) => {
              const key = 
                {
                  name: `${validation.path[0]}${validation.path[1] ?? ''}`,
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

        const item = await db.item.create({
            data: {
                user_id : userId,
                name: name,
                price: Number(price),
                item_category_id: itemCategory,
                description: description,
                created_by: userId,
                updated_by: userId
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

        logger.info(req);

        return Response.json(createdResponse({ message :'Resource created successfully.' }), { status: 201 });


    } catch (error) {
        console.log('[ITEM_POST]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function DELETE( 
    req 
){
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const { id } = await Auth(req);
    const userId = id;

    if (searchParams.get('id')) {
        const id = searchParams.get('id');

        const data = await db.item.findUnique({
            where: {
                id: id,
                user_id: userId
            },
            include: {
                item_image: true,
                item_category: true
            }
        });

        if (!data) {
            return Response.json(notFoundResponse(), { status: 404 });
        }


        const deleteFilePromises = data.item_image.map(image => 
            unlink(path.join(process.cwd(), "public", image.uri))
        );

        await Promise.all(deleteFilePromises);

        await db.itemImage.deleteMany({
            where: {
                item_id: id
            }
        });

        await db.item.delete({
            where: {
                id: id
            }
        });

        return Response.json(successResponse(data, 1), { status: 200 });
    }
}