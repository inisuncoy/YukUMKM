import db from '@/lib/db';

import { successResponse } from '@/lib/genericResponse';
import { internalErrorResponse, notFoundResponse, validationErrorResponse, badRequestResponse } from '@/lib/errorException';

import logger from '@/services/logger';

import { Auth } from '@/lib/jwtTokenControl';

import { z } from 'zod';

import { createFilename } from "@/utils/filename";

import path, { parse } from "path";
import { unlink } from "fs";
import { writeFile } from "fs/promises";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ProfileSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name must be at least 3 characters long' })
        .max(30, { message: "Name must be at most 30 characters long." })
        .optional(),
    address: z
        .string()
        .min(1, { message: 'Address must be at least 3 characters long' })
        .max(255, { message: "Address must be at most 255 characters long." })
        .optional(),
    profileUri: z
        .any()
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, `The maximum file size that can be uploaded is 2MB`)
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    phoneNumber: z
        .string()
        .min(1, { message: 'Phone number must be at least 3 characters long' })
        .max(15, { message: "Phone number must be at most 15 characters long." })
        .optional(),
    description: z
        .string()
        .min(1, { message: 'Description must be at least 3 characters long' })
        .max(255, { message: "Description must be at most 255 characters long." })
        .optional(),
    });

export async function PATCH(
    req
) {
    try {
        const userId = await Auth(req);

        if (!userId) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        const existingUser = await db.user.findFirst({
            where: {
                id: userId,
                role: {
                    name: "seller"
                }
            },
            include: {
                detail_seller: true
            }
        });

        if (!existingUser) {
            return Response.json(notFoundResponse(), { status: 404 });
        }
       
        const formData = await req.formData();

        const name = formData.get('name') || existingUser.name;
        const address = formData.get('address') || existingUser.address;
        const profileUri = formData.get('profileUri') || null;
        const phoneNumber = formData.get('phoneNumber') || existingUser.detail_seller.phone_number;
        const description = formData.get('description') || existingUser.detail_seller.description;

        const data = {
            name: name,
        }

        if (address != null) {
            data.address = address
        }

        if (phoneNumber != null) {
            data.phoneNumber = phoneNumber
        }

        if (description != null) {
            data.description = description
        }

        if (profileUri != null) {
            data.profileUri = profileUri
        }

        const validationError = [];

        const validation = ProfileSchema.safeParse(data);

        if (!validation.success) {
            validation.error.errors.map((validation) => {
                const key = {
                    name: validation.path[0],
                    message: validation.message,
                };
                validationError.push(key);
            })

            return Response.json(validationErrorResponse(validationError), { status: 422 });
        }

        const updateData = {
            name: name,
            detail_seller: {
                update: {
                    where: {
                        id: existingUser.detail_seller.id
                    },
                    data: {}
                }
            }
        }

        if (address != null) {
            updateData.address = address
        }

        if (phoneNumber != null) {
            updateData.detail_seller.update.data.phone_number = phoneNumber
        }

        if (description != null) {
            updateData.detail_seller.update.data.description = description
        }
        
        if (profileUri) {
            const buffer = Buffer.from(await profileUri.arrayBuffer());
            
            const originalFilename = profileUri.name;
            const filename = createFilename(name, originalFilename);
            const filePath = path.join(process.cwd(), "public/assets/uploads/profile/" + filename);
            
            await writeFile(filePath, buffer);
            updateData.profile_uri = `/assets/uploads/profile/${filename}`;

            if (existingUser.profile_uri) {
                unlink(path.join(process.cwd(), "public", existingUser.profile_uri), function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                })
            }
        }

        await db.user.update({
            where: {
                id: userId
            },
            data: {
                ...updateData,
                updated_by: userId
            }
        });

        
        logger.info(req);

        return Response.json(successResponse({ message: 'Resource updated successfully.' }, 1), { status: 200 });

    } catch (error) {
        console.log('[PROFILE_PATCH]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}