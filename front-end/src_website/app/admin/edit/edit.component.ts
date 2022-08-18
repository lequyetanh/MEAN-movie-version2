import { Component, OnInit, NgZone } from '@angular/core';
import { Movie } from '../../../movieModel/movieModel';
import { MovieService } from '../../service/movie.service';
import { DataService } from '../../service/data.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs';
@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    movieForm: FormGroup;

    image:any;
    tags: any = [];
    listTags: any = [];
    arrayTag: any = [];

    actor: any = [];
    listActor: any = [];
    arrayActor: any = [];

    movie: any = [];
    category: any = ['phim bộ', 'phim lẻ']

    country: any = [];
    selectedCountry: any = [];
    listCountry: any = [];

    // genre:any=["phim hành động", "phim hồi hộp-gay cấn", "phim viễn tưởng", "phim chiến tranh", "phim hình sự", "phim phiêu lưu", "phim hài hước", "phim võ thuật", "phim kinh dị", "phim bí ẩn-siêu nhiên", "phim cổ trang", "phim thần thoại", "phim tâm lý", "phim tài liệu", "phim tình cảm-lãng mạng", "phim chính kịch", "phim thể thao-âm nhạc", "phim gia đình", "phim hoạt hình"];
    genre: any = [];
    selectedgenre: any = [];
    listgenre: any = [];

    fruits: Array<String> = ['Mango', 'Grapes', 'Strawberry', 'Oranges'];
    favFruitsError: Boolean = true;
    selectedFruitValues = [];

    constructor(
        private dataService: DataService,
        private movieService: MovieService,
        public fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
    ) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.getMovie(id);
    }


    ngOnInit() {
        if (this.listgenre) {
            this.mainForm();
        }
        this.image = this.movieForm.value.name_image;
    }

    change(){
        console.log("change");      
    }

    updateCategory(e) {
        this.movieForm.get('category').setValue(e, {
            onlySelf: true
        })
    }

    addgenre() {
        const arr = this.genre.map(item => {
            return this.fb.control(false);
        });
        return this.fb.array(arr);
    }

    addCountry() {
        const arr = this.country.map(item => {
            return this.fb.control(false);
        });
        return this.fb.array(arr);
    }

    get genreArray() {
        return <FormArray>this.movieForm.get('genre');
    }

    get countryArray() {
        return <FormArray>this.movieForm.get('country');
    }


    getSelectedgenre() {
        this.selectedgenre = [];
        this.genreArray.controls.forEach((control, i) => {
            if (control.value) {
                this.selectedgenre.push(this.genre[i]);
            }
        });
        // console.log(this.selectedgenre);
    }

    getSelectedCountry() {
        this.selectedCountry = [];
        this.countryArray.controls.forEach((control, i) => {
            if (control.value) {
                this.selectedCountry.push(this.country[i]);
            }
        });
        // console.log(this.selectedCountry);
    }

    mainForm() {
        // console.log(this.listTags);
        this.movieForm = this.fb.group({
            id: [''],
            name: [''],
            genre: this.addgenre(),
            release_year: [''],
            run_time: [''],
            rate: [''],
            name_image: [''],
            vice_name_image: [''],
            real_name: [''],
            status: [''],
            director: [''],
            country: this.addCountry(),
            episode: [''],
            views: [''],
            actor: [''],
            content: [''],
            tags: [''],
            name_video: [''],
            theater: [''],
            category: [''],
            // favFruits: this.addFruitsControls(),
        });
        this.movieForm.setValue({
            id: this.movie.id,
            name: this.movie.name,
            genre: this.listgenre,
            release_year: this.movie.release_year,
            run_time: this.movie.run_time,
            rate: this.movie.rate,
            name_image: this.movie.name_image,
            vice_name_image: this.movie.vice_name_image,
            real_name: this.movie.real_name,
            status: this.movie.status,
            director: this.movie.director,
            country: this.listCountry,
            episode: this.movie.episode,
            views: this.movie.views,
            actor: this.listActor,
            content: this.movie.content,
            tags: this.listTags,
            name_video: this.movie.name_video,
            theater: this.movie.theater,
            category: this.category[0],
            // favFruits: [true, true, false, true],
        });
    }

    addTagGroup() {
        return this.fb.group(this.listTags[0]);
    }

    setValueTag() {
        return this.listTags[0];
    }

    addTag() {
        this.tagArray.push(this.addTagGroup());
    }
    removeTag(index) {
        this.tagArray.removeAt(index);
    }
    get tagArray() {
        return <FormArray>this.movieForm.get('tags');
    }

    get myForm() {
        return this.movieForm.controls;
    }


    getMovie(id) {
        this.movieService.getMovieFromId(id).subscribe(data => {
            // console.log(data);
            this.movie = data[0];

            for (let h = 0; h < this.movie.tags.length; h++) {
                this.listTags = this.movie.tags;
                this.listActor = this.movie.actor;
                // this.image = this.movie.name_image;
            }
            // console.log(this.listTags);
            this.dataService.getCountry().subscribe(country => {
                // console.log(country);
                for (var i = 0; i < Object.keys(country).length; i++) {
                    this.country.push(country[i].name);
                    if (this.movie.country[0] == undefined) {
                        this.listCountry.push(false);
                    } else {
                        for (var j = 0; j < this.movie.country.length; j++) {
                            if (country[i].name == this.movie.country[j]) {
                                this.listCountry.push(true);
                                break;
                            } else {
                                if (j == this.movie.country.length - 1) {
                                    this.listCountry.push(false);
                                    break;
                                }
                                continue;
                            }
                        }
                    }
                }
                // console.log(this.listCountry);
                // console.log(this.genre);
                this.dataService.getCategory().subscribe(genre => {
                    // console.log(genre);
                    for (var i = 0; i < Object.keys(genre).length; i++) {
                        this.genre.push(genre[i].name);
                        if (this.movie.genre[0] == undefined) {
                            this.listgenre.push(false);
                        } else {
                            for (var j = 0; j < this.movie.genre.length; j++) {
                                if (genre[i].name == this.movie.genre[j]) {
                                    this.listgenre.push(true);
                                    break;
                                } else {
                                    if (j == this.movie.genre.length - 1) {
                                        this.listgenre.push(false);
                                        break;
                                    }
                                    continue;
                                }
                            }
                        }
                    }
                    // console.log(this.listgenre);
                    this.ngOnInit();
                });
            });
        });
    }
    onSubmit() {
        // console.log(this.arrayTag);
        // console.log(this.movieForm.value.tags);
        this.getSelectedCountry();
        this.getSelectedgenre();
        if (this.movieForm.value.tags != this.listTags) {
            var a = 0;
            var b = this.movieForm.value.tags.indexOf(",");
            // console.log(b);
            // console.log(this.arrayTag);
            if (b == -1) {
                this.arrayTag.push(this.movieForm.value.tags.slice(a));
            } else {
                // console.log(this.movieForm.value.tags.slice(a, b));
                this.arrayTag.push(this.movieForm.value.tags.slice(a, b));
                // console.log(this.arrayTag);
                while (true) {
                    // console.log(this.arrayTag);
                    a = b + 1;
                    b = this.movieForm.value.tags.indexOf(",", a);
                    // console.log(b);
                    if (b == -1) {
                        this.arrayTag.push(this.movieForm.value.tags.slice(a));
                        // console.log(this.arrayTag);
                        break;
                    } else {
                        this.arrayTag.push(this.movieForm.value.tags.slice(a, b));
                        // console.log(this.arrayTag);
                    }
                }
            }
            this.movieForm.value.tags = this.arrayTag;
        }

        if (this.movieForm.value.actor != this.listActor) {
            var a = 0;
            var b = this.movieForm.value.actor.indexOf(",");
            // console.log(b);
            // console.log(this.arrayActor);
            // console.log(this.movieForm.value.actor.slice(a, b));
            if (b == -1) {
                this.arrayActor.push(this.movieForm.value.actor.slice(a));
            } else {
                this.arrayActor.push(this.movieForm.value.actor.slice(a, b));
                // console.log(this.arrayActor);
                while (true) {
                    // console.log(this.arrayActor);
                    a = b + 1;
                    b = this.movieForm.value.actor.indexOf(",", a);
                    // console.log(b);
                    if (b == -1) {
                        this.arrayActor.push(this.movieForm.value.actor.slice(a));
                        // console.log(this.arrayActor);
                        break;
                    } else {
                        this.arrayActor.push(this.movieForm.value.actor.slice(a, b));
                        // console.log(this.arrayActor);
                    }
                }
            }
            this.movieForm.value.actor = this.arrayActor;
        }

        console.log(this.arrayTag);

        // console.log(this.arrayTag);
        // console.log(this.movieForm.value.tags);
        this.movieForm.value.genre = this.selectedgenre;
        this.movieForm.value.country = this.selectedCountry;
        console.log(this.movieForm.value);
        if (window.confirm('Are you sure?')) {
            let id = this.actRoute.snapshot.paramMap.get('id');
            this.movieService.updateMovie(id, this.movieForm.value)
                .subscribe(res => {
                    this.router.navigateByUrl('/admin');
                    console.log('Content updated successfully!')
                }, (error) => {
                    console.log(error)
                })
        }
    }
}
