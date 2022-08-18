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
        private router: Router,
    ) {
      
    }

}
