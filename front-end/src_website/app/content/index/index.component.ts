import { Component, OnInit } from "@angular/core";
import { MovieService } from "./../../service/movie.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import *  as io from 'socket.io-client';
import { AuthService } from "./../../service/auth.service";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
    moviebo: any;
    moviele: any;
    todaydate = new Date();
    movie: any = [];
    socket: any;
    loggedIn;
    userName: any;

    avatar: any;
    images;
    status = false;

    array: any = [];
    list: any = [];

    constructor(
        private movieService: MovieService,
        public authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) {
        this.authService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            console.log(this.loggedIn);
            if (this.loggedIn == true) {
                this.getUser();
            }
        });
    }

    toggleForm() {
        if(this.loggedIn==false){
            alert("You must login first")
        }else{
            this.authService.getFavorite().subscribe((user) => {
                this.userName = user[0].name;
                this.router.navigateByUrl('/chat');
                // console.log(favoriteMovie);
                // console.log(this.favoriteMovie);
            });
        }
    }

    selectImage(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.images = file;
            // console.log(this.images);
            this.avatar = this.images.name;
            this.status = true;
        }
        const formData = new FormData();
        formData.append('file', this.images);

        this.http.post<any>('http://localhost:4000/api/file', formData).subscribe(
            (res) => {
                console.log(res);
                this.avatar = this.images.name;
            },
            (err) => console.log(err)
        );
    }

    getUser(){
        this.authService.getFavorite().subscribe((user) => {
            this.userName = user[0].name;
            console.log(this.userName);
            // console.log(favoriteMovie);
            // console.log(this.favoriteMovie);
        });
    }

    ngOnInit() {
        this.get8Moviebo();
        this.get8Moviele();
    }

    getAllMovie() {
        this.movieService.getAllMovie().subscribe(
            (movie) => {

                // this.run_time.push(movie[0].run_time);
                // this.release_year.push(movie[0].release_year);

                // this.movieType = movie;
                this.movie = movie;


                // get time and release_year

                // for (var i = 1; i < Object.keys(movie).length; i++) {
                //     for (var j = 0; j < this.run_time.length; j++) {
                //         if (movie[i].run_time == this.run_time[j]) {
                //             break;
                //         }
                //         else {
                //             if (j == this.run_time.length - 1) {
                //                 this.run_time.push(movie[i].run_time);
                //                 break;
                //             }
                //             continue;
                //         }
                //     }
                //     for (var j = 0; j < this.release_year.length; j++) {
                //         if (movie[i].release_year == this.release_year[j]) {
                //             break;
                //         }
                //         else {
                //             if (j == this.release_year.length - 1) {
                //                 this.release_year.push(movie[i].release_year);
                //                 break;
                //             }
                //             continue;
                //         }
                //     }
                // }
                // this.release_year = this.release_year.sort(function (a, b) { return a - b });
                // this.run_time = this.run_time.sort(function (a, b) { return a - b });
                // this.run_time.unshift("Tất cả");
                // this.release_year.unshift("Tất cả");
            }
        );

    }

   
    

    get8Moviebo() {
        this.movieService.get8Moviebo().subscribe((Movie) => {
            this.moviebo = Movie;
        });
    }

    get8Moviele() {
        this.movieService.get8Moviele().subscribe((Movie) => {
            this.moviele = Movie;
        });
    }

    
}
