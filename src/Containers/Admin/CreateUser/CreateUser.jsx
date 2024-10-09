import React, { useState } from 'react';
import Paper from "../../../Components/Paper/Paper";
import Input from "../../../Components/Input/Input";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { ROLES } from "../../../constants";
import Select from "../../../Components/Select/Select";
import './createUser.css';
import { createUser } from "../../../features/admin/adminThunk";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createUserLoading } = useAppSelector(state => state.adminState);
  const [state, setState] = useState({ role: 'user' });
  
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setState(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createUser({
      ...state,
      is_active: true,
    })).then(_ => navigate('/home'));
  };
  
  return (
    <div className='login'>
      <Paper className='login-paper'>
        <h1>Регистрация пользователя</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name='name'
            value={state?.name}
            color='secondary'
            placeholder='Имя'
            onChange={handleChange}
            required
          />
          <Input
            name='surname'
            value={state?.surname}
            color='secondary'
            placeholder='Фамилия'
            onChange={handleChange}
            required
          />
          <Input
            type='email'
            name='email'
            value={state?.email}
            color='secondary'
            placeholder='email'
            onChange={handleChange}
            required
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <Input
              style={{ flexGrow: '1' }}
              name='login'
              value={state?.login}
              color='secondary'
              placeholder='Логин'
              onChange={handleChange}
              required
            />
            <Input
              style={{ flexGrow: '1' }}
              type='password'
              name='password'
              value={state?.password}
              color='secondary'
              placeholder='Пароль'
              onChange={handleChange}
              required
            />
          </div>
          <Select
            name='role'
            value={state?.role}
            color='secondary'
            onChange={handleChange}
            required
          >
            {
              ROLES.map(role => (
                <option
                  value={role.en}
                  key={role.en}
                >{role.ru}</option>
              ))
            }
          </Select>
          <CustomButton
            type='submit'
            color='secondary'
            rounded
            loading={createUserLoading}
          >Создать</CustomButton>
        </form>
      </Paper>
    </div>
  );
};

export default CreateUser;