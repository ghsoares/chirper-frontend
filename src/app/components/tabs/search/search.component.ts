import { Component, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tab-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string = "";
  category: number = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

  setQuery(newQuery: any) {
    this.query = newQuery.target.value;
  }

  setCategory(category: number) {
    this.category = category;
  }
}
