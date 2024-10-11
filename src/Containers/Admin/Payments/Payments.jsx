import React, { useEffect } from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../features/admin/adminThunk";
import { formatDate } from "../../../utils";
import './payments.css';

const Payments = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.adminState);
  
  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);
  
  return (
    <div className='payments'>
      <Paper className='home-paper'>
        <h1>Платежи</h1>
        <div className='users-list-container'>
          <table className='users-list'>
            <thead>
            <tr>
              <th>ЛС абонента</th>
              <th>Дата оплаты</th>
              <th>Дата принятия оплаты</th>
              <th>Баланс</th>
              <th>Статус оплаты</th>
            </tr>
            </thead>
            <tbody>
            {payments?.map((payment, i) => (
              <tr key={payment.ls_abon || i}>
                <td>{!!payment.accept_payment ? formatDate(payment.accept_payment) : '-'}</td>
                <td>{!!payment.date_payment ? formatDate(payment.accept_payment) : '-'}</td>
                <td>{payment.ls_abon || '-'}</td>
                <td>
                  {payment.money || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td>{payment.status_payment || '-'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};

export default Payments;