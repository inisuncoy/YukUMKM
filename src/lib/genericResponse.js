export function successResponse(data, recordsTotal) {
    return {
        status: 200,
        message: "OK",
        recordsTotal: recordsTotal || 0,
        data: data,
        error: null
    };
}

export function createdResponse(message) {
    return {
        status: 201,
        message: "CREATED",
        recordsTotal: 1,
        data: message || {
            message : "Resource created successfully."
        },
        error: null
    };
}

