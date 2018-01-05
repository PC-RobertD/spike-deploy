import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const info: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            event: event,
            context: context,
        }, null, 2),
    };
    cb(null, response);
}