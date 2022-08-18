import { Component, OnInit, HostBinding, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "./../service/auth.service";
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
    signupForm: FormGroup;
    idUser;
    allUser;
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService,
        private dataService: DataService,
    ) {
        this.getUser();
    }

    ngOnInit() {
        this.mainForm();
    }

    mainForm() {
        this.signupForm = this.fb.group({
            id: this.idUser,
            name: [""],
            email: [""],
            password: [""],
            watchLater: [""],
            favorite: [""]
        });
    }

    getUser() {
        this.dataService.getAllUser().subscribe(allUser => {
            this.idUser = allUser[0].id + 1;
            this.allUser = allUser;
            //    console.log(this.idUser);
            this.mainForm();
        })
    }

    signUp() {
        for(var i=0; i<this.allUser.length; i++){
            if(this.signupForm.value.email == this.allUser[i].email){
                alert("Email này đã tồn tại");
            }else{
                if(i == this.allUser.length-1){
                    this.dataService.createUser(this.signupForm.value).subscribe(data=>{
                        this.router.navigate(["/login"]);
                        alert("Đăng Ký Thành Công, Đăng Nhập Ngay");
                    })
                }
                continue;
            }
        }
        console.log(this.signupForm.value);
    }

}
