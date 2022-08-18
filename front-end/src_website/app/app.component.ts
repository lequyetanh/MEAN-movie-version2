import { Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    HostListener,
    ChangeDetectorRef,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { DataService } from "./service/data.service";
import { AuthService } from "./service/auth.service";
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import *  as io from 'socket.io-client';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public form: boolean = false;
    public button: boolean = true;
    public icon:boolean = true;
    allUser:any=[];
    loggedIn;
    user:any;

    title = "angularmovie";
    User: any;
    userName: any;
    photo: any = "https://scontent.fhan5-6.fna.fbcdn.net/v/t1.0-9/119933687_1135781906819149_856315260746804210_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=GZgoTLE-dncAX_UM13c&_nc_ht=scontent.fhan5-6.fna&oh=d1655696ac7a1c781c382ca2199c2c85&oe=5F9693C6";
    @ViewChild('snav', { static: true }) snav: any;
    constructor(
        private afAuth: AngularFireAuth,
        private dataService: DataService,
        public authService: AuthService,
        private router: Router,
    ) {
        this.authService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        });
        this.getAllUser();
    }

    // toggleForm() {
    //     this.form = !this.form;
    //     this.icon = !this.icon;
    // }

    toggleButton() {
        this.form = !this.form;
        this.icon = !this.icon;
    }

    scrollTop() {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }

    get() {
        // console.log(this.authService.getdata());
        this.afAuth.auth.onAuthStateChanged((Users) => {
            // console.log(Users.displayName);
            this.User = Users;
            this.userName = this.User.displayName;
            this.photo = this.User.photoURL;
        });
    }

    getAllUser(){
        this.dataService.getAllUser().subscribe(allUser=>{
            this.allUser = allUser;
            // console.log(this.allUser);
        })
    }

    @HostListener("window:scroll", ["$event"]) scrollHandler(event) {
        const height = window.scrollY;
        const el = document.getElementById("btn-returnToTop");
        height >= 500 ? (el.className = "show") : (el.className = "hide");
    }
}
