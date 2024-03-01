import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { TreasuryService } from '../services/TreasuryService';
import { getTreasuryDto } from '../models/getTreasuryDto';
import { Router } from '@angular/router';
import { baseDto } from '../models/baseDto';
import { FilterDto } from '../models/filterDto';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageSizeOptions: number[] = [5, 10, 15, 20, 25, 30];
  treasuryList: getTreasuryDto[] = [];
  isEditing = false;
  filterValue = '';
  pageInfo: FilterDto = {
    model: '',
    orderBy: '',
    isDesc: true,
    groupBy: [],
    pageInfo: {
      pageNo: 1,
      resultsPerPage: 10,
      totalResults: 0,
    },
    conditions: []
  };
  totalPages: number;
  editingRow: number;
  treasuryForm: FormGroup;

  
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  errorMessage: any;
  originalName: string;

  constructor(private treasuryService: 
    TreasuryService, 
    private router: Router,
    private toastr: ToastrService ,
    private fb: FormBuilder,
    private translateService : TranslateService ) {
      translateService.setDefaultLang('en');
  translateService.use('en');
    }
    
translate(event:any ){
  this.translateService.use(event.target.value)
}
  ngOnInit(): void {
    this.treasuryForm = this.fb.group({
      name: [''], 
    });   
     this.loadData();
  }

  loadData(pageInfo?: FilterDto): void {
    if (pageInfo) {
      this.pageInfo = pageInfo;
    }

    this.treasuryService.getTreasuries(this.pageInfo)
      .subscribe((result: any) => {
        this.treasuryList = result.response.items;
        this.pageInfo.pageInfo.totalResults = result.response.pageInfo?.totalResults!;
        this.totalPages = Math.ceil(this.pageInfo.pageInfo.totalResults / this.pageInfo.pageInfo.resultsPerPage);
        console.log(result.response.items);
        console.log(pageInfo);
      });
  }

  onPageChange(page: any): void {
    this.pageInfo.pageInfo.pageNo = page.pageIndex + 1;
    this.pageInfo.pageInfo.resultsPerPage = page.pageSize;
    this.loadData(this.pageInfo);
  }

  onFilterChange(selectedValue: string): void {
    this.filterValue = selectedValue;
  }

  goToAddPage(): void {
    this.router.navigate(['/Add']);
  }

  editTreasury(editedTreasury: baseDto): void {
    const { id, name } = editedTreasury;
    const treasuryToUpdate = { id, name };
    console.log(treasuryToUpdate);

    if (this.isEditing) {
      this.treasuryService.editTreasury(treasuryToUpdate).subscribe(
        {
          next: (res) => {
            console.log('Successfully edited treasury', res);
            this.toastr.success('Successfully edited treasury', 'Success');
          },
          error: (err) => {
            this .errorMessage = err.error.error.message;
            this.toastr.error(err.error.error.message);
            console.error(err.error.error.message);
          },
        }
      );
    }
  }

  editRow(id: number) {
    this.isEditing = true;
    this.editingRow = id;
    this.originalName = this.treasuryList.find(t => t.id === id)?.name;
  }

saveRow(editedTreasury: baseDto) {
  editedTreasury.name = this.treasuryForm.value.name;

  if (this.isEditing) {
    this.editTreasury(editedTreasury);

    if (this.errorMessage == null) {
      this.cancelEdit();
      this.originalName = this.treasuryList.find(t => t.id === editedTreasury.id)?.name;
      editedTreasury.name = this.originalName;
    }
  }
  console.log(editedTreasury);
}
cancelEdit() {
  this.isEditing = false;
  this.editingRow = null;
    this.treasuryForm.patchValue({
      name: this.originalName,
    });
  console.log(this.originalName)
}
}
