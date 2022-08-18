import { Component, OnInit, HostBinding, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "./../service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import *  as io from 'socket.io-client';

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
        private ngZone: NgZone,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) {
        this.mainForm();
        this.getUser();
    }

    ngOnInit() {
        this.authService.loggedIn.subscribe(loggedIn => {
            // console.log("ahihi");
            this.loggedIn = loggedIn;
            if (this.loggedIn == true) {
                // console.log("login running");
                this.router.navigateByUrl('/movie');
            }
        });
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

    login(name: string) {
        this.authService.oAuthLogin(name, (error) => {
            if (error) {
                // console.log("hello");
                this.error = error;
                this.snackBar.open(this.error, "hide", { duration: 10000 });
            } else {
                // this.authService.readUser().subscribe((authData) => {
                // window.location.reload();
                this.router.navigate(["/movie"]);
                //     if (authData) {
                //         this.translateService
                //             .get("Welcome")
                //             .subscribe((results) =>
                //                 this.snackBar.open(
                //                     results + " " + authData.displayName,
                //                     "",
                //                     { duration: 2000 }
                //                 )
                //             );
                //     }
                // });
            }
            // this.chat();
        });
    }

    getUser() {
        this.authService.getUser().subscribe((data1) => {
            this.data2 = data1;
        });
    }

    // chat(){
    //     this.authService.getFavorite().subscribe((user) => {
    //         console.log(user);
    //         this.userName = user[0].name;
    //         console.log(this.userName);
    //         this.socket.emit('Client-send-userName', this.userName);
    //     });
    // }

    doLogin() {
        // console.log(this.loginForm.value);
        for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].email == this.loginForm.value.email && this.data2[i].password == this.loginForm.value.password) {
                // window.location.reload();
                this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password);
                // this.chat();
                break;
            } else {
                if (i == this.data2.length - 1) {
                    alert("login failed");
                    break;
                }
                continue;
            }
        }

        // this.router.navigate(["/admin"]);

    }
}


