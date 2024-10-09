import React from 'react';
import Paper from "../../Components/Paper/Paper";
import CustomButton from "../../Components/CustomButton/CustomButton";
import GroupIcon from '../../assets/people-group.svg';
import ReportIcon from '../../assets/report.svg';
import PaymentIcon from '../../assets/payment.svg';
import newUserIcon from '../../assets/new-user.svg';
import LogoutIcon from '../../assets/logout.svg';
import './adminHome.css';

const AdminHome = () => {
  return (
    <div className='home'>
      <Paper className='home-paper'>
        <h1>Панель администратора</h1>
        <div className='home-nav-btns'>
          <CustomButton
            color='primary'
            size='large'
            icon={GroupIcon}
          >Пользователи</CustomButton>
          <CustomButton
            color='warning'
            size='large'
            icon={ReportIcon}
          >Отчёты</CustomButton>
          <CustomButton
            color='success'
            size='large'
            icon={PaymentIcon}
          >Платежи</CustomButton>
          <CustomButton
            color='secondary'
            size='large'
            icon={newUserIcon}
          >Добавить пользователя</CustomButton>
          <CustomButton
            color='error'
            size='large'
            icon={LogoutIcon}
          >Выход</CustomButton>
        </div>
      </Paper>
    </div>
  );
};

export default AdminHome;