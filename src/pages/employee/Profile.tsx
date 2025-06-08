
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployeeData } from '@/contexts/EmployeeDataContext';
import { Download, User, FileText, Phone, Mail, MapPin, Calendar, UserCheck } from 'lucide-react';

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
    designation: 'Senior Analyst',
    department: 'Finance',
    joiningDate: '2022-03-15',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+91 9876543211',
    emergencyContactRelationship: 'Spouse'
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
                {employeeData.address && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-center sm:text-left">{employeeData.address}</span>
                  </div>
                )}
              </div>
            </div>
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
