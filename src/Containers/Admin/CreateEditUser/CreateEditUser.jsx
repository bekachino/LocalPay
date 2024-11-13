import React, { useEffect, useState } from 'react';
import Paper from '../../../Components/UI/Paper/Paper';
import Input from '../../../Components/UI/Input/Input';
import CustomButton from '../../../Components/UI/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { ROLES } from '../../../constants';
import Select from '../../../Components/UI/Select/Select';
import { createUser, editUser } from '../../../features/admin/adminThunk';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../../features/data/dataThunk';
import './createEditUser.css';

const CreateEditUser = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createUserLoading, getUserLoading } = useAppSelector(
    (state) => state.adminState
  );
  const { user } = useAppSelector((state) => state.dataState);
  const [state, setState] = useState({
    role: 'user',
    balance: 0,
    avail_balance: 0,
    refill: 0,
    write_off: 0,
  });

  useEffect(() => {
    if (isEdit && id) {
      dispatch(getUser(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && user) {
      setState(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(
        editUser({
          ...state,
          new_password: state.password,
          confirm_password: state.password,
          role: state?.role ? state.role : 'user',
        })
      ).then((res) => {
        if (!!res.payload.id) {
          navigate('/users');
        }
      });
    } else {
      dispatch(
        createUser({
          ...state,
          is_active: true,
        })
      ).then((res) => {
        if (!!res.payload.id) {
          navigate('/users');
        }
      });
    }
  };

  return (
    <div className="login create-edit-user">
      <Paper className="login-paper" style={{ maxWidth: '700px' }}>
        <h1>{isEdit ? 'Редактирование' : 'Регистрация'} пользователя</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            value={state?.name}
            color="secondary"
            placeholder="Имя"
            onChange={handleChange}
            required
          />
          <Input
            name="surname"
            value={state?.surname}
            color="secondary"
            placeholder="Фамилия"
            onChange={handleChange}
            required
          />
          {isEdit && (
            <div className="pagination-field-wrapper">
              <span className="pagination-field-title">Планап ID:</span>
              <Input
                name="planup_id"
                value={state?.planup_id}
                color="secondary"
                placeholder="Планап ID"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <Input
              style={{ flexGrow: '1' }}
              name="login"
              value={state?.login}
              color="secondary"
              placeholder="Логин"
              onChange={handleChange}
              required
            />
            <Input
              style={{ flexGrow: '1' }}
              type="password"
              name="password"
              value={state?.password}
              color="secondary"
              placeholder="Пароль"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div className="pagination-field-wrapper">
              <span className="pagination-field-title">Доступный баланс:</span>
              <Input
                style={{ flexGrow: '1' }}
                type="number"
                name="balance"
                value={state?.balance}
                color="secondary"
                placeholder="Доступный баланс"
                onChange={handleChange}
                required
              />
            </div>
            <div className="pagination-field-wrapper">
              <span className="pagination-field-title">Затраты:</span>
              <Input
                style={{ flexGrow: '1' }}
                type="number"
                name="avail_balance"
                value={state?.avail_balance}
                color="secondary"
                placeholder="Затраты"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div className="pagination-field-wrapper">
              <span className="pagination-field-title">Пополнения:</span>
              <Input
                style={{ flexGrow: '1' }}
                type="number"
                name="refill"
                value={state?.refill}
                color="secondary"
                placeholder="Пополнения"
                onChange={handleChange}
                required
              />
            </div>
            <div className="pagination-field-wrapper">
              <span className="pagination-field-title">Списания:</span>
              <Input
                style={{ flexGrow: '1' }}
                type="number"
                name="write_off"
                value={state?.write_off}
                color="secondary"
                placeholder="Списания"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Select
            name="role"
            value={state?.role}
            color="secondary"
            onChange={handleChange}
            required
          >
            {ROLES.map((role) => (
              <option value={role.en} key={role.en}>
                {role.ru}
              </option>
            ))}
          </Select>
          {isEdit && (
            <Select
              name="is_active"
              value={state?.is_active}
              color="secondary"
              onChange={handleChange}
              required
            >
              <option value="true">активный</option>
              <option value="false">заблокирован</option>
            </Select>
          )}
          <CustomButton
            type="submit"
            color="secondary"
            rounded
            loading={createUserLoading || (isEdit && getUserLoading)}
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </CustomButton>
        </form>
      </Paper>
    </div>
  );
};

export default CreateEditUser;
