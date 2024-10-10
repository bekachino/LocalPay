import React from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import CustomButton from "../../../Components/UI/CustomButton/CustomButton";
import LogoutIcon from "../../../assets/logout.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/user/userThunk";
import './userHome.css';

const UserHome = () => {
  const dispatch = useDispatch();

  return (
    <div className='home'>
      <Paper className='home-paper'>
        <h1>Панель пользователя</h1>
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

export default UserHome;