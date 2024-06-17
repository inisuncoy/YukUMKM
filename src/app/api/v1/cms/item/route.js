import db from "@/lib/db";

import { successResponse, createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse } from "@/lib/errorException";
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
        const userId = await Auth(req);

        const userExist = !!await db.user.findFirst({
            where: {
                id: userId,
                role: {
                    name: "seller"
                }
            }
        });

        if (!userExist) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        if (searchParams.get('id')) {
            const id = searchParams.get('id');
        
            const data = await db.item.findFirst({
                where: {
                    id: id,
                    user_id: userId
                },
                include: {
                    item_image: true,
                    item_category: true,
                    user: true
                }
            });

            if (!data) {
                return Response.json(notFoundResponse(), { status: 404 });
            }

            logger.info(req)
            
            return Response.json(successResponse(data, 1), { status: 200 });
        }

        let baseQuery = {
            where: {
                user_id: userId
            },
            include: {
                item_image: true,
                item_category: true,
                user: true
            },
            orderBy: {
                created_at: 'desc'
            }
        };

        const name_insensitive = searchParams.get('name_insensitive');
        const name_sensitive = searchParams.get('name_sensitive');

        if ((name_insensitive != null || name_sensitive != null) && !(name_insensitive != null && name_sensitive != null)) {
            if (name_insensitive != null) {
                baseQuery.where.name = {
                    contains: name_insensitive,
                    mode: 'insensitive'
                };
            } else if (name_sensitive != null) {
                baseQuery.where.name = {
                    equals: name_sensitive,
                };
            }
        }

        // if category_ids is set
        const categoryIds = searchParams.getAll('categoryIds[]');
        if (categoryIds && categoryIds.length > 0) {
            baseQuery.where.item_category_id = {
                in: categoryIds
            };
        }

        // if status is set
        const status = searchParams.get('status')
        if (status !== null) {
            const isActive = status.toLowerCase() === 'true'; // Convert status to boolean
            baseQuery.where.is_active = isActive;
        }

        if (searchParams.get('limit') && searchParams.get('page')) {
            const limit = parseInt(searchParams.get('limit'));
            const page = parseInt(searchParams.get('page'));

            baseQuery.skip = (page - 1) * limit;
            baseQuery.take = limit;
        }

        const [dataLength, data] = await Promise.all([
            db.item.count({
                where: baseQuery.where,
            }),
            db.item.findMany(baseQuery),
        ]);

        logger.info(req)
        return Response.json(successResponse(data, dataLength), { status: 200 });

    } catch (error) {
        logger.error(req, {
            stack: error,
        });
        
        console.log('[ITEM_GET]', error);
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const userId = await Auth(req);

        const userExist = !!await db.user.findFirst({
            where: {
                id: userId,
                role: {
                    name: "seller"
                }
            }
        });

        if (!userExist) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        const formData = await req.formData();

        const name = formData.get('name');
        const imagesUri = formData.getAll('imagesUri[]');
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
                const key = {
                    name: `${validation.path[0]}${validation.path[1] ?? ''}`,
                    message: validation.message,
                };
                validationError.push(key);
            });
            return Response.json(validationErrorResponse(validationError), { status: 422 });
        }

        const categoryExist = await db.itemCategory.findUnique({
            where: {
                id: itemCategory
            }
        });

        if (!categoryExist) {
            const key = {
                name: "itemCategory",
                message: "Item category not found.",
            };
            validationError.push(key);
            return Response.json(validationErrorResponse(validationError), { status: 404 });
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
                user_id: userId,
                name: name,
                price: Number(price),
                item_category_id: itemCategory,
                description: description,
                created_by: userId,
                updated_by: userId
            }
        });

        await db.itemImage.createMany({
            data: filePaths.map((imageUri) => ({
                item_id: item.id,
                uri: imageUri,
            })),
        });

        logger.info(req);

        return Response.json(createdResponse({ message: 'Resource created successfully.' }), { status: 201 });
    } catch (error) {
        console.log('[ITEM_POST]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        const userId = await Auth(req);

        const userExist = !!await db.user.findFirst({
            where: {
                id: userId,
                role: {
                    name: "seller"
                }
            }
        });

        if (!userExist) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        const data = await db.item.findUnique({
            where: {
                id: id,
            },
            include: {
                item_image: true,
                item_category: true
            }
        });

        if (!data || data.user_id !== userId) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        if (!data) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        data.item_image.map((image) => {
            const filePath = path.join(process.cwd(), "public", image.uri);
            
            unlink(filePath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            
        });

        await db.item.delete({
            where: {
                id: id
            }
        });

        logger.info(req)

        return Response.json(successResponse({ message : 'Resource deleted successfully.'}, 1), { status: 200 });
    } catch (error) {
        console.error('[ITEM_DELETE]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}