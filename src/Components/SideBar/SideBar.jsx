import React from 'react';
import CustomButton from '../UI/CustomButton/CustomButton';
import UserIcon from '../../assets/user-icon.svg';
import GroupIcon from '../../assets/people-group.svg';
import PaymentIcon from '../../assets/payment.svg';
import newUserIcon from '../../assets/new-user.svg';
import LogoutIcon from '../../assets/logout.svg';
import { logout } from '../../features/user/userThunk';
import { useDispatch } from 'react-redux';
import './sidebar.css';
import { useAppSelector } from '../../app/hooks';
import { jwtDecode } from 'jwt-decode';

const SideBar = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.userState);
  
  return (
    <div className='sidebar'>
      <CustomButton
        color='warning'
        size='small'
        icon={UserIcon}
        linkTo='/profile'
      >
        Профиль
      </CustomButton>
      {[
        'admin',
      ].includes(jwtDecode(user.access || '')?.role) && <CustomButton
        className='t-nw'
        color='secondary'
        size='small'
        icon={newUserIcon}
        linkTo='/create-user'
      >
        Добавить пользователя
      </CustomButton>}
      {[
        'admin',
        'supervisor',
      ].includes(jwtDecode(user.access || '')?.role) && <>
        <CustomButton
          color='primary'
          size='small'
          icon={GroupIcon}
          linkTo='/users'
        >
          Пользователи
        </CustomButton>
        <CustomButton
          color='success'
          size='small'
          icon={PaymentIcon}
          linkTo='/payments'
        >
          Платежи
        </CustomButton>
        <CustomButton
          color='success'
          size='small'
          icon={PaymentIcon}
          linkTo='/comments'
        >
          Операции платежей
        </CustomButton></>}
      {[
        'user',
      ].includes(jwtDecode(user.access || '')?.role) && <CustomButton
        color='success'
        size='small'
        icon={PaymentIcon}
        linkTo='/create-payment'
      >
        Оплатить
      </CustomButton>}
      <CustomButton
        color='error'
        size='small'
        icon={LogoutIcon}
        onClick={() => dispatch(logout())}
        style={{ marginTop: 'auto' }}
      >
        Выход
      </CustomButton>
    </div>
  );
};

export default SideBar;