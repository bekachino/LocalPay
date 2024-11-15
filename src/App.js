import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Containers/Login/Login';
import Alerts from './Components/UI/Alerts/Alerts';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from './app/hooks';
import CreateEditUser from './Containers/Admin/CreateEditUser/CreateEditUser';
import Users from './Containers/Admin/Users/Users';
import Payments from './Containers/Admin/Payments/Payments';
import Profile from './Containers/Profile/Profile';
import CreatePayment from './Containers/User/CreatePayment/CreatePayment';
import Comments from './Containers/Admin/Comments/Comments';
import SideBar from './Components/SideBar/SideBar';
import './App.css';

function App() {
  const { user } = useAppSelector((state) => state.userState);
  
  const routes = {
    nonAuthUser: (
      <>
        <Route
          path='/login'
          element={<Login />}
        />
      </>
    ),
    authUser: (
      <>
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/create-payment'
          element={<CreatePayment />}
        />
      </>
    ),
    user: (
      <>
      </>
    ),
    supervisor: (
      <>
        <Route
          path='/users'
          element={<Users />}
        />
        <Route
          path='/payments'
          element={<Payments />}
        />
      </>
    ),
    admin: (
      <>
        <Route
          path='/create-user'
          element={<CreateEditUser />}
        />
        <Route
          path='/users'
          element={<Users />}
        />
        <Route
          path='/edit-user/:id'
          element={<CreateEditUser isEdit />}
        />
        <Route
          path='/payments'
          element={<Payments />}
        />
        <Route
          path='/comments'
          element={<Comments />}
        />
      </>
    ),
  };
  
  return (
    <div className='App'>
      {!!user && <SideBar />}
      <Alerts />
      <Routes>
        <Route
          path='*'
          element={<Navigate
            to={`/${!!user ? [
              'user',
            ].includes(jwtDecode(user.access || '')?.role) ? 'create-payment' : 'payments' : 'login'}`}
            replace
          />}
        />
        {!user && routes.nonAuthUser}
        {!!user && routes.authUser}
        {!!user && routes[jwtDecode(user.access || '')?.role || 'nonAuth']}
      </Routes>
    </div>
  );
}

export default App;
