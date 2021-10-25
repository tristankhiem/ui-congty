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
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements AfterViewInit {
  constructor(
    private loading: AppLoading,
    private alert: AppAlert,
    private common: AppCommon,
    private employeeService: EmployeeService,
    private roleService: RoleService
  ) {
  }

  @Output() saveCompleted = new EventEmitter<any>();
  @ViewChild('addEmployeeModalWrapper', {static: true}) addEmployeeModalWrapper: ModalWrapperComponent;

  public roleResult: RoleModel[] = [];
  public role: RoleModel = new RoleModel();
  public newEmployee: EmployeeModel = new EmployeeModel();

  public cardIdPattern = INPUT_PATTERN_CONSTANT.cardIdPattern;
  public passwordPattern = INPUT_PATTERN_CONSTANT.passwordPattern;
  public emailPattern = INPUT_PATTERN_CONSTANT.emailPattern;
  private targetModalLoading: ElementRef;

  ngAfterViewInit(): void {
    this.targetModalLoading = $(`#${this.addEmployeeModalWrapper.id} .modal-dialog`);
  }

  private onInit(): void {
  }

  public show(): void {
    this.onInit();
    this.newEmployee.employeeType = 'DEV';
    this.addEmployeeModalWrapper.show();
  }

  public hide(): void {
    this.addEmployeeModalWrapper.hide();
  }

  public onHideEvent(): void {
    this.newEmployee = new EmployeeModel();
  }

  public onSave(): void {
    this.saveEmployee();
  }


  public searchRoles(event): void {
    this.loading.show(this.targetModalLoading);
    this.roleService.getLikeName(event.query).subscribe(res => this.searchRoleCompleted(res));
  }

  private searchRoleCompleted(res: ResponseModel<RoleModel[]>): void {
    this.loading.hide(this.targetModalLoading);
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }
    this.roleResult = res.result || [];
  }

  private saveEmployee(): void {
    this.loading.show(this.targetModalLoading);

    // this.employeeService.save(this.newEmployee).subscribe(res => this.saveEmployeeCompleted(res));
  }

  private saveEmployeeCompleted(res: EmployeeModel): void {
    this.loading.hide(this.targetModalLoading);
    this.saveCompleted.emit();
    this.hide();
  }
}
