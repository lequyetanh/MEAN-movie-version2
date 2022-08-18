import { Component, OnInit, Input, NgZone } from "@angular/core";
import { Movie } from "../../../movieModel/movieModel";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MovieService } from "./../../service/movie.service";
import { DataService } from "./../../service/data.service";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "./../../service/auth.service";

@Component({
    selector: "app-detailmovie",
    templateUrl: "./detailmovie.component.html",
    styleUrls: ["./detailmovie.component.scss"],
})
export class DetailmovieComponent implements OnInit {
    movie: any;
    movies: any = [];
    id: any;
    userId: any;
    loggedIn;
    user: any;
    favorite = false;
    watchLater = false;
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private dataService: DataService,
        private location: Location,
        public authService: AuthService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) {

        this.getLogin();
        window.scrollTo({ left: 0, top: 0 });
    }

    getLogin() {
        this.authService.loggedIn.subscribe(loggedIn => {
            console.log(loggedIn);
            this.loggedIn = loggedIn;
            console.log(this.loggedIn);
            if (this.loggedIn == false) {

            } else {
                this.getFavorite();
            }
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            this.getFavorite();
            window.scrollTo({ left: 0, top: 0 });
            this.movies = [];
            this.id = paramMap.get('id');
            this.movieService.getMovieFromId(this.id).subscribe((movie) => {
                this.movie = movie;
                // console.log(this.movie);
                const category = this.movie[0].release_year;
                // console.log(id);
                this.movieService
                    .getMovieFromCategory(category)
                    .subscribe((category) => {
                        // this.movies = category;
                        // console.log(this.movies.indexOf(this.movie[0]));
                        // // this.movies.splice(this.movies.indexOf(this.movie[0])-1,1);
                        // console.log(this.movies);
                        for (var i = 0; i < Object.keys(category).length; i++) {
                            if (category[i].id == this.id) {
                                continue;
                            } else {
                                this.movies.push(category[i]);
                            }
                        }
                    });
            });
        })

        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }

    getFavorite() {
        // console.log(this.loggedIn);
        this.authService.getFavorite().subscribe((favoriteMovie) => {
            // console.log(favoriteMovie);
            this.userId = favoriteMovie[0].id;
            for (var i = 0; i < favoriteMovie[0].favorite.length; i++) {
                if (favoriteMovie[0].favorite[i] == this.id) {
                    this.favorite = true;
                    break;
                } else {
                    if (i == favoriteMovie[0].favorite.length - 1) {
                        this.favorite = false;
                    }
                    continue;
                }
            }

            // console.log(this.favorite);

            for (var i = 0; i < favoriteMovie[0].watchLater.length; i++) {
                if (favoriteMovie[0].watchLater[i] == this.id) {
                    this.watchLater = true;
                    break;
                } else {
                    if (i == favoriteMovie[0].watchLater.length - 1) {
                        this.watchLater = false;
                    }
                    continue;
                }
            }

            this.movieService.getUserFromId(this.userId).subscribe((user) => {
                this.user = user;
                // console.log(this.user);
            });
        });
    }

    movieDetail(id: any): void {
        console.log("function");
        this.movieService.getMovieFromId(id).subscribe((movie) => {
            this.movie = movie;
            console.log(this.movie);
            const category = this.movie[0].release_year;
            // console.log(id);
            this.movieService
                .getMovieFromCategory(category)
                .subscribe((category) => {

                    this.movies = category;
                    // this.movies.splice(this.movies.indexOf(this.movie))
                });
        });

        // console.log(this.movie);
    }

    pushFavorite(id: any) {
        // console.log(this.loggedIn);
        if (this.loggedIn == false) {
            alert("You must login to use this function");
        } else {
            if (this.user[0].favorite[0] == undefined) {
                this.user[0].favorite.push(id);
                this.favorite = !this.favorite;
                this.dataService
                    .addFavoriteMovie(this.userId, this.user[0])
                    .subscribe(
                        (res) => {
                            alert("Add to favorite successfully");
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
            else {
                for (var i = 0; i < this.user[0].favorite.length; i++) {
                    if (this.user[0].favorite[i] === id) {
                        alert("This movie existed in favorite");
                        break;
                    } else {
                        if (i === this.user[0].favorite.length - 1) {
                            this.user[0].favorite.push(id);
                            this.favorite = !this.favorite;
                            this.dataService
                                .addFavoriteMovie(this.userId, this.user[0])
                                .subscribe(
                                    (res) => {
                                        alert("Add to favorite successfully");
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );
                            break;
                        }
                        continue;
                    }
                }
            }
        }
    }

    removeFavorite(id: number): void {
        this.movieService.getUserFromId(this.userId).subscribe(user => {
            this.user = user;
            this.user[0].favorite.splice(this.user[0].favorite.indexOf(id), 1);
            // console.log(this.user[0]);
            this.dataService.addFavoriteMovie(this.userId, this.user[0]).subscribe(res => {
                this.ngOnInit();
                alert("Remove from favorite successfully");
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
                console.log('Remove from watch later successfully!')
            }, (error) => {
                console.log(error)
            })
        });

    }

    pushWatchLater(id: any) {
        if (this.loggedIn == false) {
            alert("You must login to use this function");
        } else {
            if (this.user[0].watchLater[0] == undefined) {
                this.user[0].watchLater.push(id);
                this.watchLater = !this.watchLater;
                this.dataService
                    .addFavoriteMovie(this.userId, this.user[0])
                    .subscribe(
                        (res) => {
                            alert("Add to watchLater successfully");
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
            else {
                for (var i = 0; i < this.user[0].watchLater.length; i++) {
                    if (this.user[0].watchLater[i] === id) {
                        alert("This movie existed in watchLater");
                        break;
                    } else {
                        if (i === this.user[0].watchLater.length - 1) {
                            this.user[0].watchLater.push(id);
                            this.watchLater = !this.watchLater;
                            this.dataService
                                .addFavoriteMovie(this.userId, this.user[0])
                                .subscribe(
                                    (res) => {
                                        alert("Add to watchLater successfully");
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );
                            break;
                        }
                        continue;
                    }
                }
            }
        }
    }

    onSubmit(id: any): void {
        this.movieService.getMovieFromId(id).subscribe((movie) => {
            this.movie = movie;
            console.log(this.movie);
        });
    }
}

// bi bug ở chỗ favorite watchLater
