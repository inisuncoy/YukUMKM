import db from "@/lib/db";
import logger from "@/services/logger";

import { successResponse } from "@/lib/genericResponse";
import { internalErrorResponse, notFoundResponse } from "@/lib/errorException";

export async function GET(
    req
) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        if (searchParams.get('id')) {
            const id = searchParams.get('id');
        
            const data = await db.item.findUnique({
                where: {
                    id: id,
                },
                include: {
                    item_image: true,
                    item_category: true,
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

            return Response.json(successResponse(data, 1), { status: 200 });
        }

        let baseQuery = {
            include: {
                item_image: true,
                item_category: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            },
        };

        // if userId is set
        if (searchParams.get('userId')) {
            baseQuery.where.user_id = searchParams.get('userId');
        }

        // if category_ids is set
        if (searchParams.get('categoryIds')) {
            baseQuery.where.category_id = {
                in: searchParams.get('categoryIds').split(',').map(Number)
            };
        }

        // if limit and page is set
        if (searchParams.get('limit') && searchParams.get('page')) {
            const limit = parseInt(searchParams.get('limit'));
            const page = parseInt(searchParams.get('page'));

            baseQuery.skip = (page - 1) * limit;
            baseQuery.take = limit;
        }

        const data = await db.item.findMany(baseQuery);
        // logger.info(req)
        return Response.json(successResponse(data, data.length), { status: 200 });

    } catch (error) {
        logger.error(req, {
            stack: error,
        });
        
        console.log('[ITEM_GET]', error);
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}