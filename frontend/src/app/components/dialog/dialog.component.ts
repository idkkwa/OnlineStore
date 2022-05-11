import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  actionBtn: string = "Create Product"
  productForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private api: ProductService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      productname: ['', Validators.required],
      brandname: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', ],
      productdescription: ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update Product";
      this.productForm.controls['productname'].setValue(this.editData.productname)
      this.productForm.controls['brandname'].setValue(this.editData.brandname)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['color'].setValue(this.editData.color)
      this.productForm.controls['productdescription'].setValue(this.editData.productdescription)
    }

    console.log(this.editData.id)

  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.create(this.productForm.value)
        .subscribe({
          next: (res)=>{
            console.log(res);
            alert("Product added successfully!");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:(error) =>{
            console.log(error);
            alert("Error occured while adding the product");
          }
        })
      }
    }else{
      this.updateProduct()
    }

    console.log(this.productForm.value)
  }

  updateProduct(){
    this.api.update(this.editData.id, this.productForm.value, ).subscribe({
      next:(res)=>{
        alert("Product has been updated!")
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:(error) => {
        console.log(error);
        alert("An error occured while updating the product");
      }
    })
  }

}
