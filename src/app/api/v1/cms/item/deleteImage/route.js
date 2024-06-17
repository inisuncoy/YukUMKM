import db from "@/lib/db";

import { successResponse } from "@/lib/genericResponse";
import { internalErrorResponse, notFoundResponse } from "@/lib/errorException";
import path from "path";
import { Auth } from "@/lib/jwtTokenControl";

import logger from "@/services/logger";
import { unlink } from "fs";

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('id');
        const itemId = searchParams.get('itemId');

        if (!id || !itemId) {
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