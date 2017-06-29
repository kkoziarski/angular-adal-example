import { Component, OnInit } from '@angular/core';
import { AdalService } from '../_services/adal.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;

    constructor(private adalService: AdalService) {
        this.message = 'Hello from HomeComponent';

        console.log('User info from JWT');
        console.log(this.adalService.userInfo);
        console.log('JWT Token');
        console.log(this.adalService.accessToken);
    }

    ngOnInit(): void {
    }
    public logIn() {
        this.adalService.login();
    }
    public logOut() {
        this.adalService.logOut();
    }
}
