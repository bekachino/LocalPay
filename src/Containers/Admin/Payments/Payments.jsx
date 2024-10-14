import React, { useEffect, useState } from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../features/admin/adminThunk";
import { formatDate } from "../../../utils";
import Select from "../../../Components/UI/Select/Select";
import Input from "../../../Components/UI/Input/Input";
import './payments.css';
import CustomButton from "../../../Components/UI/CustomButton/CustomButton";

const Payments = () => {
  const dispatch = useDispatch();
  const {
    payments,
    paymentsLoading,
    paymentsPagesAmount
  } = useSelector((state) => state.adminState);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    page_size: 20,
  });
  const [searchWord, setSearchWord] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  
  useEffect(() => {
    dispatch(getPayments({
      ...paginationData,
      searchWord,
      ...dateFilter,
    }));
  }, [
    // do not add searchWord, dateFilter as deps
    dispatch,
    paginationData,
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
  
  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };
  
  const handleDateFitlerChange = e => {
    const {
      name,
      value
    } = e.target;
    
    setDateFilter(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ))
  };
  
  const searchWithFilters = () => {
    dispatch(getPayments({
      ...paginationData,
      searchWord,
      ...dateFilter,
    }));
  };
  
  console.log(dateFilter);
  
  return (
    <div className='payments'>
      <Paper className='home-paper'>
        <h1>{paymentsLoading ? 'Загрузка...' : 'Платежи'}</h1>
        <div className='user-filters'>
          <div className='user-filters-inner'>
            <Input
              size='small'
              placeholder='поиск...'
              color='success'
              onChange={handleSearchWordChange}
            />
            <Input
              type='date'
              name='date_from'
              value={dateFilter?.date_from}
              color='success'
              size='small'
              onChange={handleDateFitlerChange}
            />
            <Input
              type='date'
              name='date_to'
              value={dateFilter?.date_to}
              color='success'
              size='small'
              onChange={handleDateFitlerChange}
            />
          </div>
          <CustomButton
            color='success'
            size='small'
            rounded
            onClick={searchWithFilters}
          >Искать...</CustomButton>
        </div>
        <div className='users-list-container'>
          <table className='users-list'>
            <thead>
            <tr>
              <th>ЛС абонента</th>
              <th>СИ</th>
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
                <td>{payment.user_name || '-'}</td>
                <td>{!!payment.date_payment ? formatDate(payment.accept_payment) : '-'}</td>
                <td>{!!payment.accept_payment ? formatDate(payment.accept_payment) : '-'}</td>
                <td style={{ textAlign: 'center' }}>
                  {payment.money || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td style={{ textAlign: 'center' }}>{payment.status_payment || '-'}</td>
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