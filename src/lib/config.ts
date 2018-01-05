export interface Configuration {
    elasticSearchNodes: string[];
    logLevel: string;
    tenantClaim: string;
}

const elasticSearchNodes = process.env.ELASTICSEARCH_NODES || '';

export const configuration: Configuration = {
    elasticSearchNodes: elasticSearchNodes.split(','),
    logLevel: process.env.LOG_LEVEL || 'info',
    tenantClaim: process.env.LOG_LEVEL || 'custom:tenant',
}