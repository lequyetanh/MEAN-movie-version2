import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../service/movie.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    Category: any;
    Country: any;
    constructor(
        private movieService: MovieService
    ) { }

    ngOnInit() {
        this.getCategoryFromServer();
        this.getCountryFromServer();
    }
    getCategoryFromServer(): void {
        this.movieService.getCategory().subscribe(
            (updateCategory) => {
                this.Category = updateCategory;
            }
        )
    }
    getCountryFromServer(): void {
        this.movieService.getCountry().subscribe(
            (updateCountry) => {
                this.Country = updateCountry;
            }
        )
    }
}
