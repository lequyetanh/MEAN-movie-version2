import { Component, OnInit } from '@angular/core';
import { MovieService } from "./../../../service/movie.service";

@Component({
  selector: 'app-slide-movie',
  templateUrl: './slide-movie.component.html',
  styleUrls: ['./slide-movie.component.scss']
})
export class SlideMovieComponent implements OnInit {
    movie: any=[];
    slide1:any =[];
    slide2:any =[];
    slide3:any =[];
    slide4:any =[];
    slide5:any =[];
    eachMovie:any=[];
    fakemovie:any=[];
    constructor(private movieService: MovieService) {
        window.scrollTo({ left: 0, top: 0});
    }

    ngOnInit() {
        this.get15phim();
        this.getdata();
    }

    get15phim() {
        this.movieService.get15phim().subscribe((Movie) => {
            // console.log(Movie);
            // this.fakemovie = Movie;
            for(var i=0;i<Object.keys(Movie).length;i++){
                if(i<3){
                    this.slide1.push(Movie[i]);
                }else{
                    if(i<6){
                        this.slide2.push(Movie[i]);
                    }else{
                        if(i<9){
                            this.slide3.push(Movie[i]);
                        }else{
                            if(i<12){
                                this.slide4.push(Movie[i]);
                            }else{
                                if(i<15){
                                    this.slide5.push(Movie[i]);
                                }
                            }
                        }
                    }
                }
            }
            // console.log(this.slide1,this.slide2,this.slide3);
            this.movie.push(this.slide1);
            this.movie.push(this.slide2);
            this.movie.push(this.slide3);
            this.movie.push(this.slide4);
            this.movie.push(this.slide5);
            // console.log(this.slide1);
            
        });
    }

    getdata(){
        
    }

}
