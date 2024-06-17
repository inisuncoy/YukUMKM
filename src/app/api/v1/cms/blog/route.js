import db from "@/lib/db";

import { z } from "zod";

import { successResponse, createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse } from "@/lib/errorException";

import { writeFile } from "fs/promises";
import path from "path";
import { unlink } from "fs";
import { createFilename } from "@/utils/filename";
import { Auth } from "@/lib/jwtTokenControl";


import logger from "@/services/logger";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const BlogSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(100, { message: "Name must be at most 100 characters long."}),
    imageUri: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `The maximum file size that can be uploaded is 2MB`)
        .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    content : z
        .string()
        .min(3, { message: 'Description must be at least 3 characters long' })
        .max(255, { message: "Description must be at most 255 characters long."}),
});

export const patchBlogSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(100, { message: "Name must be at most 100 characters long."})
        .optional(),
    imageUri: z
        .any()
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, `The maximum file size that can be uploaded is 2MB`)
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    content : z
        .string()
        .min(3, { message: 'Description must be at least 3 characters long' })
        .max(255, { message: "Description must be at most 255 characters long."})
        .optional(),
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
        
            const data = await db.blog.findFirst({
                where: {
                    id: id,
                    user_id: userId
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
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
            orderBy: {
                created_at: 'desc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        };

        const title_insensitive = searchParams.get('title_insensitive');
        const title_sensitive = searchParams.get('title_sensitive');

        if ((title_insensitive != null || title_sensitive != null) && !(title_insensitive != null && title_sensitive != null)) {
            if (title_insensitive != null) {
                baseQuery.where.title = {
                    contains: title_insensitive,
                    mode: 'insensitive'
                };
            } else if (title_sensitive != null) {
                baseQuery.where.title = {
                    equals: title_sensitive,
                };
            }
        }

        if (searchParams.get('limit') && searchParams.get('page')) {
            const limit = parseInt(searchParams.get('limit'));
            const page = parseInt(searchParams.get('page'));

            baseQuery.skip = (page - 1) * limit;
            baseQuery.take = limit;
        }

        const [dataLength, data] = await Promise.all([
            db.blog.count({
                where: baseQuery.where,
            }),
            db.blog.findMany(baseQuery),
        ]);

        logger.info(req)
        return Response.json(successResponse(data, dataLength), { status: 200 });

    } catch (error) {
        logger.error(req, {
            stack: error,
        });
        
        console.log('[BLOG_GET]', error);
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

        const title = formData.get('title');
        const imageUri = formData.get('imageUri');
        const content = formData.get('content');

        const validationError = [];

        const validation = BlogSchema.safeParse({
            title: title,
            imageUri: imageUri,
            content: content,
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

        const buffer = Buffer.from(await imageUri.arrayBuffer());
        const originalFilename = imageUri.name;
        const filename = createFilename(title + "_", originalFilename);
        const filePath = path.join(process.cwd(), "public/assets/uploads/blog/" + filename);

        await writeFile(filePath, buffer);

        const filePaths = `/assets/uploads/blog/${filename}`;

        console.log(userId)

        await db.blog.create({
            data: {
                title: title,
                content: content,
                user_id: userId,
                image_uri: filePaths,
                created_by: userId,
                updated_by: userId
            }
        });

        logger.info(req);

        return Response.json(createdResponse({ message: 'Resource created successfully.' }), { status: 201 });
    } catch (error) {
        console.log('[BLOG_POST]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function PATCH(req) {
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

        const existingBlog = await db.blog.findFirst({
            where: {
                id: id,
                user_id: userId
            }
        });

        if (!existingBlog) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        const formData = await req.formData();

        const title = formData.get('title') || existingBlog.title;
        const imageUri = formData.get('imageUri') || null;
        const content = formData.get('content') || existingBlog.content;

        const validationError = [];
        const validation = patchBlogSchema.safeParse({
            title: title,
            imageUri: imageUri,
            content: content,
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

        const updateData = { title, content };


        if (imageUri) {
            const buffer = Buffer.from(await imageUri.arrayBuffer());
            
            const originalFilename = imageUri.name;
            const filename = createFilename(title, originalFilename);
            const filePath = path.join(process.cwd(), "public/assets/uploads/blog/" + filename);

            await writeFile(filePath, buffer);

            updateData.image_uri = `/assets/uploads/blog/${filename}`;

            unlink(path.join(process.cwd(), "public", existingBlog.image_uri), function (err) {
                if (err) throw err;
                console.log('File deleted!');
            })
        }

        await db.blog.update({
            where: {
                id: id
            },
            data: {
                ...updateData,
                updated_by: userId
            }
        });

        logger.info(req);

        return Response.json(successResponse({ message: 'Resource updated successfully.' }, 1), { status: 200 });
    } catch (error) {
        console.error('[BLOG_PATCH]', error);
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
        
        const data = await db.blog.findFirst({
            where: {
                id: id,
                user_id: userId
            }
        });
        
        if (!data) {
            return Response.json(notFoundResponse(), { status: 404 });
        }
        // return Response.json(data);
        const filePath = path.join(process.cwd(), "public", data.image_uri);
       
        unlink(filePath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });

        await db.blog.delete({
            where: {
                id: id
            }
        });

        logger.info(req)

        return Response.json(successResponse({ message : 'Resource deleted successfully.'}, 1), { status: 200 });
    } catch (error) {
        console.error('[BLOG_DELETE]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}