export const errorResponse = (message, code) => {
    code = code || '500';
    return JSON.stringify(
        {
            error:{
                code:code,
                message:message
            }
        },
        null,
        4,
    );
}

export const successResponse = (result) => {
    return JSON.stringify(
        { result },
        null,
        4,
    );
}