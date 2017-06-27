import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;

    constructor() {
        this.message = 'Hello from HomeComponent ctor';
    }

    ngOnInit(): void {
    }
}
