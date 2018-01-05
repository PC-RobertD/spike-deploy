# Insight API

This repository contains the implementation of the Insight APIs which are deployed to AWS. It includes the ingestion APIs for publishing data to Insight, as well as the analytics and recommendations APIs for retrieving information about the ingested data.

# Dependencies

The Insight data APIs use ElasticSearch as their database and so you will require a working ElasticSearch instance in order to run them. When running locally it is highly recommended to run ElasticSearch through Docker, and this is what the provided debugging scripts use. See the following wiki page for information on how to set this up: http://confluence.pcinfra.net/display/PI/Docker

# Debugging

## Visual Studio Code

A `launch.json` file is provided for VS Code which allows you to debug your Lambdas locally. This works by running the `serverless offline` command while enabling the Node inspector debugger interface.

# Deploying

When deploying this service to AWS there are a few environment variables which need to be defined prior to executing the `serverless deploy` command:

 - `ELASTICSEARCH_NODES` - a comma separated list of URLs for the ElasticSearch node(s) to connect to
 - `COGNITO_AUTHORIZER_ARN` - the ARN of the Cognito user pool to use to authenticate users with
 - `TENANT_CLAIM` - the name of the claim in the Lambda `requestContext.authorizer.claims` collection which contains the tenant name of the current user. Defaults to `custom:tenant` if not specified

 In addition to the environment variables above, you also need to ensure that the `serverless` command knows the client ID and secret to use to connect to the AWS API with. The simplest way of doing this is installing the AWS CLI and running the `aws configure` command. Once you have done this `serverless` will read from the same configuration as the `aws` utility.

 Once the above is completed you can deploy all of the Lambdas via the command `serverless deploy`.

 # Serverless configuration

This repository makes use of the _Serverless_ (SLS) framework for managing and deploying the Lambdas into AWS. 

## Plugins

 - `serverless-webpack` - used for building the Lambdas via webpack.
 - `serverless-offline` - allows for running the Lambdas locally via a web-server via the `serverless offline` command.
 - `serverless-plugin-git-variables` - allows us to include the Git commit hash and branch name in the Lambda descriptions.
 - `serverless-plugin-tracing` - enables X-Ray integration with the Lambdas for additional tracing. Short-term placeholder until SLS gains native X-Ray integration.

 ## Authentication

 All of the APIs in this service are designed to authenticate against a Cognito authorizer. This is handled by using the environment variable `COGNITO_AUTHORIZER_ARN` mentioned above.

 In order to test an authenticated API you must generate an ID token for the user you want to login with. This can be done by running the following command:

    aws cognito-idp admin-initiate-auth --user-pool-id <pool-id> --client-id <client-id> --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=<username>,PASSWORD=<password>