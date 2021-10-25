import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from 'src/app/data-services/schema/employee.model';
import { BaseSearchModel } from 'src/app/data-services/search/base-search.model';
import { StoreBaseService } from '../generic/store-base.service';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService extends StoreBaseService{
    public search(search: BaseSearchModel<EmployeeModel[]>): Observable<any>{
        return this.post('/api/employee/search', search);
    }

  public findAll(): Observable<any>{
    return this.get('/api/employee/get-employees');
  }

    public getLikeName(name: string): Observable<any>{
        return this.get('/api/employee/get-like-name' + name);
    }

  public getList(): Observable<any>{
    return this.get('/api/employee/report');
  }

    public getById(id: string): Observable<any>{
        return this.get('/api/employee/get-employee/' + id);
    }

    public save(employees: EmployeeModel[]): Observable<any>{
        return this.post('/api/employee/create-list', employees);
    }

    public update(employee: EmployeeModel): Observable<any>{
        return this.put('/api/employee/update', employee);
    }

    public deleteEmployee(id: string): Observable<any>{
        return this.delete('/api/employee/delete/' + id);
    }
}
