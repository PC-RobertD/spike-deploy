import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { Client } from 'elasticsearch';

export const create: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!',
    }),
  };

  cb(null, response);
}