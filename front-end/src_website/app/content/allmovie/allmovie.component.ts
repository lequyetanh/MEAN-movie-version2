
import { Component, OnInit } from '@angular/core';
import { Movie } from './../../../movieModel/movieModel';
import { MovieService } from './../../service/movie.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-allmovie',
    templateUrl: './allmovie.component.html',
    styleUrls: ['./allmovie.component.scss']
})
export class AllmovieComponent implements OnInit {
    type: String;
    year: any;
    movieType: Movie[];
    movies: any[];
    searchForm: FormGroup;
    array: any = [];
    list: any = [];
    movie: any = [];
    tab = false;

    genre: any = [];
    country: any = [];
    release_year: any = [];
    run_time: any = [];

    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute,
        private location: Location,
        public fb: FormBuilder,
    ) { 
        window.scrollTo({ left: 0, top: 0});
    }

    private allItems: any[];
    pager: any = {};
    pagedItems: any[];


    ngOnInit() {
        this.getType();
    }

    getType(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const type = params.get('type');
            this.type = type;
            console.log(this.type);
            this.year = params.get('year');
            console.log(this.year);
            this.movieService.getMovieFromType(type).subscribe(
                (movie) => {
                    // this.movieType = movie;
                    this.movies = movie;
                    this.movie = movie;
                    this.setPage(1);
                    // console.log(this.time);
                }
            );
        })
    }

    // getYear(): void {
    //     this.route.paramMap.subscribe((params: ParamMap) => {
    //         const type = params.get('year');
    //         this.year = type;
    //         console.log(params.get('year'));
    //         // this.movieService.getMovieFromTypeYear(type).subscribe(
    //         //     (movie) => {
    //         //         console.log("movie");
    //         //         // this.movieType = movie;
    //         //         this.movies = movie;
    //         //         this.setPage(1);
    //         //     }
    //         // );
    //     })
    // }

    goBack(): void {
        this.location.back();
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.movieService.getPager(this.movies.length, page);

        // get current page of items
        this.pagedItems = this.movies.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
