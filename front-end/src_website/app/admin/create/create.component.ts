import { Component, OnInit, NgZone } from '@angular/core';
import { Movie } from '../../../movieModel/movieModel';
import { DataService } from '../../service/data.service';
import { AuthService } from '../../service/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    movieForm: FormGroup;
    tags: any = [];
    category: any=['phim bộ' ,'phim lẻ']

    country: any = [];
    selectedCountry: any = [];
    listCountry: any = [];

    // genre:any=["phim hành động", "phim hồi hộp-gay cấn", "phim viễn tưởng", "phim chiến tranh", "phim hình sự", "phim phiêu lưu", "phim hài hước", "phim võ thuật", "phim kinh dị", "phim bí ẩn-siêu nhiên", "phim cổ trang", "phim thần thoại", "phim tâm lý", "phim tài liệu", "phim tình cảm-lãng mạng", "phim chính kịch", "phim thể thao-âm nhạc", "phim gia đình", "phim hoạt hình"];
    genre: any = [];
    selectedgenre: any = [];
    listgenre: any = [];

    constructor(
        private dataService: DataService,
        private authService: AuthService,
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
    ) {
        this.getData();
    }

    ngOnInit() {
        this.mainForm();
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
        // console.log(this.listgenre);
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
            tags: this.fb.array([this.addTagGroup()]),
            name_video: [''],
            theater: [''],
            category: [''],
        });
        this.movieForm.setValue({
            id: 125,
            name: 'Avatar 2',
            genre: this.listgenre,
            release_year: 2017,
            run_time: 120,
            rate: 6,
            name_image: 'avatar-2-2017',
            vice_name_image: 'avatar-2-2017-big',
            real_name: 'Avatar 2',
            status: 'VietSub',
            director: 'James Cameron',
            country: this.listCountry,
            episode: 1,
            views: 36746,
            actor: ['STEPHEN LANG', "SIGOURNEY WEAVER", "ZOE SALDANA"],
            content: 'Avatar là câu chuyện về người anh hùng “bất đắc dĩ” Jake Sully – một cựu sĩ quan thủy quân lục chiến bị liệt nửa thân. Người anh em sinh đôi của anh được chọn để tham gia vào chương trình cấy gien với người ngoài hành tinh Na’vi nhằm tạo ra một giống loài mới có thể hít thở không khí tại hành tinh Pandora. Giống người mới này được gọi là Avatar. Sau khi anh của Jake bị giết, Jake được chọn để thay thế anh mình và đã trở thành một Avatar, Jake có nhiệm vụ đi tìm hiểu và nghiên cứu hành tinh Pandora. Những thông tin mà anh thu thập được rất có giá trị cho chiến dịch xâm chiếm hành tinh xanh thứ hai này của loài người.',
            tags: [
                {
                    tags: "avatar"
                }
            ],
            name_video: 'https://www.youtube.com/watch?v=6ziBFh3V1aM&pbjreload=101',
            theater: true,
            category: this.category[0]
        });
    }

    addTagGroup() {
        return this.fb.group({
            tags: [],
        });
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

    getData() {
        this.dataService.getCountry().subscribe(country => {
            for (var i = 0; i < Object.keys(country).length; i++) {
                this.country.push(country[i].name);
                this.listCountry.push(false);
            }

            // console.log(this.country);
            this.dataService.getCategory().subscribe(genre => {
                for (var i = 0; i < Object.keys(genre).length; i++) {
                    this.genre.push(genre[i].name);
                    this.listgenre.push(false);
                }
                // console.log(this.genre);
                this.ngOnInit();
            });
        });
    }

    get myForm() {
        return this.movieForm.controls;
    }

    onSubmit() {
        this.movieForm.value.tags.forEach(element =>{
            this.tags.push(element.tags);
        })
        this.movieForm.value.tags = this.tags;
        this.movieForm.value.genre = this.selectedgenre;
        this.movieForm.value.country = this.selectedCountry;
        // console.log(this.movieForm.value.tags);
        this.dataService.createmovie(this.movieForm.value).subscribe(
            (res) => {

                console.log('Employee successfully created!');
                this.ngZone.run(() => this.router.navigateByUrl('/admin'))
            }, (error) => {
                console.log(error);
            });
    }

}