import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;

  constructor() { }

  ngOnInit(): void {
  }
  onPageChange(page: number): void {
    console.log(`Page changed to ${page}`);
  }
}
