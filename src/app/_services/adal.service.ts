///<reference path='../../../node_modules/@types/adal/index.d.ts' />

import { SecretService } from './secret.service';

import { Injectable } from '@angular/core';

import 'expose-loader?AuthenticationContext!../../../node_modules/adal-angular/lib/adal.js';

const createAuthContextFn: adal.AuthenticationContextStatic = AuthenticationContext;

@Injectable()

export class AdalService {

    private context: adal.AuthenticationContext;

    constructor(private configService: SecretService) {
        this.context = new createAuthContextFn(configService.adalConfig);
    }

    login() {
        this.context.login();
    }

    logOut() {
        this.context.logOut();
    }

    handleWindowCallback() {
        this.context.handleWindowCallback();
    }

    public get userInfo() {
        return this.context.getCachedUser();
    }

    public get accessToken() {
        return this.context.getCachedToken(this.configService.adalConfig.clientId);
    }

    public get isAuthenticated() {
        return this.userInfo && this.accessToken;
    }
}
