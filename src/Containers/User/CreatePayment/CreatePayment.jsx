import React, { useState } from 'react';
import Paper from '../../../Components/UI/Paper/Paper';
import './createPayment.css';
import { useAppSelector } from '../../../app/hooks';
import Input from '../../../Components/UI/Input/Input';
import CustomButton from '../../../Components/UI/CustomButton/CustomButton';
import { createUser } from '../../../features/admin/adminThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPayment } from '../../../features/user/userThunk';
import { jwtDecode } from 'jwt-decode';

const CreatePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.userState);
  const { createPaymentLoading } = useAppSelector((state) => state.dataState);
  const [state, setState] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPayment({
        ...state,
        user_login: jwtDecode(user?.access || '')?.login || '',
      })
    ).then((res) => {
      console.log(res.payload);
      if (!!res.payload.id) {
        navigate('/home');
      }
    });
  };

  return (
    <div className="create-payment">
      <Paper className="home-paper">
        <h1>Оплатить</h1>
        <form onSubmit={handleSubmit}>
          <Input
            style={{ flexGrow: '1' }}
            name="ls"
            value={state?.ls}
            color="success"
            placeholder="ЛС абонента"
            onChange={handleChange}
            required
          />
          <Input
            style={{ flexGrow: '1' }}
            type="number"
            name="payment_amount"
            value={state?.payment_amount}
            color="success"
            placeholder="Сумма"
            onChange={handleChange}
            required
          />
          <CustomButton
            type="submit"
            color="success"
            rounded
            loading={createPaymentLoading}
            size="small"
          >
            Оплатить
          </CustomButton>
        </form>
      </Paper>
    </div>
  );
};

export default CreatePayment;
