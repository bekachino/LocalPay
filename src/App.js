import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "./Containers/AdminHome/AdminHome";

function App() {
  const publicRoutes = (
    <Route
      path='/home'
      element={<AdminHome/>}
    />
  );
  
  return (
    <div className='App'>
      <Routes>
        <Route
          path='*'
          element={<Navigate
            to='/login'
            replace
          />}
        />
        {publicRoutes}
      </Routes>
    </div>
  );
}

export default App;
