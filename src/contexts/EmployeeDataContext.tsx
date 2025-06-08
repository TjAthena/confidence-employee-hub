
import React, { createContext, useContext, useState } from 'react';

interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  designation: string;
  department: string;
  joiningDate: string;
  profilePhoto?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountType?: string;
}

interface EmployeeDataContextType {
  employees: EmployeeData[];
  addEmployee: (employee: EmployeeData) => void;
  updateEmployee: (id: string, employee: Partial<EmployeeData>) => void;
  getEmployeeById: (id: string) => EmployeeData | undefined;
}

const EmployeeDataContext = createContext<EmployeeDataContextType | undefined>(undefined);

export const EmployeeDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([
    {
      id: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@confidencefs.com',
      phoneNumber: '+91 9876543210',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      maritalStatus: 'Married',
      aadhaarNumber: '1234-5678-9012',
      panNumber: 'ABCDE1234F',
      designation: 'Senior Analyst',
      department: 'Finance',
      joiningDate: '2022-03-15',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '+91 9876543211',
      emergencyContactRelationship: 'Spouse',
      bankName: 'HDFC Bank',
      accountNumber: '1234567890123456',
      ifscCode: 'HDFC0001234',
      accountType: 'Savings'
    }
  ]);

  const addEmployee = (employee: EmployeeData) => {
    setEmployees(prev => [...prev, employee]);
  };

  const updateEmployee = (id: string, updatedData: Partial<EmployeeData>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updatedData } : emp
    ));
  };

  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeDataContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      getEmployeeById
    }}>
      {children}
    </EmployeeDataContext.Provider>
  );
};

export const useEmployeeData = () => {
  const context = useContext(EmployeeDataContext);
  if (context === undefined) {
    throw new Error('useEmployeeData must be used within an EmployeeDataProvider');
  }
  return context;
};
