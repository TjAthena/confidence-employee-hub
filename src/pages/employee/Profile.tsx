
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployeeData } from '@/contexts/EmployeeDataContext';
import { Download, User, FileText, Phone, Mail, MapPin, Calendar, UserCheck, CreditCard, IdCard, Heart } from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const { getEmployeeById } = useEmployeeData();
  
  // Get employee data based on current user
  const employeeData = getEmployeeById(user?.id || 'EMP001') || {
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
  };

  const documents = {
    downloadable: [
      { name: 'Offer Letter', icon: FileText, type: 'download' },
      { name: 'Appointment Letter', icon: FileText, type: 'download' },
      { name: 'Promotion Letter', icon: FileText, type: 'download' },
      { name: 'Increment Letter', icon: FileText, type: 'download' }
    ],
    viewOnly: [
      { name: 'Aadhaar Card', icon: FileText, type: 'view' },
      { name: 'PAN Card', icon: FileText, type: 'view' },
      { name: 'Education Certificates', icon: FileText, type: 'view' },
      { name: 'Bank Cheque', icon: FileText, type: 'view' },
      { name: 'Profile Photo', icon: User, type: 'view' }
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <img
              src={employeeData.profilePhoto || user?.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
              alt={`${employeeData.firstName} ${employeeData.lastName}`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2">{employeeData.firstName} {employeeData.lastName}</h2>
              <div className="space-y-2">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="secondary">{employeeData.id}</Badge>
                  <Badge variant="outline">{employeeData.designation}</Badge>
                  <Badge variant="outline">{employeeData.department}</Badge>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{employeeData.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="w-4 h-4" />
                    {employeeData.phoneNumber}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined: {new Date(employeeData.joiningDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="font-medium">{employeeData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{employeeData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{employeeData.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{employeeData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{employeeData.phoneNumber}</p>
            </div>
            {employeeData.dateOfBirth && (
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{new Date(employeeData.dateOfBirth).toLocaleDateString('en-IN')}</p>
              </div>
            )}
            {employeeData.gender && (
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{employeeData.gender}</p>
              </div>
            )}
            {employeeData.maritalStatus && (
              <div>
                <p className="text-sm text-gray-500">Marital Status</p>
                <p className="font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {employeeData.maritalStatus}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Identity Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IdCard className="w-5 h-5" />
            Identity Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employeeData.aadhaarNumber && (
              <div>
                <p className="text-sm text-gray-500">Aadhaar Number</p>
                <p className="font-medium">{employeeData.aadhaarNumber}</p>
              </div>
            )}
            {employeeData.panNumber && (
              <div>
                <p className="text-sm text-gray-500">PAN Number</p>
                <p className="font-medium">{employeeData.panNumber}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employeeData.address && (
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{employeeData.address}</p>
              </div>
            )}
            {employeeData.city && (
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{employeeData.city}</p>
              </div>
            )}
            {employeeData.state && (
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{employeeData.state}</p>
              </div>
            )}
            {employeeData.pinCode && (
              <div>
                <p className="text-sm text-gray-500">PIN Code</p>
                <p className="font-medium">{employeeData.pinCode}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Bank Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employeeData.bankName && (
              <div>
                <p className="text-sm text-gray-500">Bank Name</p>
                <p className="font-medium">{employeeData.bankName}</p>
              </div>
            )}
            {employeeData.accountNumber && (
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-medium">{employeeData.accountNumber}</p>
              </div>
            )}
            {employeeData.ifscCode && (
              <div>
                <p className="text-sm text-gray-500">IFSC Code</p>
                <p className="font-medium">{employeeData.ifscCode}</p>
              </div>
            )}
            {employeeData.accountType && (
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-medium">{employeeData.accountType}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact Information */}
      {employeeData.emergencyContactName && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{employeeData.emergencyContactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="font-medium">{employeeData.emergencyContactRelationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{employeeData.emergencyContactPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Downloadable Documents */}
            <div>
              <h3 className="font-semibold mb-4 text-navy">Downloadable Documents</h3>
              <div className="space-y-2">
                {documents.downloadable.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <doc.icon className="w-5 h-5 text-blue-accent" />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                    <Button size="sm" variant="outline" className="hover-scale">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* View-Only Documents */}
            <div>
              <h3 className="font-semibold mb-4 text-navy">View-Only Documents</h3>
              <div className="space-y-2">
                {documents.viewOnly.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <doc.icon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                    <Button size="sm" variant="ghost" disabled>
                      View Only
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeProfile;
