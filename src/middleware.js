import { isSeller } from "./lib/jwtTokenControl";

import { internalErrorResponse, notAuthorizedResponse } from "./lib/errorException";

export async function middleware(request) {
    try {
        const result = await isSeller(request)

        if (!result) {
            return Response.json(notAuthorizedResponse(), { status: 401 })
        }

        request.user = result;

    } catch (error) {
        return Response.json(internalErrorResponse(error), { status: 500 });
    }

}

export const config = {
    matcher: '/api/v1/cms/:path*',
};
