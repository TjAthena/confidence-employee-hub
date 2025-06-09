
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Calendar, DollarSign, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GenerateDocument = () => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    employeeId: '',
    employeeName: '',
    department: '',
    designation: '',
    
    // Offer Letter specific
    joiningDate: '',
    salary: '',
    
    // Increment Letter specific
    incrementPercentage: '',
    newSalary: '',
    effectiveDate: '',
    
    // Appointment Letter specific
    appointmentDate: '',
    reportingManager: '',
    
    // Promotion Letter specific
    newDesignation: '',
    promotionDate: '',
    
    // Payslip specific
    payslipMonth: '',
    payslipYear: '',
    totalWorkingDays: '',
    presentDays: '',
    leaveDays: '',
    lopDays: '',
    providentFund: '',
    professionalTax: '',
    mediclaim: '',
    incomeTax: '',
    termInsurance: ''
  });

  const documentTypes = [
    { value: 'offer-letter', label: 'Offer Letter', icon: FileText },
    { value: 'appointment-letter', label: 'Appointment Letter', icon: FileText },
    { value: 'increment-letter', label: 'Increment Letter', icon: DollarSign },
    { value: 'promotion-letter', label: 'Promotion Letter', icon: User },
    { value: 'payslip', label: 'Payslip', icon: Calendar }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = () => {
    if (!selectedDocument) {
      toast({
        title: "Error",
        description: "Please select a document type",
        variant: "destructive"
      });
      return;
    }

    // Basic validation
    if (!formData.employeeId || !formData.employeeName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Document-specific validation
    if (selectedDocument === 'payslip') {
      const requiredFields = ['payslipMonth', 'payslipYear', 'totalWorkingDays', 'presentDays'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Error",
          description: "Please fill in all required payslip fields",
          variant: "destructive"
        });
        return;
      }
    }

    toast({
      title: "Success",
      description: `${documentTypes.find(doc => doc.value === selectedDocument)?.label} generated successfully and ready for download`
    });
  };

  const renderDocumentSpecificFields = () => {
    switch (selectedDocument) {
      case 'offer-letter':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="salary">Annual CTC</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="Enter annual CTC"
                />
              </div>
            </div>
          </>
        );

      case 'appointment-letter':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointmentDate">Appointment Date</Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="reportingManager">Reporting Manager</Label>
                <Input
                  id="reportingManager"
                  value={formData.reportingManager}
                  onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                  placeholder="Enter reporting manager name"
                />
              </div>
            </div>
          </>
        );

      case 'increment-letter':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="incrementPercentage">Increment Percentage</Label>
                <Input
                  id="incrementPercentage"
                  value={formData.incrementPercentage}
                  onChange={(e) => handleInputChange('incrementPercentage', e.target.value)}
                  placeholder="Enter increment %"
                />
              </div>
              <div>
                <Label htmlFor="newSalary">New Annual CTC</Label>
                <Input
                  id="newSalary"
                  value={formData.newSalary}
                  onChange={(e) => handleInputChange('newSalary', e.target.value)}
                  placeholder="Enter new annual CTC"
                />
              </div>
              <div>
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 'promotion-letter':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newDesignation">New Designation</Label>
                <Input
                  id="newDesignation"
                  value={formData.newDesignation}
                  onChange={(e) => handleInputChange('newDesignation', e.target.value)}
                  placeholder="Enter new designation"
                />
              </div>
              <div>
                <Label htmlFor="promotionDate">Promotion Date</Label>
                <Input
                  id="promotionDate"
                  type="date"
                  value={formData.promotionDate}
                  onChange={(e) => handleInputChange('promotionDate', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 'payslip':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="payslipMonth">Payslip Month</Label>
                <Select value={formData.payslipMonth} onValueChange={(value) => handleInputChange('payslipMonth', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">January</SelectItem>
                    <SelectItem value="02">February</SelectItem>
                    <SelectItem value="03">March</SelectItem>
                    <SelectItem value="04">April</SelectItem>
                    <SelectItem value="05">May</SelectItem>
                    <SelectItem value="06">June</SelectItem>
                    <SelectItem value="07">July</SelectItem>
                    <SelectItem value="08">August</SelectItem>
                    <SelectItem value="09">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="payslipYear">Payslip Year</Label>
                <Input
                  id="payslipYear"
                  value={formData.payslipYear}
                  onChange={(e) => handleInputChange('payslipYear', e.target.value)}
                  placeholder="Enter year"
                />
              </div>
              <div>
                <Label htmlFor="totalWorkingDays">Total Working Days</Label>
                <Input
                  id="totalWorkingDays"
                  value={formData.totalWorkingDays}
                  onChange={(e) => handleInputChange('totalWorkingDays', e.target.value)}
                  placeholder="Enter total working days"
                />
              </div>
              <div>
                <Label htmlFor="presentDays">Present Days</Label>
                <Input
                  id="presentDays"
                  value={formData.presentDays}
                  onChange={(e) => handleInputChange('presentDays', e.target.value)}
                  placeholder="Enter present days"
                />
              </div>
              <div>
                <Label htmlFor="leaveDays">Leave Days</Label>
                <Input
                  id="leaveDays"
                  value={formData.leaveDays}
                  onChange={(e) => handleInputChange('leaveDays', e.target.value)}
                  placeholder="Enter leave days"
                />
              </div>
              <div>
                <Label htmlFor="lopDays">LOP Days (Loss of Pay)</Label>
                <Input
                  id="lopDays"
                  value={formData.lopDays}
                  onChange={(e) => handleInputChange('lopDays', e.target.value)}
                  placeholder="Enter LOP days"
                />
              </div>
              <div>
                <Label htmlFor="providentFund">Provident Fund</Label>
                <Input
                  id="providentFund"
                  value={formData.providentFund}
                  onChange={(e) => handleInputChange('providentFund', e.target.value)}
                  placeholder="Enter PF amount"
                />
              </div>
              <div>
                <Label htmlFor="professionalTax">Professional Tax</Label>
                <Input
                  id="professionalTax"
                  value={formData.professionalTax}
                  onChange={(e) => handleInputChange('professionalTax', e.target.value)}
                  placeholder="Enter professional tax"
                />
              </div>
              <div>
                <Label htmlFor="mediclaim">Mediclaim</Label>
                <Input
                  id="mediclaim"
                  value={formData.mediclaim}
                  onChange={(e) => handleInputChange('mediclaim', e.target.value)}
                  placeholder="Enter mediclaim amount"
                />
              </div>
              <div>
                <Label htmlFor="incomeTax">Income Tax</Label>
                <Input
                  id="incomeTax"
                  value={formData.incomeTax}
                  onChange={(e) => handleInputChange('incomeTax', e.target.value)}
                  placeholder="Enter income tax"
                />
              </div>
              <div>
                <Label htmlFor="termInsurance">Term Insurance</Label>
                <Input
                  id="termInsurance"
                  value={formData.termInsurance}
                  onChange={(e) => handleInputChange('termInsurance', e.target.value)}
                  placeholder="Enter term insurance"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Generate Documents</h1>
        <p className="text-gray-600">Create official documents for employees</p>
      </div>

      {/* Document Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Document Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {documentTypes.map((docType) => {
              const Icon = docType.icon;
              return (
                <button
                  key={docType.value}
                  onClick={() => setSelectedDocument(docType.value)}
                  className={`p-4 border rounded-lg text-center transition-all hover:scale-105 ${
                    selectedDocument === docType.value
                      ? 'border-blue-accent bg-blue-50 text-blue-accent'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium text-sm">{docType.label}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Document Form */}
      {selectedDocument && (
        <Card>
          <CardHeader>
            <CardTitle>
              {documentTypes.find(doc => doc.value === selectedDocument)?.label} Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
              <div>
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange('employeeName', e.target.value)}
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Enter department"
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
            </div>

            {/* Document Specific Fields */}
            {renderDocumentSpecificFields()}

            {/* Generate Button */}
            <div className="pt-4">
              <Button 
                onClick={handleGenerate}
                className="bg-blue-accent hover:bg-blue-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Generate {documentTypes.find(doc => doc.value === selectedDocument)?.label}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GenerateDocument;
