import React, { useEffect } from 'react';
import Paper from "../../Components/UI/Paper/Paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { jwtDecode } from "jwt-decode";
import './profile.css';
import { getUser } from "../../features/data/dataThunk";
import { ROLES } from "../../constants";
import { formatDate } from "../../utils";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userState);
  const userProfileInfo = useAppSelector(state => state.dataState.user);
  
  useEffect(() => {
    const { user_id } = jwtDecode(user.access || '');
    if (!!user_id) {
      dispatch(getUser(user_id));
    }
  }, []);
  
  return (
    <div className='profile'>
      <Paper className='home-paper'>
        <h1>Профиль</h1>
        <Paper
          style={{
            marginTop: '20px',
            width: '100%'
          }}
          className='profile-info'
        >
          <div className='profile-info-row'>
            <strong>ФИО</strong>
            <span>{userProfileInfo?.name || '-'} {userProfileInfo?.surname || '-'}</span>
          </div>
          <div className='profile-info-row'>
            <strong>Роль</strong>
            <span>
              {!!userProfileInfo?.role ? ROLES.find(role => role.en === userProfileInfo?.role)?.ru : '-'}
            </span>
          </div>
          <div className='profile-info-row'>
            <strong>Баланс</strong>
            <span>
              {userProfileInfo?.balance || 0}
              <span className='currence-highlight'>с</span>
            </span>
          </div>
          <div className='profile-info-row'>
            <strong>Затраты</strong>
            <span>
              {userProfileInfo?.avail_balance || 0}
              <span className='currence-highlight'>с</span>
            </span>
          </div>
          <div className='profile-info-row'>
            <strong>Область</strong>
            <span>{userProfileInfo?.region || '-'}</span>
          </div>
          <div className='profile-info-row'>
            <strong>Дата регистрации</strong>
            <span>{!!userProfileInfo?.date_reg ? formatDate(userProfileInfo?.date_reg) : '-'}</span>
          </div>
          <div className='profile-info-row'>
            <strong>Комментарий</strong>
            <span>{userProfileInfo?.comment || '-'}</span>
          </div>
          <div className='profile-info-row'>
            <strong>Статус</strong>
            <span className={`user-status-${userProfileInfo?.is_active ? 'active' : 'inactive'}`}>{userProfileInfo?.is_active ? 'Активный' : 'Заблокирован'}</span>
          </div>
        </Paper>
      </Paper>
    </div>
  );
};

export default Profile;