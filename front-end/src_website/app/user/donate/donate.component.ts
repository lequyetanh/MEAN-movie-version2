import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../service/auth.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
    loggedIn;
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.authService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (this.loggedIn == false) {
                this.router.navigateByUrl('/login');
            }
        });
    }

    ngOnInit() {
    }

}
