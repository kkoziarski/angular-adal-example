# Angular Azure AD example

Copy of [ng2-adal-QuickStart](https://github.com/ranveeraggarwal/ng2-adal-QuickStart) implemented with angular-cli. Adal library used: [ng2-adal](https://github.com/sureshchahal/angular2-adal)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.


# Development
Go to `.\src\app\_services\` and replace `secret.service.ts.template` with `secret.service.ts` and your actual values.

Run
```
npm install
ng serve -o
````

## Routes
* `/home` - main page with Login/Logout buttons
* `/restricted` - a protected with `AuthenticationGuard.canActivate`
* `/unauthorized` - user will be redirected here when tries to access `/restricted` route but is not logged-in. Use _Login_ button first on `/home` page.
* `/auth-callback` - here Azure AD will redirect after successful login/logout process. It must be configured in Azure portal in _Reply URLs_ section and in `secret.service.ts` as `redirectUri` and `postLogoutRedirectUri`.


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