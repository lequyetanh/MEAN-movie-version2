import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    uid = '';
    loggedIn: Subject<boolean>;
    moviesURL: string = 'http://localhost:4000/movie';
    countryURL: string = 'http://localhost:4000/country';
    categoryURL: string = 'http://localhost:4000/category';
    userURL: string = "http://localhost:4000/api";
    useURL: string = "http://localhost:4000/user";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        private afAuth: AngularFireAuth,
        private dbf: AngularFirestore,
        private toastr: ToastrService,
    ) { 
        this.loggedIn = new Subject();
        if(this.getCookie('token')){
            this.checkLogin();
        }
    }

    checkLogin() {
        var cookie = this.getCookie('token');
        this.http
            .get(`${this.useURL}/checkUser`, {
                headers: {
                    authorization: cookie
                }
            }).subscribe(
                (resp: any) => {
                    console.log(resp.loggedIn);
                    // return resp.loggedIn;
                    this.loggedIn.next(resp.loggedIn);
                },
                (errorResp) => {
                    this.toastr.error(
                        "Oops, something went wrong getting the logged in status"
                    );
                }
            );
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

    checkUser() {
        var cookie = this.getCookie('token');
        if (cookie) {
            this.checkLogin();
            return this.http.get(`${this.useURL}/checkUser`, {
                headers: {
                    authorization: cookie
                }
            });
        } else {
            alert("You have login first");
        }
    }

    checkAdmin() {
        var cookie = this.getCookie('token');

        return this.http.get(`${this.useURL}/checkAdmin`, {
            headers: {
                authorization: cookie
            }
        });
    }

    login(data): Observable<any> {
        let url = `${this.useURL}/login`;
        console.log(data);
        return this.http.post(url, data);
    }

}