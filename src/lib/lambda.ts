import { ProxyResult } from "aws-lambda";

export function createInternalServerErrorResponse(error: Error | string): ProxyResult {
    return {
        statusCode: 500,
        body: JSON.stringify({
            error: createErrorBodyResponse(error),
        }),
    };
}

function createErrorBodyResponse(error: Error | string): object {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
        if (error instanceof Error) {
            console.error(typeof(error));
            return error;
        } else {
            return {
                message: error,
            }
        }
    } else {
        return {
            message: 'An internal server error has occured',
        };
    }
}

export function createNotFoundResponse(): ProxyResult {
    return {
        statusCode: 404,
        body: JSON.stringify({
            message: 'Not found',
        }),
    }
}