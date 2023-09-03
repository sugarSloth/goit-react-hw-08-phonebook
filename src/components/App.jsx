import { useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchGetUser, fetchLogout } from 'redux/fetchUser';
import { fetchContacts } from 'redux/fetchContacts';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import SharedLayout from 'pages/SharedLayout';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Contacts = lazy(() => import('../pages/Contacts'));

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchGetUser()).unwrap();
        await dispatch(fetchContacts());
      } catch (error) {
        dispatch(fetchLogout());
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <>
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
    </>
  );
}
