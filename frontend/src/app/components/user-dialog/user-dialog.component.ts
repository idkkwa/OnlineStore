import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  actionBtn: string = "Create Product"
  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private api: LoginService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update Product";
      this.userForm.controls['username'].setValue(this.editData.username)
      this.userForm.controls['password'].setValue(this.editData.password)
    }
  }

  addUser(){
    if(!this.editData){
      if(this.userForm.valid){
        this.api.create(this.userForm.value)
        .subscribe({
          next: (res)=>{
            console.log(res);
            alert("User added successfully!");
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error:(error) =>{
            console.log(error);
            alert("Error occured while adding the user");
          }
        })
      }
    }else{
      this.updateUser()
    }

    console.log(this.userForm.value)
  }

  updateUser(){
    this.api.update(this.editData.id, this.userForm.value, ).subscribe({
      next:(res)=>{
        alert("User has been updated!")
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:(error) => {
        console.log(error);
        alert("An error occured while updating the user");
      }
    })
  }

}
