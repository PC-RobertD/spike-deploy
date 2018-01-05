import { ChildProcess, spawn, execSync } from 'child_process';

// Enable all logging output from SLS framework
process.env['SLS_DEBUG'] = '*';

// Enable error logging from our Lambdas
process.env['NODE_ENV'] = 'development';

// We need to setup a dummy (non-empty) ARN value so that the serverless-offline authentication logic kicks in and stubs out our
// identity claims properly.
process.env['COGNITO_AUTHORIZER_ARN'] = 'dummy-cognito-arn';

if (!process.env['ELASTICSEARCH_NODES']) {
    try {
        const stdout = execSync('docker-machine ip default');
        const ipAddress = stdout.toString().replace(/\r/, "").replace(/\n/, "");
        const elasticSearchNodeUrl = `http://elastic:changeme@${ipAddress}:9200`;
        process.env['ELASTICSEARCH_NODES'] = elasticSearchNodeUrl;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const nodeArgs = [
    '--inspect=3001',
    'node_modules/serverless/bin/serverless',
    'offline',
    '--color=full'
];

spawn(process.execPath, nodeArgs, { stdio: 'inherit' });