import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from './../../../service/movie.service';
@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
    @Input()
    movie: any;
    constructor(
        private movieService: MovieService,
    ) { }

    ngOnInit() {
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.movieService.getPager(this.movie.length, page);

        // get current page of items
        this.pagedItems = this.movie.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}
