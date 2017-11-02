import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { AdalService } from 'ng2-adal/dist/core';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-restricted',
    templateUrl: 'restricted.component.html'
})

export class RestrictedComponent implements OnInit {
    public _user: any;
    public _apiValues: any;
    public loadedUserSub: any;
    public isLoggedIn: boolean;
    public apiType: string;
    public message: string;

    constructor(
        private location: Location,
        private authService: AuthService,
        private adalService: AdalService) {

        this.apiType = 'secrets';
        this.message = 'Hello from RestrictedComponent';
    }

    ngOnInit() {
        this.loadedUserSub = this.authService.userLoadededEvent
            .subscribe(user => {
                this._user = user;
            });
        this.authService.isLoggedIn().subscribe(u => this.isLoggedIn = u);
    }

    clearCache() {
        this.authService.clearCache();
    }

    getUser() {
        this.authService.getUser();
    }

    callApi() {
        const url = `${environment.apiServerUrl}/api/${this.apiType}`;
        this.authService
            .callApi(url)
            .subscribe(result => {
                this._apiValues = result; //.json();
            },
            error => console.log(error));
    }

    acquireToken() {
        this.authService.acquireToken()
            .subscribe(p => {
                console.log("Acquired token = " + p);
                //then you could set Authorization Bearer header and call microsft graph api
            },
            (error => {
                console.log(error);
            }));
    }
}
