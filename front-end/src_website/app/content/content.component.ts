import { Component, OnInit, NgZone } from '@angular/core';
import { MovieService } from './../service/movie.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    moviebo: any;
    moviele: any;
    movie: any;
    constructor(
        private movieService: MovieService,
        private ngZone: NgZone,
        private router: Router,
    ) { }

    ngOnInit() {
        this.get10Moviebo();
        this.get10Moviele();
    }

    get10Moviebo(): void {
        this.movieService.get10Moviebo().subscribe(
            (Movie) => {
                this.moviebo = Movie;
                for (var i = 0; i < this.moviebo.length; i++) {
                    this.moviebo[i].views = this.numberWithCommas(this.moviebo[i].views);
                }
            }
        )
    }

    get10Moviele(): void {
        this.movieService.get10Moviele().subscribe(
            (Movie) => {
                this.moviele = Movie;
                for (var i = 0; i < Object.keys(this.moviele).length; i++) {
                    this.moviele[i].views = this.numberWithCommas(this.moviele[i].views);
                }
            }
        )
    }

    numberWithCommas(x: string) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    // select(id:number) {
    //   console.log("work");
    //   this.movieService.getMovieFromId (id).subscribe(
    //     (res) =>{
    //       this.ngZone.run(() => this.router.navigateByUrl('/detailmovie/:id'));
    //     }
    //   );
    // }
}
