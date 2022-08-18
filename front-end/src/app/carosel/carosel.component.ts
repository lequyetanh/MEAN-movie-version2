import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.css']
})
export class CaroselComponent implements OnInit {
  items:Array<any> =[];
  constructor() {
    this.items=[
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
      {name: './../../assets/image/10-dieu-em-ghet-anh-1999_1577346181.jpg'},
    ];
   }

  ngOnInit() {
  }

}
