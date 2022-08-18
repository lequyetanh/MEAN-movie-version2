import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Movie } from './../../movieModel/movieModel';
import { Country } from './../../movieModel/countryModel';
import { Category } from './../../movieModel/categoryModel';
import { ToastrService } from "ngx-toastr";
@Injectable({
    providedIn: 'root'
})

export class MovieService {
    moviesURL: string = 'http://localhost:4000/movie';
    countryURL: string = 'http://localhost:4000/country';
    categoryURL: string = 'http://localhost:4000/category';
    userURL: string = "http://localhost:4000/api";
    useURL: string = "http://localhost:4000/user";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) { }

    // Get All Category
    getCategory() {
        return this.http.get(`${this.categoryURL}`);
    }

    getFavorite() {
        console.log("favorite");
        // console.log(this.http.get(`${this.useURL}/favorite`));
        return this.http.get(`${this.useURL}/favorite`,{
            withCredentials: true,
        });
    }

    getCountry() {
        return this.http.get(`${this.countryURL}`);
    }

    get8Moviebo() {
        return this.http.get(`${this.moviesURL}/get8phimbo`);
    }

    get15phim() {
        return this.http.get(`${this.moviesURL}/get15phim`);
    }


    get8Moviele() {
        return this.http.get(`${this.moviesURL}/get8phimle`);
    }

    get10Moviebo() {
        return this.http.get(`${this.moviesURL}/get10phimbo`);
    }

    get10Moviele() {
        return this.http.get(`${this.moviesURL}/get10phimle`);
    }

    //update
    updateMovie(id, data): Observable<Movie[]> {
        console.log(data);
        return this.http.put<Movie[]>(`${this.moviesURL}/update/${id}`, data);
    }

    getMovieFromTypeYear(typeName: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/type/${typeName}/2019`);
    }

    getMovieFromId(id: number): Observable<Movie[]> {
        // const url=`${this.moviesURL}/${id}`;//gọi đến đường dẫn phim
        // console.log("run");
        return this.http.get<Movie[]>(`${this.moviesURL}/detailmovie/${id}`);
    }

    getUserFromId(id: number) {
        // const url=`${this.moviesURL}/${id}`;//gọi đến đường dẫn phim
        // console.log(id);
        return this.http.get(`${this.useURL}/detailUser/${id}`);
    }

    getMovieFromCategory(release_year: number): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/detailmovie/samemovie/${release_year}`);
    }

    getMovieFromSearch(name: string): Observable<Movie[]> {
        console.log(name);
        return this.http.get<Movie[]>(`${this.moviesURL}/${name}`);
    }
    getMovieFromType(typeName: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/type/${typeName}`);
    }
    getMovieFromTheater(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.moviesURL}/theater`);
    }

    
    deleteUser(id: any): Observable<any> {
        // console.log("movie service");
        // console.log(id);
        return this.http.delete(`${this.useURL}/delete/${id}`);
    }

    deleteMovie(id: any): Observable<any> {
        // console.log("movie service");
        // console.log(id);
        return this.http.delete(`${this.moviesURL}/delete/${id}`);
    }

    // Get all employees
    getAllMovie() {
        return this.http.get(`${this.moviesURL}`);
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
        // tính tổng số trang cần hiển thị = tổng số phim / số phim trên 1 trang
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

}


// ================================== get all data movie from database======================================