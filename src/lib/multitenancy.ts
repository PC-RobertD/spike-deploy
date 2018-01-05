import { APIGatewayEvent } from 'aws-lambda';

import { configuration } from './config';

export const getTenant = (event: APIGatewayEvent): string => {
    if(!event.requestContext.authorizer || !event.requestContext.authorizer.claims) {
        throw new Error('No claims are defined on the given event. This indicates the API gateway has not been configured with an authorizer.');
    }

    const tenantClaim = configuration.tenantClaim;
    const tenant = event.requestContext.authorizer.claims[tenantClaim];

    if (tenant) {
        return tenant;
    } else {
        throw new Error('No tenant has been defined for the current user');
    }
}