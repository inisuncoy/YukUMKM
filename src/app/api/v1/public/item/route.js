import db from "@/lib/db";
import logger from "@/services/logger";

import { successResponse } from "@/lib/genericResponse";
import { internalErrorResponse, notFoundResponse } from "@/lib/errorException";

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

            logger.info(req)

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
            where: {}
        };

        const userId = searchParams.get('userId')
        if (userId !== null) {
            baseQuery.where.user_id = userId;
        }


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