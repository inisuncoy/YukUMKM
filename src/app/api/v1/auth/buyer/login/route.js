import db from '@/lib/db';

import {
  internalErrorResponse,
  notAuthorizedResponse,
  notFoundResponse,
} from '@/lib/errorException';
import { compare } from 'bcrypt';
import { successResponse } from '@/lib/genericResponse';
import { jwtSign } from '@/lib/jwtTokenControl';

import logger from "@/services/logger";

export async function POST(
    req
) {
    try {
        const body = await req.json();
        const { email, password } = body

        const user = await db.user.findFirst({
            where: {
                email: email,
                role : {
                    name : "buyer"
                }
            },
            include: {
                role: true
            }
        });

        if (!user) {
            return Response.json(notFoundResponse("User doesn't exist"), { status: 404 })
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return Response.json(notFoundResponse("Password is incorrect"), { status: 401 })
        }

        const payload = {
          id: user.id,
          email: user.email,
          role: user.role.name,
        };

        const token = await jwtSign(payload);

        const resp = {
          token: token,
        };
      
        logger.info(req);

        return Response.json(successResponse(resp), { status: 200 })

        } catch (error) {
            logger.error(req, {
                stack: error,
            });
            console.log('[LOGIN_BUYER]', error);
            return Response.json(internalErrorResponse(error), { status: 500 });
        }
    }

