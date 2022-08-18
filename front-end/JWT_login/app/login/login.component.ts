import { Component, OnInit, HostBinding, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import *  as io from 'socket.io-client';
import { DataService } from "./../service/data.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string;
    data2: any;
    userName: any;
    email: any;
    loggedIn;
    password: any;
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private ngZone: NgZone,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) {
        this.mainForm();
    }

    ngOnInit() {
    }

    mainForm() {
        this.loginForm = this.fb.group({
            email: [""],
            password: [""],
        });
        this.loginForm.setValue({
            email: "lequyetanh@gmail.com",
            password: "02081999",
        });
    }

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    login() {
        console.log(this.loginForm.value);
        this.dataService.login(this.loginForm.value).subscribe((dataReturn) => {
            console.log(dataReturn);
            this.setCookie('token', dataReturn.token, 1);
            this.dataService.checkLogin();
            this.router.navigateByUrl('/about');
        });
    };

}


