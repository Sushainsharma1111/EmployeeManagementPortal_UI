import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/UI_Models/Employee.model';
import { __param } from 'tslib';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
 // this is the local variable to hold the value for it.
  employeeId: string |null| undefined;
  employeedetails: Employee=
  {
    employeeName: '',
    employeeFatherName: '',
    email: '',
    employeeRole: '',
    employeeSalary: 0,
    employeeId: ''
  }

  constructor(private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
   this.route.paramMap.subscribe((params)=> {this.employeeId=params.get('id');

  if(this.employeeId)
  {
    this.employeeService.getEmployee(this.employeeId) . subscribe(
      (successResponse)=>
      {

        this.employeedetails=successResponse}
    );


  }

  }

   );
  }



  onUpdate(): void
    {
  this.employeeService.updateEmployee(this.employeedetails.employeeId,this.employeedetails)
  .subscribe(
    (successResponse)=>
    {
      this.snackbar.open("Employee Updated Successfully",undefined,{duration: 2000});
      console.log("Updated Succesfulyy");
      // show notification
    },

    (errorResponse) =>
    {
      console.log("Error is genrated while saving the data");
    }
 );
 }

    onDelete(): void
    {
      this.employeeService.DeleteEmployee(this.employeedetails.employeeId).
      subscribe(
        (onSuccess)=>{
          this.snackbar.open("Employee Deleted Successfully",undefined,{duration: 2000});
        },
        (errorResponse)=>
        {
          console.log("Error is genrated while deleting Employee");
        }


      );
      setTimeout(()=>{
        this.router.navigateByUrl('');

        },2000);

    }

}
