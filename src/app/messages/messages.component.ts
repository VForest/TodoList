import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMessageDialogComponent } from '../delete-message-dialog/delete-message-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog() {
    let dialogRef = this.dialog.open(DeleteMessageDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.messageService.clear();
      }
    });
  }
}
