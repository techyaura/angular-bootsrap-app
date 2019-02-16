import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { PaymentService } from '../services/payment.service';
import { CategoryService } from '../../category/services/category.service';
import { environment } from '../../../environments/environment';
import { distinctUntilChanged } from 'rxjs/operators';
// import '../../../../node_modules/eventsource/lib/eventsource.js';
// declare var EventSourcePolyfill: any;

@Component({
  selector: 'app-payment-timeline',
  templateUrl: './payment-timeline.component.html',
  styleUrls: ['./payment-timeline.component.css']
})
export class PaymentTimelineComponent implements OnInit {
  formObj: FormGroup;
  dataArrayList = [];
  __todayDate = new Date();
  __currentMonth = this.__todayDate.getMonth() + 1;
  __currentYear = this.__todayDate.getFullYear();
  categoryArrayList = [];
  slug: any = '';
  isDataLoaded: Boolean = false;
  remoteUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private paymentService: PaymentService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.formObj = this.fb.group({
      category: ['', []]
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.slug = params['ctId'];
      this.formObj.patchValue({
        category: this.slug === 'all' ? '' : this.slug
      });
      this.list('all', this.slug);
    });
    this.list_category();
    this.__onChanges();
  }

  list(q = 'all', ct = 'all') {
    if (ct === '') {
      ct = 'all';
    }
    this.appendQueryStr({'ctId': ct});
    this.paymentService.timeline(ct).subscribe(
      response => {
        this.dataArrayList = response.data;
        this.loaderService.hide();
        this.isDataLoaded = true;
      },
      err => {
        this.loaderService.hide();
        this.isDataLoaded = true;
      }
    );
  }

  list_category(mode = 'ALL') {
    this.categoryService.list(mode).subscribe(
      response => {
        this.categoryArrayList = response.data;
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  __onChanges(): void {
    this.formObj.controls['category'].valueChanges.pipe(distinctUntilChanged((a, b) => this.jsonEqual(a, b)))
    .subscribe(category => {
      this.list('all', category);
    });
  }
    jsonEqual(a, b): boolean {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    appendQueryStr(queryObj) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryObj,
        queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        skipLocationChange: true
        // do not trigger navigation
      });
    }
}
