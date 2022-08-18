
import { MovieService } from '../service/movie.service';
import { DataService } from '../service/data.service';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    movies: any;
    loggedIn: any;
    admin: any;
    genre: any = [];
    country: any = [];
    allUser: any;
    statusAccess = false;
    constructor(
        private movieService: MovieService,
        private dataService: DataService,
        public authService: AuthService,
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone) {

        this.authService.checkLogin().subscribe(loggedIn => {
            if (loggedIn['loggedIn']) {
                this.authService.accessAdmin().subscribe(admin => {
                    // console.log(admin);
                    if (admin['admin']) {
                        this.statusAccess = true;
                        // console.log("access successfully");
                    } else {
                        this.statusAccess = false;
                        alert("You do not have permission to access this directory");
                        this.ngZone.run(() => this.router.navigateByUrl('/movie'));
                    }
                });
            }else{
                alert("You have to loggin with admin position first");
                this.ngZone.run(() => this.router.navigateByUrl('/movie'));
            }

        });

        // console.log(this.authService.loggedIn['loggedIn']);


    }

    private allItems: any[];
    pager: any = {};
    pagedItems: any[];

    ngOnInit() {
        this.getAllMovie();
        this.getAllCountry();
        this.getAllGenre();
        this.getAllUser();
    }

    getAllUser() {
        this.dataService.getAllUser().subscribe((allUser) => {
            this.allUser = allUser;
        })
    }

    deleteUser(id: number): void {
        let result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            this.movieService.deleteUser(id).subscribe(
                (res) => {
                    this.ngOnInit();
                    console.log('User successfully delete!');
                }, (error) => {
                    console.log(error);
                });
        }
    }

    getAllMovie(): void {
        this.movieService.getAllMovie().subscribe(
            (Movie) => {
                this.movies = Movie;
                this.setPage(1);
            }
        )
    }

    getAllCountry() {
        this.movieService.getCountry().subscribe(data => {
            this.country = data;
        })
    }

    getAllGenre() {
        this.movieService.getCategory().subscribe(data => {
            this.genre = data;
        })
    }

    delete(id: number): void {
        let result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            this.movieService.deleteMovie(id).subscribe(
                (res) => {
                    this.ngOnInit();
                    console.log('Movie successfully delete!');
                }, (error) => {
                    console.log(error);
                });
        }
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.movieService.getPager(this.movies.length, page);

        // get current page of items
        this.pagedItems = this.movies.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}
