import db from '@/lib/db';

import jwt from 'jsonwebtoken';

import { internalErrorResponse, notFoundResponse, notAuthorizedResponse } from '@/lib/errorException';
import { compare } from 'bcrypt';
import { successResponse } from '@/lib/genericResponse';

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
                    name : "seller"
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
            return Response.json(notAuthorizedResponse("Password is incorrect"), { status: 401 })
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role.name
        }

        const token = jwtSign(payload);

        const resp = {
            token : token,
        }

        return Response.json(successResponse(resp), { status: 200 })


    } catch (error) {
        console.log('[LOGIN_SELLER]', error);
        return Response.json(internalErrorResponse(error), { status: 500 });
    }
}