import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { MovieService } from './../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Directive, ViewChild } from '@angular/core';

@Component({
    selector: 'app-watchmovie',
    templateUrl: './watchmovie.component.html',
    styleUrls: ['./watchmovie.component.scss']
})
export class WatchmovieComponent implements OnInit, AfterViewInit {
    // @ViewChild("video") videoRef;
    movie: any;
    movies: any;
    video: any;
    //videoRef = document.getElementsByClassName('video')[0];

    // ================================dom==============================
    statusVideo = "play";
    // ===============================end dom===========================
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService
    ) {
        window.scrollTo({ left: 0, top: 0 });
    }

    ngAfterViewInit() {
        console.log('Values on ngAfterViewInit():');
    }

    ngOnInit() {
        this.movieDetail();
        // console.log(this.videoPlayer);
    }

    movieDetail(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.movieService.getMovieFromId(id).subscribe((movie) => {
            this.movie = movie;//console.log(this.movie[0].genre)
            this.video = movie[0].name_video;
            const category = this.movie[0].release_year;
            //   console.log(category);
            this.movieService.getMovieFromCategory(category).subscribe(
                (category) => {
                    this.movies = category;
                }
            );
        });
    }

    playVideo() {
        this.statusVideo = "pause";
        // this.videoRef.play();
    }

    pauseVideo() {
        this.statusVideo = "play";
    }

}
