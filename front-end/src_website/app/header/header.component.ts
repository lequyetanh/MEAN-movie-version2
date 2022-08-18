import { Component, HostListener, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { DataService } from './../service/data.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MovieService } from './../service/movie.service';
import *  as io from 'socket.io-client';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    User: any;
    userName: any;
    
    photo: any;
    loggedIn;
    error: string;
    movieName: any;
    avatar;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    listMovie: any = [];
    movies: any = [];
    toggle = false;
    newAvatar;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone,
        public db: AngularFirestore,
        public dataService: DataService,
        public authService: AuthService,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private snackbar: MatSnackBar,
        public translateService: TranslateService,
        private media: MediaMatcher,
        private movieService: MovieService,
    ) {
        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.authService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            console.log(this.loggedIn);
            if (this.loggedIn == true) {
                this.getFavorite();
            }
        });

        // this.authService.newAvatar.subscribe(avatar => {
        //     this.newAvatar = avatar;
        //     // console.log(this.loggedIn);
        //     if (this.newAvatar == true) {
        //         this.getFavorite();
        //     }
        // });
        this.getAllMovie();
        // console.log("ahihi");
    }

    clickMe() {
        // console.log("run");
        this.toggle = !this.toggle;
        this.listMovie = this.movies;
    }

    blured() {
        // console.log("blured");
        this.toggle = false;
    }

    redirect(movie:any){
        this.router.navigate([`/detailmovie/${movie}`]);
    }

    close() {
        this.toggle = false;
    }

    getAllMovie(): void {
        this.movieService.getAllMovie().subscribe(movie => {
            this.movies = movie;

        })
    }

    removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    ngOnInit() {

    }

    onKey(event: any) { // without type info
        // console.log(event);
        this.listMovie = [];
        for (let i = 0; i < this.movies.length; i++) {
            event = this.removeAccents(event).toLowerCase();
            let name = this.removeAccents(this.movies[i].name).toLowerCase();
            // let regxName = `/${this.searchName}/i`;
            // console.log(regxName);
            if (name.search(event) == -1) {
                continue;
            }
            else {
                this.listMovie.push(this.movies[i]);
                // console.log(this.listMovie);
            }
        }
        if (this.listMovie[0] == undefined) {
            // console.log("nothing");
            this.toggle = false;
        } else {
            this.toggle = true;
        }
    }


    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    get() {
        // console.log(this.authService.getdata());
        this.afAuth.auth.onAuthStateChanged(Users => {
            // console.log(Users.displayName);
            this.User = Users;
            this.userName = this.User.displayName;
            this.photo = this.User.photoURL;
        }
        );
    }

    onKeypressEvent(event: any) {
        this.router.navigate([`/search/${event}`]);
    }

    getFavorite() {
        // console.log("collection");
        this.authService.getFavorite().subscribe(favoriteMovie => {
            this.userName = favoriteMovie[0].name;
            this.avatar = favoriteMovie[0].avatar;
            // console.log(this.avatar);
            // this.favoriteMovie = favoriteMovie[0].favorite;
            // this.watchLater = favoriteMovie[0].watchLater;
            // console.log(this.favoriteMovie);
            // console.log(this.watchLater);
        });
    }

    // getDatabase() {
    //     var infor = this.db.collection("Users").get().subscribe(querySnapshot => {
    //         querySnapshot.forEach(doc=> {
    // console.log(doc.data());
    //             this.User=doc.data();
    //             this.userName=this.User.displayName;
    //             this.photo=this.User.photoURL;
    //         });
    //     });
    // }

    //doc.data() là 3 object của 3 người

    onSignOut() {
        this.authService.signOut();
        window.location.reload();
        // this.ngZone.run(() => this.router.navigateByUrl('/login'));
        // this.router.navigate(['/login']);
        // this.translateService.get('Goodbye').subscribe(results => this.snackbar.open(results, '', { duration: 2000 }));
    }

    doLogout() {
        this.authService.logout();
        this.ngZone.run(() => this.router.navigateByUrl('/login'));
    }

    // login(name: string) {
    //     // console.log("run");
    //     this.authService.oAuthLogin(name, (error: string) => {
    //         if (error) {
    //             console.log("hello");
    //             this.error = error;
    //             this.snackbar.open(this.error, "hide", { duration: 10000 });
    //         } else {
    //             this.authService.readUser().subscribe((authData) => {
    //                 if (authData) {
    //                     // console.log(authData);
    //                     this.translateService
    //                         .get("Welcome")
    //                         .subscribe((results) =>
    //                             {
    //                                 this.snackbar.open(
    //                                     results + " " + authData.displayName,
    //                                     "",
    //                                     { duration: 2000 }
    //                                 )
    //                                 console.log(authData.displayName);
    //                             }
    //                         );
    //                 }
    //             });
    //         }
    //     });
    // }

}
