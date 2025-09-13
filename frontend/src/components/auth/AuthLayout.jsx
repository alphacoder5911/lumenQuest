import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { verifyToken } from '../../store/slices/authSlice';

const AuthLayout = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to appropriate dashboard
    if (user && token) {
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  }, [user, token, navigate]);

  return <Outlet />;
};

export default AuthLayout;