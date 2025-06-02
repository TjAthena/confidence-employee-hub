
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AddEmployeeFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Login
    employeeId: '',
    password: '',
    // Personal
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    dob: undefined as Date | undefined,
    gender: '',
    maritalStatus: '',
    nationality: 'Indian',
    // Identification
    aadhaar: '',
    pan: '',
    // Address
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    currentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAsPermanent: false,
    // Bank
    bankName: '',
    branch: '',
    ifsc: '',
    accountNumber: '',
    accountType: '',
    // Education
    degree: '',
    institute: '',
    year: '',
    // Emergency Contact
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      address: ''
    },
    // Salary
    designation: '',
    department: '',
    ctc: 0,
    basic: 0,
    hra: 0,
    conveyance: 0,
    medical: 0,
    pf: 0,
    otherAllowances: 0
  });

  const [showOfferLetter, setShowOfferLetter] = useState(false);

  const handleInputChange = (field: string, value: any, section?: string) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSameAsPermanent = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAsPermanent: checked,
      currentAddress: checked ? { ...prev.permanentAddress } : prev.currentAddress
    }));
  };

  const calculateSalaryBreakdown = (ctc: number) => {
    const basic = Math.round(ctc * 0.5);
    const hra = Math.round(basic * 0.3);
    const conveyance = 30000;
    const medical = 30000;
    const pf = Math.round(basic * 0.12);
    const otherAllowances = ctc - basic - hra - conveyance - medical - pf;

    setFormData(prev => ({
      ...prev,
      ctc,
      basic,
      hra,
      conveyance,
      medical,
      pf,
      otherAllowances
    }));
  };

  const generateEmployeeId = () => {
    const id = `EMP${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    setFormData(prev => ({ ...prev, employeeId: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.employeeId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    setShowOfferLetter(true);
    
    toast({
      title: "Success",
      description: "Employee added successfully"
    });
  };

  const downloadOfferLetter = () => {
    toast({
      title: "Offer Letter",
      description: "Offer letter generated and downloaded"
    });
  };

  if (showOfferLetter) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-green-600">Employee Created Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold mb-2">Offer Letter Details Include:</h3>
            <ul className="text-sm space-y-1">
              <li>• Employee Name: {formData.firstName} {formData.lastName}</li>
              <li>• Employee ID: {formData.employeeId}</li>
              <li>• Designation: {formData.designation}</li>
              <li>• Department: {formData.department}</li>
              <li>• Annual CTC: ₹{formData.ctc.toLocaleString()}</li>
              <li>• Monthly Salary: ₹{Math.round(formData.ctc/12).toLocaleString()}</li>
              <li>• Joining Date: {new Date().toLocaleDateString()}</li>
              <li>• Reporting Manager details</li>
              <li>• Company policies and benefits</li>
              <li>• Terms and conditions of employment</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <Button onClick={downloadOfferLetter} className="bg-blue-accent hover:bg-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Download Offer Letter
            </Button>
            <Button variant="outline" onClick={() => setShowOfferLetter(false)}>
              Back to Form
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Login Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Login Credentials</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employeeId">Employee ID *</Label>
            <div className="flex gap-2">
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                placeholder="Employee ID"
                required
              />
              <Button type="button" onClick={generateEmployeeId} variant="outline">
                Generate
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Default password"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="alternatePhoneNumber">Alternate Phone</Label>
            <Input
              id="alternatePhoneNumber"
              value={formData.alternatePhoneNumber}
              onChange={(e) => handleInputChange('alternatePhoneNumber', e.target.value)}
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dob}
                  onSelect={(date) => handleInputChange('dob', date)}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Identification */}
      <Card>
        <CardHeader>
          <CardTitle>Identification</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input
              id="aadhaar"
              value={formData.aadhaar}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder="XXXX XXXX XXXX"
            />
          </div>
          <div>
            <Label htmlFor="pan">PAN Number</Label>
            <Input
              id="pan"
              value={formData.pan}
              onChange={(e) => handleInputChange('pan', e.target.value)}
              placeholder="ABCDE1234F"
            />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Permanent Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="permanentStreet">Street Address</Label>
                <Input
                  id="permanentStreet"
                  value={formData.permanentAddress.street}
                  onChange={(e) => handleInputChange('street', e.target.value, 'permanentAddress')}
                />
              </div>
              <div>
                <Label htmlFor="permanentCity">City</Label>
                <Input
                  id="permanentCity"
                  value={formData.permanentAddress.city}
                  onChange={(e) => handleInputChange('city', e.target.value, 'permanentAddress')}
                />
              </div>
              <div>
                <Label htmlFor="permanentState">State</Label>
                <Input
                  id="permanentState"
                  value={formData.permanentAddress.state}
                  onChange={(e) => handleInputChange('state', e.target.value, 'permanentAddress')}
                />
              </div>
              <div>
                <Label htmlFor="permanentPincode">Pincode</Label>
                <Input
                  id="permanentPincode"
                  value={formData.permanentAddress.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value, 'permanentAddress')}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsPermanent"
              checked={formData.sameAsPermanent}
              onCheckedChange={handleSameAsPermanent}
            />
            <Label htmlFor="sameAsPermanent">Current address same as permanent</Label>
          </div>

          {!formData.sameAsPermanent && (
            <div>
              <h4 className="font-medium mb-3">Current Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="currentStreet">Street Address</Label>
                  <Input
                    id="currentStreet"
                    value={formData.currentAddress.street}
                    onChange={(e) => handleInputChange('street', e.target.value, 'currentAddress')}
                  />
                </div>
                <div>
                  <Label htmlFor="currentCity">City</Label>
                  <Input
                    id="currentCity"
                    value={formData.currentAddress.city}
                    onChange={(e) => handleInputChange('city', e.target.value, 'currentAddress')}
                  />
                </div>
                <div>
                  <Label htmlFor="currentState">State</Label>
                  <Input
                    id="currentState"
                    value={formData.currentAddress.state}
                    onChange={(e) => handleInputChange('state', e.target.value, 'currentAddress')}
                  />
                </div>
                <div>
                  <Label htmlFor="currentPincode">Pincode</Label>
                  <Input
                    id="currentPincode"
                    value={formData.currentAddress.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value, 'currentAddress')}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              value={formData.branch}
              onChange={(e) => handleInputChange('branch', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input
              id="ifsc"
              value={formData.ifsc}
              onChange={(e) => handleInputChange('ifsc', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="accountType">Account Type</Label>
            <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="current">Current</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) => handleInputChange('degree', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="institute">Institute</Label>
            <Input
              id="institute"
              value={formData.institute}
              onChange={(e) => handleInputChange('institute', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergencyName">Name</Label>
            <Input
              id="emergencyName"
              value={formData.emergencyContact.name}
              onChange={(e) => handleInputChange('name', e.target.value, 'emergencyContact')}
            />
          </div>
          <div>
            <Label htmlFor="emergencyRelationship">Relationship</Label>
            <Input
              id="emergencyRelationship"
              value={formData.emergencyContact.relationship}
              onChange={(e) => handleInputChange('relationship', e.target.value, 'emergencyContact')}
            />
          </div>
          <div>
            <Label htmlFor="emergencyPhone">Phone</Label>
            <Input
              id="emergencyPhone"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleInputChange('phone', e.target.value, 'emergencyContact')}
            />
          </div>
          <div>
            <Label htmlFor="emergencyAddress">Address</Label>
            <Input
              id="emergencyAddress"
              value={formData.emergencyContact.address}
              onChange={(e) => handleInputChange('address', e.target.value, 'emergencyContact')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Job & Salary */}
      <Card>
        <CardHeader>
          <CardTitle>Job & Salary Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="ctc">Annual CTC</Label>
            <Input
              id="ctc"
              type="number"
              value={formData.ctc}
              onChange={(e) => calculateSalaryBreakdown(Number(e.target.value))}
              placeholder="Enter annual CTC"
            />
          </div>

          {formData.ctc > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm">Basic (Monthly)</Label>
                <p className="font-medium">₹{Math.round(formData.basic/12).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm">HRA (Monthly)</Label>
                <p className="font-medium">₹{Math.round(formData.hra/12).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm">Conveyance (Monthly)</Label>
                <p className="font-medium">₹{Math.round(formData.conveyance/12).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm">Medical (Monthly)</Label>
                <p className="font-medium">₹{Math.round(formData.medical/12).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm">PF (Monthly)</Label>
                <p className="font-medium">₹{Math.round(formData.pf/12).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm">Others (Monthly)</Label>
                <p className="font-medium">₹{Math.round(formData.otherAllowances/12).toLocaleString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-accent hover:bg-blue-600">
          Create Employee
        </Button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
