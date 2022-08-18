import { Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    HostListener,
    ChangeDetectorRef,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import *  as io from 'socket.io-client';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
    ) {
    }
}
