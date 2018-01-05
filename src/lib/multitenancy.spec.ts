import { APIGatewayEvent, APIGatewayEventRequestContext, AuthResponseContext } from 'aws-lambda';
import { random } from 'faker';

import { configuration } from './config';
import { getTenant } from './multitenancy';

describe('getTenant', () => {
    it('should throw if authorizer is null or undefined', () => {
        const event = createUnauthorizedGatewayEvent();
        expect(() => getTenant(event)).toThrow('No claims are defined on the given event. This indicates the API gateway has not been configured with an authorizer.');
    });

    it('should throw if current user has no tenant claim', () => {
        const event = createAuthorizedGatewayEvent();
        expect(() => getTenant(event)).toThrow('No tenant has been defined for the current user');
    });

    it('should return tenant name when tenant claim exists', () => {
        const tenantName = random.alphaNumeric();
        const event = createAuthorizedGatewayEventWithTenant(tenantName);
        const result = getTenant(event);

        expect(result).toBe(tenantName);
    });
});

function createUnauthorizedGatewayEvent(): APIGatewayEvent {
    return {
        requestContext: {}
    } as APIGatewayEvent;
}

function createAuthorizedGatewayEvent(): APIGatewayEvent {
    const requestContext: APIGatewayEventRequestContext = {
        authorizer: {
            claims: {

            } as any,
        },
        accountId: '',
        apiId: '',
        httpMethod: '',
        identity: {} as any,
        requestId: '',
        resourceId: '',
        resourcePath: '',
        stage: ''
    };

    return {
        requestContext
    } as APIGatewayEvent;
}

function createAuthorizedGatewayEventWithTenant(tenantName: string) {
    const event = createAuthorizedGatewayEvent();
    event.requestContext.authorizer.claims[configuration.tenantClaim] = tenantName;
    return event;
}