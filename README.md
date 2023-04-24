# Wildduck API Client

## A NodeJS client to communicate with the Wildduck API.

[![npm](https://ico.y.gy/npm/dm/@marxlnfcs/wildduck-api?style=flat-square&logo=npm)](https://www.npmjs.com/package/@marxlnfcs/wildduck-api)
[![NPM](https://ico.y.gy/npm/l/@marxlnfcs/wildduck-api?style=flat-square&color=brightgreen)](https://www.npmjs.com/package/@marxlnfcs/wildduck-api)
[![Snyk Vulnerabilities for npm package](https://ico.y.gy/snyk/vulnerabilities/npm/@marxlnfcs/wildduck-api?style=flat-square&logo=snyk)](https://snyk.io/test/npm/@marxlnfcs/wildduck-api)
[![Website](https://ico.y.gy/website?down_color=red&down_message=offline&label=repository&up_color=success&up_message=online&url=https%3A%2F%2Fgithub.com%2Fmarxlnfcs%2Fwildduck-api&style=flat-square&logo=github)](https://github.com/marxlnfcs/wildduck-api)

> **Warning**
> This library is still in progress and might have some bugs or features that are not working properly.
> If you find some bugs or missing/not working features, please feel free to create an issue.

> You can find all endpoints here: [Wildduc API Documentation](https://docs.wildduck.email)

## Installation
```
npm i @marxlnfcs/wildduck-api
```

## Usage
```
(async () => {
     
    // create a new client instance
    const client = createWildduckClient({
        baseUrl: 'http://api.wildduck.mail',
        accessTOken: 'super-secret-access-key'
    });
    
    // list all users
    console.log(await client.users.getUsers());

});
```

## Wildduck API Client
This simple client implements all Wildduck-API endpoints.

### Features
* Addresses
* ApplicationPasswords
* Archive
* Archive
* Audit
* Authentication
* AutoReplies
* Certificates
* DKIM
* DomainAccess
* DomainAliases
* Filters
* Mailboxes
* Messages
* Settings
* Storage
* Submission
* TwoFactorAuth
* Users
* Webhooks
* Exports


### Configuration 
``` javascript
createWildduckClient({
  baseUrl: string,
  accessToken: string,
  timeout?: number;
  proxy?: ClientProxySettings | string;
  rejectUnauthorized: boolean;
})
```
#### ClientOptions
| Property           | Type                       | Default | Description                                                 |
|--------------------|----------------------------|---------|-------------------------------------------------------------|
| baseUrl            | string                     | -       | URL to the wildduck api                                     |
| accessToken        | string                     | -       | Access token to authenticate with the wildduck api          |
| timeout            | number                     | null    | Defines the timeout of api requests in milliseconds         |
| proxy              | ClientProxyOptions, string | null    | Whether to use a proxy or not                               |
| rejectUnauthorized | boolean                    | true    | If false, the client rejects all unsecure https connections | 


#### ClientProxyOptions
| Property      | Type        | Default   | Description                   |
|---------------|-------------|-----------|-------------------------------|
| protocol      | http, https | null      | Protocol the proxy uses       |
| url           | string      | null      | Proxy URL                     |
| host          | string      | null      | Hostname of the proxy         |
| port          | number      | null      | Port of the proxy             |
| auth.username | string      | null      | Username to authenticate with |
| auth.password | string      | null      | Password to authenticate with |