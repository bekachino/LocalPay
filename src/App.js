import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "./Containers/AdminHome/AdminHome";
import Login from "./Containers/Login/Login";
import Alerts from "./Components/Alerts/Alerts";
import UserHome from "./Containers/UserHome/UserHome";
import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "./app/hooks";
import SupervisorHome from "./Containers/SupervisorHome/SupervisorHome";
import './App.css';

function App() {
  const { user } = useAppSelector(state => state.userState);
  
  const nonAuthRoutes = (
    <Route
      path='/login'
      element={<Login/>}
    />
  );
  
  const userRoutes = (
    <Route
      path='/home'
      element={<UserHome/>}
    />
  );
  
  const supervisorRoutes = (
    <Route
      path='/home'
      element={<SupervisorHome/>}
    />
  );
  
  const adminRoutes = (
    <Route
      path='/home'
      element={<AdminHome/>}
    />
  );
  
  return (
    <div className='App'>
      <Alerts/>
      <Routes>
        <Route
          path='*'
          element={<Navigate
            to={`/${!!user ? 'home' : 'login'}`}
            replace
          />}
        />
        {!user && nonAuthRoutes}
        {!!user && <>
          {jwtDecode(user.access || '')?.role === 'user' && userRoutes}
          {jwtDecode(user.access || '')?.role === 'supervisor' && supervisorRoutes}
          {jwtDecode(user.access || '')?.role === 'admin' && adminRoutes}
        </>}
      </Routes>
    </div>
  );
}

export default App;
