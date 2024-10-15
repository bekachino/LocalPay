import React, { useEffect, useState } from 'react';
import Paper from "../../../Components/UI/Paper/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../features/admin/adminThunk";
import { formatDate } from "../../../utils";
import Select from "../../../Components/UI/Select/Select";
import Input from "../../../Components/UI/Input/Input";
import CustomButton from "../../../Components/UI/CustomButton/CustomButton";
import * as XLSX from 'xlsx';
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
  
  const handleExcelFileExport = (data) => {
    const workbook = XLSX.utils.book_new();
    
    const worksheet = XLSX.utils.json_to_sheet([]);
    
    let rowIndex = 1;
    
    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        'Номер платежа',
        'Время проведения платежа',
        'Лицевой счет',
        'Деньги',
        'Статус платежа',
        'Сервис инженер',
      ]
    ], { origin: `A1` });
    
    data.forEach((payment) => {
      if (!chosenPayments.includes(payment.number_payment)) return;
      
      rowIndex += 1;
      
      XLSX.utils.sheet_add_aoa(worksheet, [
        [
          payment.number_payment || '-',
          payment.date_payment || '-',
          payment.ls_abon || '-',
          payment.money || 0,
          payment.status_payment || '-',
          payment.user_name || '-',
        ]
      ], { origin: `A${rowIndex}` });
    });
    
    worksheet['!cols'] = [
      { wch: 25 },
      { wch: 25 },
      { wch: 17 },
      { wch: 14 },
      { wch: 20 },
      { wch: 25 },
    ];
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Платежи');
    
    XLSX.writeFile(workbook, 'Платежи.xlsx');
  };
  
  const onActionExecute = () => {
    if (listAction === 'uploadChosenOptions' && chosenPayments.length) handleExcelFileExport(payments);
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
                    Выгрузить выбранные
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