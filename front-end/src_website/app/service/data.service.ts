import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    uid = '';
    moviesURL: string = 'http://localhost:4000/movie';
    countryURL: string = 'http://localhost:4000/country';
    categoryURL: string = 'http://localhost:4000/category';
    userURL: string = "http://localhost:4000/api";
    useURL: string = "http://localhost:4000/user";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        private afAuth: AngularFireAuth,
        private dbf: AngularFirestore
    ) {
        this.afAuth.authState.subscribe(auth => {
            auth ? this.uid = auth.uid : this.uid = null;
            // console.log(this.uid);
        });
        // this.getMovieCategory();
    }

    getCountry() {
        return this.http.get(`${this.countryURL}`);
    }

    getCategory() {
        return this.http.get(`${this.categoryURL}`);
    }


    // Create
    createmovie(data): Observable<any> {
        let url = `${this.moviesURL}/create`;
        // console.log(data);
        return this.http.post(url, data)
            .pipe(
                catchError(this.errorMgmt)
            )
    }

    createUser(data): Observable<any> {
        let url = `${this.useURL}/create`;
        console.log(data);
        return this.http.post(url, data)
            .pipe(
                catchError(this.errorMgmt)
            )
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    addFavoriteMovie(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.useURL}/update/${id}`;
        return this.http
        .put(url, data, { headers: this.headers })
        .pipe(catchError(this.errorMgmt));
    }

    getAllUser(): Observable<any> {
        return this.http.get(`${this.useURL}`);
    }

    getUserFromName(name): Observable<any> {
        return this.http.get(`${this.useURL}/detailUser/name/${name}`);
    }

    addWatchLater(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.useURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }


    getMovieCategory(category: string) {
        this.dbf.collection('Users')
        .doc(`${this.uid}`)
        .collection('movie').doc('favoritemovie').get().subscribe(movie=>{
            console.log(movie);
        });
    }

    updateAvatar(id, name){
        console.log(name);
        return this.http.put(`${this.useURL}/update/${id}/avatar`, name);
    }
}


// ===============================================get, post, put, delete Admin ======================================