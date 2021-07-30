import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogData } from '../dialog-data';

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html',
  styleUrls: ['./error-message-dialog.component.scss'],
})
export class ErrorMessageDialogComponent implements OnInit {
  errorStatus = 0;
  errorError = '';
  details = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {}

  ngOnInit(): void {
    this.errorStatus = this.data.errorStatus;
    this.errorError = this.data.errorError;
  }

  showDetails(){
    this.details=!this.details;
  }
}
