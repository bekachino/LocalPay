import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "./Containers/AdminHome/AdminHome";
import Login from "./Containers/Login/Login";
import Alerts from "./Components/Alerts/Alerts";

function App() {
  const publicRoutes = (
    <Route
      path='/login'
      element={<Login/>}
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
            to='/login'
            replace
          />}
        />
        {publicRoutes}
        {adminRoutes}
      </Routes>
    </div>
  );
}

export default App;
