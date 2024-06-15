import db from '@/lib/db';

import { successResponse } from '@/lib/genericResponse';
import { internalErrorResponse, notFoundResponse } from '@/lib/errorException';

import logger from '@/services/logger';

export async function GET(req) {

  try {    
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    if (searchParams.get('id')) {
      const id = searchParams.get('id');

      const data = await db.role.findUnique({
        where: {
          id: id,
        },
      });

      if (!data) {
        return Response.json(notFoundResponse(), { status: 404 });
      }

      return Response.json(successResponse(data, 1), { status: 200 });
    }

    let baseQuery = {
      include: {},
      orderBy: {
        created_at: 'desc',
      },
    };

    const datas = await db.role.findMany(baseQuery);

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
