import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdalService } from 'ng2-adal/core';

@Component({
    selector: 'app-unauthorized',
    templateUrl: 'unauthorized.component.html'
})

export class UnauthorizedComponent implements OnInit {

    public message: string;

    constructor(private adalService: AdalService, private location: Location) {
        this.message = 'Hello from UnauthorizedComponent';
    }

    ngOnInit(): void {
    }
    public logIn() {
        this.adalService.login();
    }
    goback() {
        this.location.back();
    }
}
