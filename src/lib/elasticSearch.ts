import { Client, ConfigOptions } from 'elasticsearch';

import { configuration } from './config';

export const client = new Client({
    hosts: configuration.elasticSearchNodes,
    log: configuration.logLevel,
});