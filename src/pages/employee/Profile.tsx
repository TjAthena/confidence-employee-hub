
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Download, User, FileText, Phone, Mail, MapPin, Calendar } from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuth();

  const employeeData = {
    personalInfo: {
      name: 'John Doe',
      employeeId: 'EMP001',
      department: 'Finance',
      designation: 'Senior Analyst',
      dateOfJoining: '2022-03-15',
      email: 'john.doe@confidencefs.com',
      phone: '+91 9876543210',
      address: '123 Main Street, Mumbai, Maharashtra 400001'
    },
    documents: {
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
    }
  };

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <img
              src={user?.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
              alt={employeeData.personalInfo.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2">{employeeData.personalInfo.name}</h2>
              <div className="space-y-2">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="secondary">{employeeData.personalInfo.employeeId}</Badge>
                  <Badge variant="outline">{employeeData.personalInfo.designation}</Badge>
                  <Badge variant="outline">{employeeData.personalInfo.department}</Badge>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{employeeData.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="w-4 h-4" />
                    {employeeData.personalInfo.phone}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined: {new Date(employeeData.personalInfo.dateOfJoining).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-center sm:text-left">{employeeData.personalInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {employeeData.documents.downloadable.map((doc, index) => (
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
                {employeeData.documents.viewOnly.map((doc, index) => (
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
