import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshUser } from 'redux/auth/operations';
import { PublicRoute } from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import SharedLayout from 'pages/SharedLayout';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Contacts = lazy(() => import('../pages/Contacts'));

export function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, navigate]);

  return (
    <Suspense fallback={<div />}>
      <ToastContainer autoClose={2000} hideProgressBar={true} />

      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
