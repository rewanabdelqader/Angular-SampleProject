import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreasuryService } from '../services/TreasuryService';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  availableBranchIds: number[] = [1, 2, 3, 4];
  reactiveForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    branchIds: new FormControl([], Validators.required),
    glAccountId: new FormControl('', Validators.required),
  })
  

  constructor(private TreasuryService: TreasuryService ,  private toastr: ToastrService) { 
  }

  ngOnInit() {
  }
  addTreasury() { 
     if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;
      this.TreasuryService
        .addTreasuryDefinition(formData)
        .subscribe({
          next: (res) => {
            res;
            this.toastr.success('Successfully added treasury')
            console.log('Successfully added treasury', res);
          },
          error: (err) => {
            this.toastr.error(err.error.error.message)
            console.log(err.error.error.message);
          }
        }
        );
    }
    console.log(this.reactiveForm.valid); 
    console.log(this.reactiveForm.controls['name'].valid); 
  }
}
