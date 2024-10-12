import React, { useEffect, useState } from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../features/admin/adminThunk";
import { formatDate } from "../../../utils";
import Select from "../../../Components/UI/Select/Select";
import './payments.css';

const Payments = () => {
  const dispatch = useDispatch();
  const {
    payments,
    paymentsLoading,
    paymentsPagesAmount
  } = useSelector((state) => state.adminState);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    page_size: 5,
  });
  
  useEffect(() => {
    dispatch(getPayments(paginationData));
  }, [
    dispatch,
    paginationData
  ]);
  
  const onPaginationDataChange = e => {
    const {
      name,
      value
    } = e.target;
    setPaginationData(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };
  
  return (
    <div className='payments'>
      <Paper className='home-paper'>
        <h1>{paymentsLoading ? 'Загрузка...' : 'Платежи'}</h1>
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
              <tr key={payment.number_payment || i}>
                <td>{payment.ls_abon || '-'}</td>
                <td>{!!payment.date_payment ? formatDate(payment.accept_payment) : '-'}</td>
                <td>{!!payment.accept_payment ? formatDate(payment.accept_payment) : '-'}</td>
                <td>
                  {payment.money || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td>{payment.status_payment || '-'}</td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className='pagination-container'>
            <div className='pagination-field-wrapper'>
              <span className='pagination-field-title'>Платежей на страницу:</span>
              <Select
                size='small'
                color='success'
                name='page_size'
                value={paginationData.page_size}
                onChange={onPaginationDataChange}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </Select>
            </div>
            <div className='pagination-field-wrapper'>
              <span className='pagination-field-title'>Страница:</span>
              <Select
                size='small'
                color='success'
                name='page'
                value={paginationData.page}
                onChange={onPaginationDataChange}
              >
                {Array.from({ length: paymentsPagesAmount || 0 }, (_, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                  >
                    {index + 1}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Payments;