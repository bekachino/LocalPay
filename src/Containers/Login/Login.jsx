import React from 'react';
import Paper from "../../Components/Paper/Paper";
import './login.css';
import Input from "../../Components/Input/Input";
import CustomButton from "../../Components/CustomButton/CustomButton";

const Login = () => {
  return (
    <div className='login'>
      <Paper className='login-paper'>
        <h1>Вход в систему</h1>
        <form>
          <Input
            name='login'
            color='secondary'
            size='large'
            placeholder='Логин...'
          />
          <Input
            type='password'
            name='password'
            color='secondary'
            size='large'
            placeholder='Пароль...'
          />
          <CustomButton
            type='submit'
            color='secondary'
            rounded
          >Войти</CustomButton>
        </form>
      </Paper>
    </div>
  );
};

export default Login;