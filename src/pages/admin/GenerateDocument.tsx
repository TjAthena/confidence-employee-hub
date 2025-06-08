
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GenerateDocument = () => {
  const [documentType, setDocumentType] = useState('');
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    designation: '',
    department: '',
    compensation: '',
    joiningDate: '',
    workLocation: '',
    reportingManager: '',
    email: '',
    phone: '',
    address: '',
    companyName: 'Confidence Financial Services',
    companyAddress: '123 Business District, Mumbai, Maharashtra 400001',
    // Offer Letter specific fields
    issuedDate: '',
    candidateName: '',
    positionOffered: '',
    annualCtc: '',
    // Payslip specific fields
    payslipMonth: '',
    payslipYear: '',
    totalWorkingDays: '',
    presentDays: '',
    leaveDays: '',
    lopDays: '',
    bonuses: '',
    providentFund: '',
    professionalTax: '',
    mediclaim: '',
    incomeTax: '',
    termInsurance: ''
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

    // Validate required fields based on document type
    const requiredFields = getRequiredFields();
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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
        return ['issuedDate', 'candidateName', 'positionOffered', 'annualCtc', 'workLocation'];
      case 'appointment-letter':
        return ['employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'reportingManager'];
      case 'payslip':
        return ['employeeId', 'payslipMonth', 'payslipYear', 'totalWorkingDays', 'presentDays', 'leaveDays', 'lopDays', 'bonuses', 'providentFund', 'professionalTax', 'mediclaim', 'incomeTax', 'termInsurance'];
      default:
        return [];
    }
  };

  const isFieldRequired = (field: string) => {
    return getRequiredFields().includes(field);
  };

  const renderOfferLetterForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issuedDate">
            Issued Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="issuedDate"
            value={formData.issuedDate}
            onChange={(e) => handleInputChange('issuedDate', e.target.value)}
            type="date"
          />
        </div>

        <div>
          <Label htmlFor="candidateName">
            Candidate Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="candidateName"
            value={formData.candidateName}
            onChange={(e) => handleInputChange('candidateName', e.target.value)}
            placeholder="Enter candidate name"
          />
        </div>

        <div>
          <Label htmlFor="positionOffered">
            Position Offered/Designation <span className="text-red-500">*</span>
          </Label>
          <Input
            id="positionOffered"
            value={formData.positionOffered}
            onChange={(e) => handleInputChange('positionOffered', e.target.value)}
            placeholder="Enter position offered"
          />
        </div>

        <div>
          <Label htmlFor="annualCtc">
            Annual CTC <span className="text-red-500">*</span>
          </Label>
          <Input
            id="annualCtc"
            value={formData.annualCtc}
            onChange={(e) => handleInputChange('annualCtc', e.target.value)}
            placeholder="Enter annual CTC amount"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="workLocation">
            Work Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="workLocation"
            value={formData.workLocation}
            onChange={(e) => handleInputChange('workLocation', e.target.value)}
            placeholder="Enter work location"
          />
        </div>
      </div>
    </div>
  );

  const renderAppointmentLetterForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employeeName">
            Employee Name <span className="text-red-500">*</span>
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
            Employee ID <span className="text-red-500">*</span>
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
            Designation <span className="text-red-500">*</span>
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
            Department <span className="text-red-500">*</span>
          </Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            placeholder="Enter department"
          />
        </div>

        <div>
          <Label htmlFor="joiningDate">
            Joining Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="joiningDate"
            value={formData.joiningDate}
            onChange={(e) => handleInputChange('joiningDate', e.target.value)}
            type="date"
          />
        </div>

        <div>
          <Label htmlFor="reportingManager">
            Reporting Manager <span className="text-red-500">*</span>
          </Label>
          <Input
            id="reportingManager"
            value={formData.reportingManager}
            onChange={(e) => handleInputChange('reportingManager', e.target.value)}
            placeholder="Enter reporting manager"
          />
        </div>
      </div>
    </div>
  );

  const renderPayslipForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employeeId">
            Employee ID <span className="text-red-500">*</span>
          </Label>
          <Input
            id="employeeId"
            value={formData.employeeId}
            onChange={(e) => handleInputChange('employeeId', e.target.value)}
            placeholder="Enter employee ID"
          />
        </div>

        <div>
          <Label htmlFor="payslipMonth">
            Payslip Month <span className="text-red-500">*</span>
          </Label>
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
          <Label htmlFor="payslipYear">
            Payslip Year <span className="text-red-500">*</span>
          </Label>
          <Input
            id="payslipYear"
            value={formData.payslipYear}
            onChange={(e) => handleInputChange('payslipYear', e.target.value)}
            placeholder="Enter year (e.g., 2024)"
            type="number"
            min="2020"
            max="2030"
          />
        </div>

        <div>
          <Label htmlFor="totalWorkingDays">
            Total Working Days <span className="text-red-500">*</span>
          </Label>
          <Input
            id="totalWorkingDays"
            value={formData.totalWorkingDays}
            onChange={(e) => handleInputChange('totalWorkingDays', e.target.value)}
            placeholder="Enter total working days"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="presentDays">
            Present Days <span className="text-red-500">*</span>
          </Label>
          <Input
            id="presentDays"
            value={formData.presentDays}
            onChange={(e) => handleInputChange('presentDays', e.target.value)}
            placeholder="Enter present days"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="leaveDays">
            Leave Days <span className="text-red-500">*</span>
          </Label>
          <Input
            id="leaveDays"
            value={formData.leaveDays}
            onChange={(e) => handleInputChange('leaveDays', e.target.value)}
            placeholder="Enter leave days"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="lopDays">
            LOP Days (Loss of Pay) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lopDays"
            value={formData.lopDays}
            onChange={(e) => handleInputChange('lopDays', e.target.value)}
            placeholder="Enter LOP days"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="bonuses">
            Bonuses/Incentives <span className="text-red-500">*</span>
          </Label>
          <Input
            id="bonuses"
            value={formData.bonuses}
            onChange={(e) => handleInputChange('bonuses', e.target.value)}
            placeholder="Enter bonus amount"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="providentFund">
            Provident Fund <span className="text-red-500">*</span>
          </Label>
          <Input
            id="providentFund"
            value={formData.providentFund}
            onChange={(e) => handleInputChange('providentFund', e.target.value)}
            placeholder="Enter PF amount"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="professionalTax">
            Professional Tax <span className="text-red-500">*</span>
          </Label>
          <Input
            id="professionalTax"
            value={formData.professionalTax}
            onChange={(e) => handleInputChange('professionalTax', e.target.value)}
            placeholder="Enter professional tax"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="mediclaim">
            Mediclaim <span className="text-red-500">*</span>
          </Label>
          <Input
            id="mediclaim"
            value={formData.mediclaim}
            onChange={(e) => handleInputChange('mediclaim', e.target.value)}
            placeholder="Enter mediclaim amount"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="incomeTax">
            Income Tax <span className="text-red-500">*</span>
          </Label>
          <Input
            id="incomeTax"
            value={formData.incomeTax}
            onChange={(e) => handleInputChange('incomeTax', e.target.value)}
            placeholder="Enter income tax"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="termInsurance">
            Term Insurance <span className="text-red-500">*</span>
          </Label>
          <Input
            id="termInsurance"
            value={formData.termInsurance}
            onChange={(e) => handleInputChange('termInsurance', e.target.value)}
            placeholder="Enter term insurance"
            type="number"
          />
        </div>
      </div>
    </div>
  );

  const renderFormBasedOnType = () => {
    switch (documentType) {
      case 'offer-letter':
        return renderOfferLetterForm();
      case 'appointment-letter':
        return renderAppointmentLetterForm();
      case 'payslip':
        return renderPayslipForm();
      default:
        return null;
    }
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
                {renderFormBasedOnType()}

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
