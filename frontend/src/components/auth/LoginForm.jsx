import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { login, reset, clearError } from '../../store/slices/authSlice';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Alert from '../ui/Alert';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'USER'
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error('Login error:', message);
    }

    if (isSuccess && user) {
      // Redirect based on user role
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }

    // Reset state after handling
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRoleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const handleAlertClose = () => {
    dispatch(clearError());
  };

  const roleOptions = [
    { value: 'USER', label: 'User' },
    { value: 'ADMIN', label: 'Admin' }
  ];

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        {isError && (
          <Alert
            type="error"
            title="Login Failed"
            message={message}
            onClose={handleAlertClose}
          />
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
            required
            error={isError}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
              required
              error={isError}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Login as
          </label>
          <Select
            id="role"
            name="role"
            options={roleOptions}
            value={role}
            onChange={onRoleChange}
            placeholder="Select your role"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Signing in...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;