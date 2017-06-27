import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-restricted',
    templateUrl: 'restricted.component.html'
})

export class RestrictedComponent implements OnInit {

    public message: string;

    constructor() {
        this.message = 'Hello from RestrictedComponent ctor';
    }

    ngOnInit(): void {
    }
}
