import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../commons/modal-wrapper/modal-wrapper.component';
import {AppAlert, AppLoading} from '../../../utils';
import {RoleService} from '../../../services/store/role.service';
import {ResponseModel} from '../../../data-services/response.model';
import {HTTP_CODE_CONSTANT} from '../../../constants/http-code.constant';
import {RoleModel} from '../../../data-services/schema/role.model';
import {NgForm} from '@angular/forms';
import {AppCommon} from '../../../utils/app-common';
import {INPUT_PATTERN_CONSTANT} from '../../../constants/input-pattern.constant';
import {EmployeeModel} from '../../../data-services/schema/employee.model';
import {EmployeeService} from '../../../services/store/employee.service';

declare var $: any;

@Component({
  selector: 'app-view-employee-list',
  templateUrl: './view-employee-list.component.html'
})
export class ViewEmployeeListComponent implements AfterViewInit {
  constructor(
    private loading: AppLoading,
    private alert: AppAlert,
    private common: AppCommon,
    private employeeService: EmployeeService,
    private roleService: RoleService
  ) {
  }

  @Output() saveCompleted = new EventEmitter<any>();
  @ViewChild('addEmployeeListModalWrapper', {static: true}) addEmployeeListModalWrapper: ModalWrapperComponent;

  public roleResult: RoleModel[] = [];
  public role: RoleModel = new RoleModel();
  public newEmployee: EmployeeModel = new EmployeeModel();
  public employeeList: EmployeeModel[] = [];

  public cardIdPattern = INPUT_PATTERN_CONSTANT.cardIdPattern;
  public passwordPattern = INPUT_PATTERN_CONSTANT.passwordPattern;
  public emailPattern = INPUT_PATTERN_CONSTANT.emailPattern;
  private targetModalLoading: ElementRef;

  ngAfterViewInit(): void {
    this.targetModalLoading = $(`#${this.addEmployeeListModalWrapper.id} .modal-dialog`);
  }

  private onInit(): void {
  }

  public show(): void {
    this.onInit();
    this.getEmployeeList();
    this.addEmployeeListModalWrapper.show();
  }

  public hide(): void {
    this.addEmployeeListModalWrapper.hide();
  }

  public onHideEvent(): void {
    this.newEmployee = new EmployeeModel();
  }

  public onSave(): void {

    this.getEmployeeList();
  }

  public addToList(): void {
    this.employeeList.push(this.newEmployee);
    this.newEmployee = new EmployeeModel();
    this.newEmployee.employeeType = 'DEV';
  }

  public removeFromList(index: number): void {
    this.employeeList.splice(index, 1);
  }

  private getEmployeeList(): void {
    this.loading.show(this.targetModalLoading);

    this.employeeService.getList().subscribe(res => this.getEmployeeListCompleted(res));
  }

  private getEmployeeListCompleted(res: any): void {
    this.loading.hide(this.targetModalLoading);
    this.employeeList = res;
  }
}
