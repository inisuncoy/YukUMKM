import db from "@/lib/db";

import { successResponse } from "@/lib/genericResponse";
import { internalErrorResponse, notFoundResponse } from "@/lib/errorException";


import logger from "@/services/logger";

export async function GET(
    req
) {
    try {
        if (req.nextUrl) {
            return Response.json(notFoundResponse(), { status: 404 });
        }
        
        const url = req.nextUrl
        const searchParams = url.searchParams;


        if (searchParams.get('id')) {
            
            const id = searchParams.get('id');
        
            const data = await db.blog.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
            });

            if (!data) {
                return Response.json(notFoundResponse(), { status: 404 });
            }

            logger.info(req)

            return Response.json(successResponse(data, 1), { status: 200 });
        }

        let baseQuery = {
            where: {},
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        };

        const userId = searchParams.get('userId')
        if (userId !== null) {
            baseQuery.where.user_id = userId;
        }

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