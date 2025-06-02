
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!credentials.id || !credentials.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(credentials.id, credentials.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        // Redirect based on user role
        if (credentials.id.startsWith('admin')) {
          navigate('/admin/dashboard');
        } else {
          navigate('/employee/profile');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/3adc0623-9d8c-4697-960c-98ba3ac3e044.png" 
              alt="Confidence Financial Services" 
              className="w-16 h-16 bg-white rounded-full p-2 mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">CONFIDENCE</h2>
            <h3 className="text-2xl font-semibold mb-6">FINANCIAL SERVICES</h3>
            <div className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium inline-block mb-4">
              ₹Protection ₹Security ₹Freedom
            </div>
          </div>
          
          {/* Illustration Icons */}
          <div className="space-y-4 opacity-80">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <span>Financial Protection</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">🏠</span>
              </div>
              <span>Secure Investments</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">⚕️</span>
              </div>
              <span>Health Insurance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/lovable-uploads/3adc0623-9d8c-4697-960c-98ba3ac3e044.png" 
              alt="Confidence Financial Services" 
              className="w-16 h-16 bg-white rounded-full p-2 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white mb-2">CONFIDENCE</h1>
            <h2 className="text-xl font-semibold text-white">FINANCIAL SERVICES</h2>
          </div>

          <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Sign In</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID / Admin ID
                  </label>
                  <Input
                    id="id"
                    type="text"
                    placeholder="Enter your ID"
                    value={credentials.id}
                    onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <button 
                    type="button" 
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm font-medium text-gray-700 mb-3 text-center">Demo Credentials:</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span className="font-medium text-blue-600">Admin:</span>
                    </div>
                    <span className="text-gray-600">ID: admin001, Password: admin123</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-green-600" />
                      <span className="font-medium text-green-600">Employee:</span>
                    </div>
                    <span className="text-gray-600">ID: emp001, Password: emp123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <div className="text-center mt-6 text-white text-sm opacity-80">
            <p>Error in Login: Contact admin for help</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
