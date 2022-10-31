import { getLocaleEraNames } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { UpdateEmployeeRequest } from '../models/update-employee-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseApiUrl='https://localhost:44329';

  constructor(private httpClient: HttpClient) {  }

   getEmployees(): Observable<Employee[]>
   {
     return this.httpClient.get<Employee[]>(this.baseApiUrl +'/api/Employee');
   }

   getEmployee(employeeId: string): Observable<Employee>
   {
    return this.httpClient.get<Employee>(this.baseApiUrl+'/api/Employee/'+ employeeId);
   }

   updateEmployee(employeeId:string, EmployeeRequest:Employee) :Observable<Employee>
   {
    const UpdateEmployeeRequest : UpdateEmployeeRequest=
    {
      employeeId:EmployeeRequest.employeeId,
      employeeName: EmployeeRequest.employeeName,
      email: EmployeeRequest.email,
      employeeFatherName: EmployeeRequest.employeeFatherName,
      employeeRole: EmployeeRequest.employeeRole,
      employeeSalary:EmployeeRequest.employeeSalary

    }
   return this.httpClient.put<Employee>(this.baseApiUrl+'/api/Employee/'+ employeeId,UpdateEmployeeRequest);
   }

   DeleteEmployee(employeeId:string)
   {
    return this.httpClient.delete<Employee>(this.baseApiUrl+'/api/Employee/'+employeeId);
   }

}
