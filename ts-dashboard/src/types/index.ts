export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  createdAt: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  position: string;
  salary: number;
  startDate: string;
  status: EmployeeStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type Department = 'HR' | 'Engineering' | 'Sales' | 'Marketing' | 'Finance' | 'Operations';

export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave';

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  position: string;
  salary: number;
  startDate: string;
  status: EmployeeStatus;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  id: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  departments: number;
  averageSalary: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: User['role'];
}
