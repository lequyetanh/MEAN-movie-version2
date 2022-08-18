import { Component, HostListener, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../service/data.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private snackbar: MatSnackBar,
        public translateService: TranslateService,
        private media: MediaMatcher,
    ) {
        this.dataService.loggedIn.subscribe((loggedIn)=>{
            console.log(loggedIn);
            this.userName = loggedIn;
        });
    }

    ngOnInit() {

    }

}
