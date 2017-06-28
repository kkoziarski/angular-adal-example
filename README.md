# Angular Azure AD example

Copy of [ng2-adal-QuickStart](https://github.com/ranveeraggarwal/ng2-adal-QuickStart) implemented with angular-cli. Adal library used: [ng2-adal](https://github.com/sureshchahal/angular2-adal)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.


## Development
Go to `.\src\app\_services\` and replace `secret.service.ts.template` with `secret.service.ts` and your actual values.

Run
```
npm install
ng serve -o
````


# Azure portal setup
[Azure Portal](https://portal.azure.com)

`Left Menu -> Azure Active Directory -> App registrations -> Select your AD app`


## Setup __Reply URLs__
`Your AD app -> All settings -> Reply URLs`

Set `http://localhost:4200/auth-callback`

<img src="https://raw.githubusercontent.com/krzyhook/angular-adal-example/master/img/azure-ad-replay-urls.png"></img>

## How to get __tenant__
<img src="https://raw.githubusercontent.com/krzyhook/angular-adal-example/master/img/azure-ad-tenantID.png"></img>

## How to get __clientId__
`Your AD app -> All settings -> Application ID`

## Enable Implicit Flow
`Your AD app -> Manifest`

Set `oauth2AllowImplicitFlow` to `true`
## Manifest
<img src="https://raw.githubusercontent.com/krzyhook/angular-adal-example/master/img/azure-ad-manifest.png"></img>