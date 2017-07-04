import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AdalService } from 'ng2-adal/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public isLoggedIn: boolean;
    public message: string;

    constructor(private authService: AuthService, private adalService: AdalService) {
        this.message = 'Hello from HomeComponent';
    }

    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe(u => this.isLoggedIn = u);
    }
    public logIn() {
        this.adalService.login();
    }
    public logOut() {
        this.adalService.logOut();
    }
}
