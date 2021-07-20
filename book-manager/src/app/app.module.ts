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
import { NotifierComponent } from './notifier/notifier/notifier.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { HighlightDirective } from './directives/highlight.directive';
import { SliderComponent } from './slider/slider/slider.component';
import { FieldComponent } from './field/field/field.component';
import { SliderTabComponent } from './slider-tab/slider-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AddBookDialogComponent,
    FileDirectiveDirective,
    UxCardComponent,
    NotifierComponent,
    ToolbarComponent,
    HighlightDirective,
    SliderComponent,
    FieldComponent,
    SliderTabComponent,
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
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
