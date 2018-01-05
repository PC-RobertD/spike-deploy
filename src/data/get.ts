import { APIGatewayEvent, Callback, Context, ProxyResult, ProxyHandler, ProxyCallback } from 'aws-lambda';
import { resolve } from 'path';

import { client } from '../lib/elasticSearch';
import { getTenant } from '../lib/multitenancy';
import { createInternalServerErrorResponse, createNotFoundResponse } from '../lib/lambda';

export const get: ProxyHandler = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback) => {
  var response = await getResponse(event);

  cb(null, response);
}

async function getResponse(event: APIGatewayEvent): Promise<ProxyResult> {
  try {
    const tenant = getTenant(event);
    const type = event.pathParameters['type'];
    const id = event.pathParameters['id'];
    const result = await getElasticSearchRecord(tenant, type, id);

    return result || createNotFoundResponse();

  } catch (error) {
    return createInternalServerErrorResponse(error);
  }
}

async function getElasticSearchRecord(index: string, type: string, id: string): Promise<any> {
  const result = await client.get({
    index: index,
    type: type,
    id: id,
  });

  return result;
}