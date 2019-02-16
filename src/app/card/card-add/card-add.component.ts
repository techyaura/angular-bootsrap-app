import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { CategoryService } from '../../category/services/category.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {
  constructor(private loaderService: LoaderService, 
    private cardService: CardService, private fb: FormBuilder, 
    private router: Router, private categoryService: CategoryService) { }

  categoryArrayList = [];
  paymentModeArray = [];
  formObj: FormGroup;
  payTypesArr = [];

  ngOnInit() {
    this.formObj = this.fb.group(
      {
        // paymentDate: [new Date(), [Validators.required]],
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        // transactionId: ['', []],
        // amount: [ [Validators.required]],
        // categoryId: ['', [Validators.required]],
        // mode: ['EXPENSE', [Validators.required]]
      },
      { updateOn: 'submit' }
    );
    this.payTypes();
  }

  add() {
    if (!this.formObj.value.parent) {
      delete this.formObj.value.parent;
    }
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.cardService.add(this.formObj.value).subscribe(
        response => {
          this.loaderService.hide();
          this.router.navigate(['/card/list']);
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

  payTypes() {
    this.cardService.payTypes().subscribe(
      (response) => {
        this.payTypesArr = response.data;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );
  }


}
