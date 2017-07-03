import { Component, OnInit } from '@angular/core';
import { AdalService } from 'ng2-adal/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;

    constructor(private adalService: AdalService) {
        this.message = 'Hello from HomeComponent';
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
