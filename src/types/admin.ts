export interface Admin {
  _id: string;
  employeeId: string;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  mobnum: string;
  email: string;
  address: string;
  position: string;
  roleId: string;
  type: string;
  status: string;
  department: string;
  disabled: boolean;
  isLogged: boolean;
  createdAt: string;
  updatedAt: string;
  authToken: string;
}
