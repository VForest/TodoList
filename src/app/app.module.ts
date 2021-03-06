import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteMessageDialogComponent } from './delete-message-dialog/delete-message-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoContent } from './todo-content/todo-content.component';
import { StoreModule } from '@ngrx/store';
import * as fromTodo from './todo.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoEffects } from './todo.effect';
import { EffectsModule } from '@ngrx/effects';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    SearchbarComponent,
    MessagesComponent,
    DeleteMessageDialogComponent,
    TodoContent,
    ErrorMessageDialogComponent
  ],
  entryComponents: [DeleteMessageDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    FlexLayoutModule,
    StoreModule.forRoot({todos: fromTodo.todoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
