export function successResponse(data, recordsTotal) {
    return {
        code: 200,
        status: "OK",
        recordsTotal: recordsTotal || 0,
        data: data,
        error: null
    };
}

export function createdResponse(message) {
    return {
        code: 201,
        status: "CREATED",
        recordsTotal: 1,
        data: message || {
            message : "Resource created successfully."
        },
        error: null
    };
}

