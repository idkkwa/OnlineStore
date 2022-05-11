import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-cruddialog',
  templateUrl: './product-cruddialog.component.html',
  styleUrls: ['./product-cruddialog.component.css']
})
export class ProductCRUDdialogComponent implements OnInit {

  displayedColumns: string[] = ['productname', 'brandname', 'price', 'color', 'productdescription', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private api: ProductService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
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

  updateProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id: any){
    this.api.delete(id)
    .subscribe({
      next:(res)=>{
        alert("Product Deleted!")
        this.getAllProducts();
      },error:(error) => {
        console.log(error);
        alert("An error occured while deleting the product");
      }  
    })
  }
}
