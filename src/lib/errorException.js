export function notFoundResponse(message) {
    return {
        code: 404,
        status: "NOT_FOUND",
        recordsTotal: 0,
        data: null,
        error: {
            name: "DoesNotExist",
            message: message ? message : "Resource not found.",
            validation: null
        }
    };
}

export function validationErrorResponse(validation) {
    return {
        code: 422,
        status: "VALIDATION_ERROR",
        recordsTotal: 0,
        data: null,
        error: {
            name: "ValidationError",
            message: "Validation error.",
            validation: validation
        }
    };
}

export function badRequestResponse(message) {
    return {
        code: 400,
        status: "BAD_REQUEST",
        recordsTotal: 0,
        data: null,
        error: {
            name: "BadRequest",
            message: message ? message : "Bad request.",
            validation: null
        }
    };
}

export function internalErrorResponse(error) {
    return {
        code: 500,
        status: "INTERNAL_SERVER_ERROR",
        recordsTotal: 0,
        data: null,
        error: {
            name: "InternalServerError",
            message: error.message,
            validation: null
        }
    };
}

export function notAuthorizedResponse(message) {
    return {
        code: 401,
        status: "UNAUTHORIZED",
        recordsTotal: 0,
        data: null,
        error: {
            name: "NotAuthorized",
            message: message ? message : "Not authorized.",
            validation: null
        }
    };
}

export function forbiddenResponse(message) {
    return {
        code: 403,
        status: "FORBIDDEN",
        recordsTotal: 0,
        data: null,
        error: {
            name: "Forbidden",
            message: message ? message : "Forbidden.",
            validation: null
        }
    };
}