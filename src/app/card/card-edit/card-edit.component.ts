import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {

 
  constructor(
    private loaderService: LoaderService,
    private cardService: CardService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  cardId: string;
  cardDetail: any;
  categoryArrayList = [];
  paymentModeArray = [];
  formObj: FormGroup;
  payTypesArr = [];

  ngOnInit() {
    this.formObj = this.fb.group(
      {
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        // mode: ['EXPENSE', [Validators.required]],
        // categoryId: ['', [Validators.required]],
        // amount: [ [Validators.required]],
        // paymentDate: [true, [Validators.required]],
        // transactionId: ['', []]
      },
      { updateOn: 'submit' }
    );

    this.route.params.subscribe(params => {
      this.cardId = params.cardId;
      this.view(this.cardId);
    });
    this.payTypes();
  }



  update() {
    if (!this.formObj.value.parent) {
      delete this.formObj.value.parent;
    }
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.cardService.update(this.cardId, this.formObj.value).subscribe(
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

  private populate(data) {
    this.formObj.patchValue({
      name: data.name || ''
    });
    this.formObj.patchValue({
      type: data.type || ''
    });
    // this.formObj.patchValue({
    //   categoryId: data.categoryId || ''
    // });
    // this.formObj.patchValue({
    //   amount: data.amount || ''
    // });
    // this.formObj.patchValue({
    //   paymentDate: data.paymentDate || ''
    // });
  }

  view(cardId) {
    this.loaderService.show();
    this.cardService.view(cardId).subscribe(response => {
      this.cardDetail = response.data;
      this.populate(this.cardDetail);
      this.loaderService.hide();
    },
      err => {
        this.loaderService.hide();
      });
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
