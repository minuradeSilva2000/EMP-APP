import React, { useState } from 'react';
import { Plus, Users, DollarSign, Building, TrendingUp } from 'lucide-react';
import { Employee, DashboardStats, CreateEmployeeRequest, UpdateEmployeeRequest } from '../types';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import StatsCard from './StatsCard';
import { useApi } from '../hooks/useApi';
import { usePostApi, usePutApi, useDeleteApi } from '../hooks/useApi';

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  // API hooks
  const { data: employees = [], loading: employeesLoading, error: employeesError, execute: fetchEmployees } = useApi<Employee[]>('/employees');
  const { execute: createEmployee } = usePostApi<CreateEmployeeRequest, Employee>();
  const { execute: updateEmployee } = usePutApi<UpdateEmployeeRequest, Employee>();
  const { execute: deleteEmployee } = useDeleteApi();

  // Calculate stats from employees if no dedicated stats endpoint
  const calculatedStats: DashboardStats = {
    totalEmployees: employees?.length || 0,
    activeEmployees: employees?.filter(emp => emp.status === 'Active').length || 0,
    departments: new Set(employees?.map(emp => emp.department) || []).size,
    averageSalary: employees && employees.length > 0 ? Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length) : 0,
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = async (employeeData: CreateEmployeeRequest | UpdateEmployeeRequest) => {
    console.log('Dashboard handleSaveEmployee called with:', employeeData);
    try {
      if (editingEmployee) {
        const updateData = { ...employeeData, id: editingEmployee.id } as UpdateEmployeeRequest;
        console.log('Updating employee:', updateData);
        await updateEmployee(`/employees/${editingEmployee.id}`, updateData);
      } else {
        console.log('Creating new employee:', employeeData);
        await createEmployee('/employees', employeeData as CreateEmployeeRequest);
      }
      // Refresh the employees list
      console.log('Refreshing employees list...');
      fetchEmployees();
      console.log('Closing form...');
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(`/employees/${id}`);
        // Refresh the employees list
        fetchEmployees();
      } catch (error) {
        console.error('Failed to delete employee:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
          <p className="text-gray-600">Manage your team and track employee information</p>
        </div>

        {employeesError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error loading employees: {employeesError}
          </div>
        )}

        {employeesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading employees...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Employees"
                value={calculatedStats.totalEmployees}
                icon={Users}
                color="blue"
                trend="+12%"
              />
              <StatsCard
                title="Active Employees"
                value={calculatedStats.activeEmployees}
                icon={TrendingUp}
                color="green"
                trend="+8%"
              />
              <StatsCard
                title="Departments"
                value={calculatedStats.departments}
                icon={Building}
                color="purple"
                trend="0%"
              />
              <StatsCard
                title="Avg Salary"
                value={`$${calculatedStats.averageSalary.toLocaleString()}`}
                icon={DollarSign}
                color="yellow"
                trend="+5%"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Employee List</h2>
                <button
                  onClick={handleAddEmployee}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  Add Employee
                </button>
              </div>

              <EmployeeTable
                employees={employees || []}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            </div>
          </>
        )}

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSaveEmployee}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
