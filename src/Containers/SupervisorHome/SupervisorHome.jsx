import React from 'react';
import Paper from "../../Components/Paper/Paper";
import LogoutIcon from "../../assets/logout.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userThunk";
import './supervisorHome.css';

const SupervisorHome = () => {
  const dispatch = useDispatch();

  return (
    <div className='home'>
      <Paper className='home-paper'>
        <h1>Панель супервайзера</h1>
        <div className='home-nav-btns'>
          <CustomButton
            color='error'
            size='large'
            icon={LogoutIcon}
            onClick={() => dispatch(logout())}
          >Выход</CustomButton>
        </div>
      </Paper>
    </div>
  );
};

export default SupervisorHome;