import React, { useEffect } from 'react';
import Paper from "../../../Components/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../features/admin/adminThunk";
import './users.css';
import { formatDate } from "../../../utils";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.adminState);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  return (
    <div className='users'>
      <Paper className='home-paper'>
        <h1>Пользователи</h1>
        <div className='users-list-container'>
          <table className='users-list'>
            <thead>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Логин</th>
              <th>Регион</th>
              <th>Доступный баланс</th>
              <th>Общие затраты</th>
              <th>Дата регистрации</th>
              <th>Комментарий</th>
              <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || '-'} {user.surname || '-'}</td>
                <td>{user.login || '-'}</td>
                <td>{user.region || '-'}</td>
                <td>
                  {user.balance || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td>
                  {user.avail_balance || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td>{!!user.date_reg ? formatDate(user.date_reg) : '-'}</td>
                <td></td>
                <td className={`user-status-${user.is_active ? 'active' : 'inactive'}`}>{user.is_active ? 'активный' : 'заблокирован'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};

export default Users;