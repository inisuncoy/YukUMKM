import db from "@/lib/db";

import { z } from "zod";

import { successResponse, createdResponse } from "@/lib/genericResponse";
import { internalErrorResponse, validationErrorResponse, notFoundResponse, badRequestResponse } from "@/lib/errorException";

import logger from "@/services/logger";

const RoleSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name must be at least 3 characters long' })
        .max(30, { message: "Name must be at most 30 characters long."})
});

export async function GET(
    req
) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        if (searchParams.get('id')) {
            const id = searchParams.get('id');

            const data = await db.role.findUnique({
                where: {
                    id: id
                }
            });

            if (!data) {
                return Response.json(notFoundResponse(), { status: 404 });
            }

            logger.info(req);
            
            return Response.json(successResponse(data, 1), { status: 200 });
        }

        let baseQuery = {
            include: {},
            orderBy: {
                created_at: 'desc'
            }
        };
        

        const datas = await db.role.findMany(baseQuery)

        logger.info(req);
        return Response.json(successResponse(datas, datas.length), { status: 200 });
    } catch (error) {
        console.log('[ROLE_GET]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function POST(
    req
) {
    try {
        const body = await req.json();
        const { name } = body;

        const userId = await Auth(req);

        const validationError = [];

        const validation = RoleSchema.safeParse({
            name: name,
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

        await db.role.create({
            data: {
                name: name,
                created_by: userId,
                updated_by: userId
            }
        });

        logger.info(req);
        return Response.json(createdResponse({ message :'Resource created successfully.' }), { status: 201 });

    } catch (error) {
        console.log('[ROLE_POST]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function PATCH(
    req
) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        const userId = await Auth(req);

        if (!searchParams.get('id')) {
            return Response.json(badRequestResponse("ID is required"), { status: 400 });
        }
        const id = searchParams.get('id');

        const body = await req.json();
        const { name } = body;

        const validationError = [];

        const validation = RoleSchema.safeParse({
            name: name,
        })

        const roleExists = !!await db.role.findFirst({
            where : {
                id: id,
            } 
        });

        if (!roleExists) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

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

        await db.role.update({
            where: {
                id: id
            },
            data: {
                name: name,
                updated_by: userId
            }
        });

        logger.info(req);
        return Response.json(successResponse({ message :'Resource updated successfully.' }, 1), { status: 200 });

    } catch (error) {
        console.log('[ROLE_PATCH]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}

export async function DELETE(
    req
) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        if (!searchParams.get('id')) {
            return Response.json(badRequestResponse("ID is required"), { status: 400 });
        }
        const id = searchParams.get('id');

        const roleExists = !!await db.role.findFirst({
            where : {
                id: id,
            } 
        });

        if (!roleExists) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        await db.role.delete({
            where: {
                id: id
            }
        });

        logger.info(req);
        return Response.json(successResponse({ message : 'Resource deleted successfully.'}, 1), { status: 200 });

    } catch (error) {
        console.log('[ROLE_DELETE]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}