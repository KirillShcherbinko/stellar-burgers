import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthorized,
  selectIsUserLoading
} from '../../slices/userSlice';
import { ReactNode } from 'react';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  forAuthorized: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  forAuthorized = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isUserLoading = useSelector(selectIsUserLoading);
  const isAuthorized = useSelector(selectIsAuthorized);
  const from = location.state?.from || '/';

  if (!isUserLoading) {
    return <Preloader />;
  }

  if (!forAuthorized && isAuthorized) {
    return <Navigate to={from} />;
  }

  if (forAuthorized && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
