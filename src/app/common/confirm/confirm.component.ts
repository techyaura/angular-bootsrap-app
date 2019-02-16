import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {

    }

    remove() {
      this.data.service.remove(this.data.dataId).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
