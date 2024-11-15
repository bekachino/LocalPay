import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminHome from './Containers/Admin/AdminHome/AdminHome';
import Login from './Containers/Login/Login';
import Alerts from './Components/UI/Alerts/Alerts';
import UserHome from './Containers/User/UserHome/UserHome';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from './app/hooks';
import SupervisorHome from './Containers/Supervisor/SupervisorHome/SupervisorHome';
import CreateEditUser from './Containers/Admin/CreateEditUser/CreateEditUser';
import Users from './Containers/Admin/Users/Users';
import IconButton from './Components/UI/IconButton/IconButton';
import HomeIcon from './assets/home-icon.svg';
import Payments from './Containers/Admin/Payments/Payments';
import './App.css';
import Profile from './Containers/Profile/Profile';
import CreatePayment from './Containers/User/CreatePayment/CreatePayment';
import Comments from './Containers/Admin/Comments/Comments';

function App() {
  const { user } = useAppSelector((state) => state.userState);
  const { pathname } = useLocation();

  const routes = {
    nonAuthUser: (
      <>
        <Route path="/login" element={<Login />} />
      </>
    ),
    authUser: (
      <>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-payment" element={<CreatePayment />} />
      </>
    ),
    user: (
      <>
        <Route path="/home" element={<UserHome />} />
      </>
    ),
    supervisor: (
      <>
        <Route path="/home" element={<SupervisorHome />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payments" element={<Payments />} />
      </>
    ),
    admin: (
      <>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/create-user" element={<CreateEditUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<CreateEditUser isEdit />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/comments" element={<Comments />} />
      </>
    ),
  };

  return (
    <div className="App">
      {!['/home', '/login'].includes(pathname) && (
        <IconButton
          icon={HomeIcon}
          color="success"
          borderRadius="50%"
          size="30px"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1,
            padding: '9px 11px 11px',
          }}
          linkTo="/home"
        />
      )}
      <Alerts />
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/${!!user ? 'home' : 'login'}`} replace />}
        />
        {!user && routes.nonAuthUser}
        {!!user && routes.authUser}
        {!!user && routes[jwtDecode(user.access || '')?.role || 'nonAuth']}
      </Routes>
    </div>
  );
}

export default App;
