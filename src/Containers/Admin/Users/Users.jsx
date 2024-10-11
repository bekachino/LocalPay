import React, { useEffect, useState } from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../features/admin/adminThunk";
import { formatDate } from "../../../utils";
import IconButton from "../../../Components/UI/IconButton/IconButton";
import SmallEditIcon from '../../../assets/small-edit-icon.svg';
import SmallDeleteIcon from '../../../assets/small-delete-icon.svg';
import { ROLES } from "../../../constants";
import UserDeleteConfirmation
  from "../../../Components/UI/UserDeleteConfirmation/UserDeleteConfirmation";
import './users.css';

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.adminState);
  const [usersInDeleteProcess, setUsersInDeleteProcess] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState('');
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const onDeleteUser = async id => {
    if (id) {
      setUsersInDeleteProcess(prevState => (
        [
          ...prevState,
          id,
        ]
      ));
      await dispatch(deleteUser(id));
      setUsersInDeleteProcess(prevState => (
        [...prevState.filter(prevId => prevId !== id)]
      ));
      toggleDeleteUserModal();
      dispatch(getUsers());
    }
  };
  
  const toggleDeleteUserModal = userId => {
    setDeleteUserId(userId || '');
  };
  
  return (
    <div className='users'>
      <Paper
        className='home-paper'
        style={{ maxWidth: '1120px' }}
      >
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
              <th>Затраты</th>
              <th>Списания</th>
              <th>Пополнения</th>
              <th>Дата регистрации</th>
              <th>Комментарий</th>
              <th>Роль</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {users?.map(user => (
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
                <td>
                  {user.write_off || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td>
                  {user.refill || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td>{!!user.date_reg ? formatDate(user.date_reg) : '-'}</td>
                <td style={{ textAlign: !!user.comment ? 'left' : 'center' }}>{user.comment || '-'}</td>
                <td style={{ textAlign: 'center' }}>{ROLES.find(role => role.en === user?.role)?.ru || '-'}</td>
                <td className={`user-status-${user.is_active ? 'active' : 'inactive'}`}>{user.is_active ? 'активный' : 'заблокирован'}</td>
                <td>
                  <div className='user-action-btns'>
                    <IconButton
                      icon={SmallEditIcon}
                      color='success'
                      size='20px'
                      linkTo={`/edit-user/${user?.id}`}
                    />
                    <IconButton
                      icon={SmallDeleteIcon}
                      color='error'
                      size='20px'
                      onClick={() => toggleDeleteUserModal(user?.id)}
                      loading={usersInDeleteProcess.includes(user?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Paper>
      {!!deleteUserId &&
        <UserDeleteConfirmation
          userId={deleteUserId}
          toggleModal={toggleDeleteUserModal}
          onDeleteUser={onDeleteUser}
        />}
    </div>
  );
};

export default Users;