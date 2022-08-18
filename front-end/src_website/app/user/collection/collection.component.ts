import { Component, OnInit } from "@angular/core";
import { MovieService } from "./../../service/movie.service";
import { AuthService } from "./../../service/auth.service";
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../../service/data.service";

@Component({
    selector: "app-collection",
    templateUrl: "./collection.component.html",
    styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {
    favoriteMovie: any;
    watchLater: any;
    movies: any;
    loggedIn;
    listFavorite: any = [];
    listWatchLater: any = [];
    userId: any;
    user: any;
    constructor(
        private movieService: MovieService,
        private authService: AuthService,
        private dataService: DataService,
        private router: Router,
        private ngZone: NgZone,
    ) {
        window.scrollTo({ left: 0, top: 0 });
        
    }

    ngOnInit() {
        this.authService.loggedIn.subscribe(loggedIn => {//cái hàm này chỉ chạy khi mày gõ url và enter còn nếu click trong trang web thì lại ko chạy đéo hiểu tại sao?
            console.log(loggedIn);
            this.loggedIn = loggedIn;
            if (this.loggedIn == false) {
                this.router.navigateByUrl('/login');
            } else {
                
            }
        });
        this.getAllMovie();
    }

    getAllMovie() {
        this.listFavorite = [];
        this.listWatchLater = [];
        this.authService.getFavorite().subscribe((favoriteMovie) => {
            // console.log(favoriteMovie);
            this.userId = favoriteMovie[0].id;
            this.favoriteMovie = favoriteMovie[0].favorite;
            this.watchLater = favoriteMovie[0].watchLater;
            // console.log(this.favoriteMovie);
            this.movieService.getAllMovie().subscribe((Movie) => {
                this.movies = Movie;
                // console.log(this.movies[0]);
                for (var i = 0; i < this.favoriteMovie.length; i++) {
                    for (var j = 0; j < this.movies.length; j++) {
                        if (this.movies[j].id == this.favoriteMovie[i]) {
                            this.listFavorite.push(this.movies[j]);
                        }
                    }
                }

                for (var i = 0; i < this.watchLater.length; i++) {
                    for (var j = 0; j < this.movies.length; j++) {
                        if (this.movies[j].id == this.watchLater[i]) {
                            this.listWatchLater.push(this.movies[j]);
                        }
                    }
                }
            });
        });
    }

    removeFavorite(id: number): void {
        this.movieService.getUserFromId(this.userId).subscribe(user => {
            this.user = user;
            this.user[0].favorite.splice(this.user[0].favorite.indexOf(id), 1);
            // console.log(this.user[0]);
            this.dataService.addFavoriteMovie(this.userId, this.user[0]).subscribe(res => {
                this.ngOnInit();
                console.log('Content updated successfully!')
            }, (error) => {
                console.log(error)
            })
        });

    }

    removeWatchLater(id: number): void {
        this.movieService.getUserFromId(this.userId).subscribe(user => {
            this.user = user;
            this.user[0].watchLater.splice(this.user[0].watchLater.indexOf(id), 1);
            // console.log(this.user[0]);
            this.dataService.addFavoriteMovie(this.userId, this.user[0]).subscribe(res => {
                this.ngOnInit();
                console.log('Content updated successfully!')
            }, (error) => {
                console.log(error)
            })
        });

    }
}
