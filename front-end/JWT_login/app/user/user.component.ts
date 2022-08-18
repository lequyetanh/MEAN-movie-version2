import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../service/data.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    loggedIn;
    constructor(
        private router: Router,
        private dataService: DataService,
    ) {
        this.checkUser();
    }

    ngOnInit() {
    }

    checkUser(){
        this.dataService.checkUser().subscribe((dataReturn) => {
            console.log(dataReturn);
            if(dataReturn['status'] == false){
                this.router.navigateByUrl('/');  
            }
        });
    }

}
