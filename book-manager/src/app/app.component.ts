import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { httpConnectionService } from './httpConnection.service';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'book-manager';

  constructor(public dialog: MatDialog, readonly connSer: httpConnectionService){ }
  ngOnInit(): void { }

  openDialog(): void{
    const   dialogRef  = this.dialog.open(AddBookDialogComponent,{width:'500px'});

    dialogRef.afterClosed().subscribe((value) => {
        console.log(JSON.stringify(value));
        let formData = new FormData();
        formData.append('file',value.file);
        formData.append('data',JSON.stringify(value));
        this.connSer.addSingleBook(formData,value).subscribe((res)=> {
          console.log(res);
        })
    })
  }

}
