import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './form-elements/input/input/input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FileDirectiveDirective } from './directives/file-directive.directive';
import { MatIconModule } from '@angular/material/icon';
import { UxCardComponent } from './card/ux-card/ux-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AddBookDialogComponent,
    FileDirectiveDirective,
    UxCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
