export function notFoundResponse(message) {
    return {
        status: 404,
        message: "NOT_FOUND",
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
        status: 422,
        message: "VALIDATION_ERROR",
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
        status: 400,
        message: "BAD_REQUEST",
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
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
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
        status: 401,
        message: "UNAUTHORIZED",
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
        status: 403,
        message: "FORBIDDEN",
        recordsTotal: 0,
        data: null,
        error: {
            name: "Forbidden",
            message: message ? message : "Forbidden.",
            validation: null
        }
    };
}