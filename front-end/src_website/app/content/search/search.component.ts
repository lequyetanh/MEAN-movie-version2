import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { MovieService } from './../../service/movie.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    type;
    movies;
    listMovie: any = [];
    searchName: any;
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private location: Location,
    ) {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.type = params.get('name');
            this.searchName = this.removeAccents(this.type).toLowerCase();
            this.getAllMovie();
        });
        // console.log(this.searchName);
    }

    ngOnInit() {

    }

    getAllMovie(): void {
        this.listMovie = [];
        this.movieService.getAllMovie().subscribe(movie => {
            this.movies = movie;
            for (let i = 0; i < this.movies.length; i++) {
                let name = this.removeAccents(this.movies[i].name).toLowerCase();
                // let regxName = `/${this.searchName}/i`;
                // console.log(regxName);
                if (name.search(this.searchName) == -1) {
                    continue;
                }
                else {
                    this.listMovie.push(this.movies[i]);
                    // console.log(this.listMovie);
                }
            }
        })
    }

    removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    goBack(): void {
        this.location.back();
    }

}
