import React, { useEffect, useState } from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getPayments, getPaymentsForUpload
} from "../../../features/admin/adminThunk";
import {
  formatDate, handleExcelFileExport, handleNewVersionExcelFileExport
} from "../../../utils";
import Select from "../../../Components/UI/Select/Select";
import Input from "../../../Components/UI/Input/Input";
import CustomButton from "../../../Components/UI/CustomButton/CustomButton";
import './payments.css';
import { addAlert } from "../../../features/data/dataSlice";
import { ERROR_MESSAGES } from "../../../constants";

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
  const [chosenPayments, setChosenPayments] = useState([]);
  const [listAction, setListAction] = useState('');
  
  useEffect(() => {
    dispatch(getPayments({
      ...paginationData,
      searchWord, ...dateFilter,
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
  
  const handleDateFilterChange = e => {
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
      searchWord, ...dateFilter,
    }));
  };
  
  const onChoosePayment = (e, id) => {
    const { checked } = e.target;
    
    if (id === 'all') {
      if (chosenPayments?.length === payments?.length) setChosenPayments(() => []); else setChosenPayments(() => [...payments?.map(payment => payment?.number_payment)]);
      return;
    }
    
    if (checked) {
      if (chosenPayments.includes(id)) return;
      setChosenPayments([
        ...chosenPayments,
        id,
      ]);
    } else {
      const filteredList = [...chosenPayments].filter(payment => payment !== id);
      setChosenPayments(filteredList);
    }
  };
  
  const onListActionChange = e => {
    const { value } = e.target;
    setListAction(value || '');
  };
  
  const onActionExecute = () => {
    if (listAction === 'uploadChosenOptions' && chosenPayments.length) handleExcelFileExport(payments, chosenPayments);
    
    if (listAction === 'newVersionUpload' && !!dateFilter?.date_from && !!dateFilter?.date_to) {
      const user_ids = new Set(payments?.map(payment => payment?.user_id) || []);
      
      dispatch(getPaymentsForUpload({
        ...dateFilter,
        user_ids: Array.from(user_ids),
      }))
      .then(res => {
        console.log(res);
        if (res?.error) {
          dispatch(addAlert({
            type: 'warning',
            message: 'Данные отсуствуют'
          }));
          return;
        }
        handleNewVersionExcelFileExport(res?.payload?.results);
      });
    }
  };
  
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
              onChange={handleDateFilterChange}
            />
            <Input
              type='date'
              name='date_to'
              value={dateFilter?.date_to}
              color='success'
              size='small'
              onChange={handleDateFilterChange}
            />
          </div>
          <CustomButton
            color='success'
            size='small'
            rounded
            onClick={searchWithFilters}
            loading={paymentsLoading}
          >Искать...</CustomButton>
        </div>
        <div className='users-list-container'>
          <table className='users-list'>
            <thead>
            <tr>
              <th>
                <input
                  type='checkbox'
                  checked={chosenPayments?.length === payments?.length}
                  onChange={e => onChoosePayment(e, 'all')}
                />
              </th>
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
                <th>
                  <input
                    type='checkbox'
                    onChange={e => onChoosePayment(e, payment?.number_payment)}
                    checked={chosenPayments.includes(payment?.number_payment)}
                  />
                </th>
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
            <div className='list-actions'>
              <div
                className='pagination-field-wrapper'
                style={{ marginLeft: 'auto' }}
              >
                <span className='pagination-field-title'>Выберите действие:</span>
                <Select
                  color='success'
                  size='small'
                  onChange={onListActionChange}
                >
                  <option value=''>-</option>
                  <option value='uploadChosenOptions'>
                    Выгрузить платежи (старая версия)
                  </option>
                  <option value='newVersionUpload'>
                    Выгрузить платежи
                  </option>
                </Select>
              </div>
              <CustomButton
                color='success'
                size='small'
                style={{ marginTop: 'auto' }}
                rounded
                onClick={onActionExecute}
              >Выполнить</CustomButton>
            </div>
            <div
              className='pagination-field-wrapper'
              style={{ marginLeft: 'auto' }}
            >
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