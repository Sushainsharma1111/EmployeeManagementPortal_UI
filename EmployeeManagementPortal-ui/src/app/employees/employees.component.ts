import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../UI_Models/Employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees : Employee[]=[];
  displayedColumns: string[] = ['employeeId','employeeName', 'email', 'employeeFatherName', 'employeeRole', 'employeeSalary','edit'];
  dataSource : MatTableDataSource <Employee> = new MatTableDataSource <Employee> ();

  constructor(private employeeService: EmployeeService) {}


  ngOnInit(): void {
    this.employeeService.getEmployees()
    .subscribe(

(successResponse)=>
{
 this.employees=successResponse;
 this.dataSource= new MatTableDataSource<Employee> (this.employees);
},
(errorResponse)=> {console.log(errorResponse);
}
      );

  }



}
