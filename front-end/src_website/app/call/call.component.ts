import { Component, OnInit, Input, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
    border: "10px solid #000000";
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) { 
        window.scrollTo({ left: 0, top: 0 });
    }

    ngOnInit() {
      
    }

}
