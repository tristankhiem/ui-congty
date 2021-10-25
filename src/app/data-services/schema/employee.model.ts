export class EmployeeModel {
  public id: string;
  public name: string;
  public age: number;
  public phone: string;
  public email: string;
  public basicSalary: number;
  public overtimeHour: number;
  public numberOfBugs: number;
  public employeeType: string;

  public constructor(
    data?: EmployeeModel
  ) {
    const employee = data == null ? this : data;

    this.id = employee.id;
    this.name = employee.name;
    this.age = employee.age;
    this.phone = employee.phone;
    this.email = employee.email;
    this.basicSalary = employee.basicSalary;
    this.overtimeHour = employee.overtimeHour;
    this.numberOfBugs = employee.numberOfBugs;
    this.employeeType = employee.employeeType;
  }
}
