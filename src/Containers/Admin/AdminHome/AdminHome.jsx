import React from 'react';
import Paper from '../../../Components/UI/Paper/Paper';
import CustomButton from '../../../Components/UI/CustomButton/CustomButton';
import UserIcon from '../../../assets/user-icon.svg';
import GroupIcon from '../../../assets/people-group.svg';
import PaymentIcon from '../../../assets/payment.svg';
import newUserIcon from '../../../assets/new-user.svg';
import LogoutIcon from '../../../assets/logout.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/user/userThunk';
import './adminHome.css';

const AdminHome = () => {
  const dispatch = useDispatch();

  return (
    <div className="home">
      <Paper className="home-paper">
        <h1>Панель администратора</h1>
        <div className="home-nav-btns">
          <CustomButton
            color="warning"
            size="large"
            icon={UserIcon}
            linkTo="/profile"
          >
            Профиль
          </CustomButton>
          <CustomButton
            color="primary"
            size="large"
            icon={GroupIcon}
            linkTo="/users"
          >
            Пользователи
          </CustomButton>
          <CustomButton
            color="success"
            size="large"
            icon={PaymentIcon}
            linkTo="/payments"
          >
            Платежи
          </CustomButton>
          <CustomButton
            color="success"
            size="large"
            icon={PaymentIcon}
            linkTo="/comments"
          >
            Операции платежей
          </CustomButton>
          <CustomButton
            className="t-nw"
            color="secondary"
            size="large"
            icon={newUserIcon}
            linkTo="/create-user"
          >
            Добавить пользователя
          </CustomButton>
          <CustomButton
            color="error"
            size="large"
            icon={LogoutIcon}
            onClick={() => dispatch(logout())}
          >
            Выход
          </CustomButton>
        </div>
      </Paper>
    </div>
  );
};

export default AdminHome;
