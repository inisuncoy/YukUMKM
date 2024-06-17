import { Auth } from "@/lib/jwtTokenControl";

import db from "@/lib/db";

import logger from "@/services/logger";

import { successResponse } from "@/lib/genericResponse";
import { internalErrorResponse, notFoundResponse } from "@/lib/errorException";

export async function GET(
    req
) {
    try {
        const userId = await Auth(req);

        if (!userId) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        let data = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile_uri: true,
                address: true,
                role_id: true,
                role: true,
                created_at: true,
                updated_at: true,
                created_by: true,
                updated_by: true,
            },            
        });

        if (!data) {
            return Response.json(notFoundResponse(), { status: 404 });
        }

        if (data.role.name == "seller") {
            data = await db.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profile_uri: true,
                    address: true,
                    role_id: true,
                    role: true,
                    detail_seller: true,
                    created_at: true,
                    updated_at: true,
                    created_by: true,
                    updated_by: true,
                },            
            });
        }

        logger.info(req)

        return Response.json(successResponse(data, 1), { status: 200 });

    } catch (error) {
        console.log('[PROFILE_GET]', error);
        logger.error(req, {
            stack: error,
        });
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}