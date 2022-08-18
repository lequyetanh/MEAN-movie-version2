import { Component, OnInit, HostBinding, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "./../service/data.service";
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private snackBar: MatSnackBar,
        private translateService: TranslateService,
        private dataService: DataService,
    ) {
       this.checkAdmin();
    }

    ngOnInit() {
      
    }

    checkAdmin(){
        this.dataService.checkAdmin().subscribe((dataReturn) => {
            console.log(dataReturn);
            if(dataReturn['status'] == false){
                this.router.navigateByUrl('/');  
            }
        });
    }

}
