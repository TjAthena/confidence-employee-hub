
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GenerateDocument = () => {
  const [documentType, setDocumentType] = useState('');
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    designation: '',
    department: '',
    salary: '',
    joiningDate: '',
    workLocation: '',
    reportingManager: '',
    email: '',
    phone: '',
    address: '',
    companyName: 'Confidence Financial Services',
    companyAddress: '123 Business District, Mumbai, Maharashtra 400001',
    additionalDetails: ''
  });

  const documentTypes = [
    { value: 'offer-letter', label: 'Offer Letter' },
    { value: 'appointment-letter', label: 'Appointment Letter' },
    { value: 'payslip', label: 'Payslip' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateDocument = () => {
    if (!documentType) {
      toast({
        title: "Error",
        description: "Please select a document type",
        variant: "destructive"
      });
      return;
    }

    if (!formData.employeeName || !formData.employeeId) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically generate the actual document
    // For now, we'll just show a success message
    toast({
      title: "Document Generated",
      description: `${documentTypes.find(t => t.value === documentType)?.label} has been generated successfully`,
    });
  };

  const getRequiredFields = () => {
    switch (documentType) {
      case 'offer-letter':
        return ['employeeName', 'designation', 'department', 'salary', 'joiningDate', 'workLocation'];
      case 'appointment-letter':
        return ['employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'reportingManager'];
      case 'payslip':
        return ['employeeName', 'employeeId', 'designation', 'department', 'salary'];
      default:
        return [];
    }
  };

  const isFieldRequired = (field: string) => {
    return getRequiredFields().includes(field);
  };

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Generate Document</h1>
        <p className="text-gray-600">Generate official documents for employees</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Type Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {documentTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={documentType === type.value ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setDocumentType(type.value)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {type.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!documentType ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Please select a document type to continue</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeName">
                      Employee Name {isFieldRequired('employeeName') && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="employeeName"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange('employeeName', e.target.value)}
                      placeholder="Enter employee name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="employeeId">
                      Employee ID {isFieldRequired('employeeId') && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      placeholder="Enter employee ID"
                    />
                  </div>

                  <div>
                    <Label htmlFor="designation">
                      Designation {isFieldRequired('designation') && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="Enter designation"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">
                      Department {isFieldRequired('department') && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>

                  {(documentType === 'offer-letter' || documentType === 'payslip') && (
                    <div>
                      <Label htmlFor="salary">
                        Salary {isFieldRequired('salary') && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id="salary"
                        value={formData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        placeholder="Enter salary amount"
                        type="number"
                      />
                    </div>
                  )}

                  {(documentType === 'offer-letter' || documentType === 'appointment-letter') && (
                    <div>
                      <Label htmlFor="joiningDate">
                        Joining Date {isFieldRequired('joiningDate') && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id="joiningDate"
                        value={formData.joiningDate}
                        onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                        type="date"
                      />
                    </div>
                  )}

                  {documentType === 'offer-letter' && (
                    <div>
                      <Label htmlFor="workLocation">
                        Work Location {isFieldRequired('workLocation') && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id="workLocation"
                        value={formData.workLocation}
                        onChange={(e) => handleInputChange('workLocation', e.target.value)}
                        placeholder="Enter work location"
                      />
                    </div>
                  )}

                  {documentType === 'appointment-letter' && (
                    <div>
                      <Label htmlFor="reportingManager">
                        Reporting Manager {isFieldRequired('reportingManager') && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id="reportingManager"
                        value={formData.reportingManager}
                        onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                        placeholder="Enter reporting manager"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                      type="email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter employee address"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalDetails">Additional Details</Label>
                  <Textarea
                    id="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                    placeholder="Enter any additional details"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleGenerateDocument} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Generate & Download
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateDocument;
