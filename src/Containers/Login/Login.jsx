import React, { useState } from 'react';
import Paper from "../../Components/UI/Paper/Paper";
import './login.css';
import Input from "../../Components/UI/Input/Input";
import CustomButton from "../../Components/UI/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/user/userThunk";
import { useAppSelector } from "../../app/hooks";

const Login = () => {
  const dispatch = useDispatch();
  const { signInLoading } = useAppSelector(state => state.userState);
  const [state, setState] = useState();
  
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
    dispatch(signIn(state));
  };
  
  return (
    <div className='login'>
      <Paper className='login-paper'>
        <h1>Вход в систему</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name='login'
            value={state?.login}
            color='secondary'
            size='large'
            placeholder='Логин'
            onChange={handleChange}
            required
          />
          <Input
            type='password'
            name='password'
            value={state?.password}
            color='secondary'
            size='large'
            placeholder='Пароль'
            onChange={handleChange}
            required
          />
          <CustomButton
            type='submit'
            color='secondary'
            rounded
            loading={signInLoading}
          >Войти</CustomButton>
        </form>
      </Paper>
    </div>
  );
};

export default Login;