import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/services/login.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';


@Component({
  selector: 'app-user-crud-dialog',
  templateUrl: './user-crud-dialog.component.html',
  styleUrls: ['./user-crud-dialog.component.css']
})

export class UserCrudDialogComponent implements OnInit {
 

  displayedColumns: string[] = ['username', 'password','admin', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private api: LoginService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog(){
    this.dialog.open(UserDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllUsers();
      }
    })
  }

  getAllUsers(){
    this.api.getAll()
    .subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        alert(error)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateUser(row: any){
    this.dialog.open(UserDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllUsers();
      }
    })
  }

  deleteUser(id: any){
    this.api.delete(id)
    .subscribe({
      next:(res)=>{
        alert("User Deleted!")
        this.getAllUsers();
      },error:(error) => {
        console.log(error);
        alert("An error occured while deleting the user");
      }  
    })
  }
}
