import React, { useEffect, useRef, useState } from 'react';
import Paper from '../../../Components/UI/Paper/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  annulPayment, getPayments, getPaymentsForUpload, getUsers,
} from '../../../features/admin/adminThunk';
import {
  formatDate, handleExcelFileExport, handleNewVersionExcelFileExport,
} from '../../../utils';
import Select from '../../../Components/UI/Select/Select';
import Input from '../../../Components/UI/Input/Input';
import CustomButton from '../../../Components/UI/CustomButton/CustomButton';
import { addAlert } from '../../../features/data/dataSlice';
import './payments.css';
import { useAppSelector } from '../../../app/hooks';
import { jwtDecode } from 'jwt-decode';
import { clearPayments } from '../../../features/admin/adminSlice';

const Payments = () => {
  const usersListRef = useRef();
  const dispatch = useDispatch();
  const {
    payments,
    paymentsLoading,
    paymentsPagesAmount,
    paymentsForUploadLoading,
    users,
    usersLoading,
  } = useSelector((state) => state.adminState);
  const { user } = useAppSelector((state) => state.userState);
  const { role } = jwtDecode(user.access || '');
  const [paginationData, setPaginationData] = useState({
    page: 1,
    page_size: 600,
  });
  const [searchWord, setSearchWord] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [chosenPayments, setChosenPayments] = useState([]);
  const [listAction, setListAction] = useState('');
  const [paymentInAnnulmentProcess, setPaymentInAnnulmentProcess] = useState([]);
  const [filtersChanged, setFiltersChanged] = useState(false);
  
  useEffect(() => {
    dispatch(getUsers({
      page: 1,
      page_size: 99999,
    }));
    return () => dispatch(clearPayments());
  }, [dispatch]);
  
  useEffect(() => {
    if (!paymentsPagesAmount || paginationData.page <= paymentsPagesAmount) {
      dispatch(getPayments({
        ...paginationData,
        searchWord, ...dateFilter,
      }));
    }
  }, [
    // do not add searchWord, dateFilter as deps
    dispatch,
  ]);
  
  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
    setFiltersChanged(true);
  };
  
  const handleDateFilterChange = (e) => {
    const {
      name,
      value,
    } = e.target;
    
    setDateFilter((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
    setFiltersChanged(true);
  };
  
  const onShowMore = async () => {
    setPaginationData((prevState) => (
      {
        ...prevState,
        page: prevState.page + 1,
      }
    ));
    
    dispatch(getPayments({
      ...paginationData,
      page: paginationData.page + 1,
      searchWord, ...dateFilter,
    }));
  };
  
  const searchWithFilters = async () => {
    dispatch(getPayments({
      ...paginationData,
      page: filtersChanged ? 1 : paginationData.page,
      searchWord, ...dateFilter,
      isSearch: true,
    }));
    setPaginationData(prevState => (
      {
        ...prevState,
        page: 1,
      }
    ));
    setFiltersChanged(false);
  };
  
  const onChoosePayment = (e, id) => {
    const { checked } = e.target;
    
    if (id === 'all') {
      if (chosenPayments?.length === payments?.length) setChosenPayments(() => []); else setChosenPayments(() => [
        ...payments?.map((payment) => payment?.number_payment),
      ]);
      return;
    }
    
    if (checked) {
      if (chosenPayments.includes(id)) return;
      setChosenPayments([
        ...chosenPayments,
        id,
      ]);
    } else {
      const filteredList = [...chosenPayments].filter((payment) => payment !== id);
      setChosenPayments(filteredList);
    }
  };
  
  const onListActionChange = (e) => {
    const { value } = e.target;
    setListAction(value || '');
  };
  
  const onActionExecute = () => {
    if (listAction === 'uploadChosenOptions' && chosenPayments.length) handleExcelFileExport(payments, chosenPayments);
    
    if (listAction === 'newVersionUpload' && !!dateFilter?.date_from && !!dateFilter?.date_to) {
      dispatch(getPaymentsForUpload({
        ...dateFilter,
        user_id: !!searchWord ? users?.find((payment) => (
          payment?.name?.toLowerCase() || ''
        ).includes(searchWord?.toLowerCase() || '') || (
          payment?.surname?.toLowerCase() || ''
        ).includes(searchWord?.toLowerCase() || '') || (
          `${payment?.name} ${payment?.surname}`?.toLowerCase() || ''
        ).includes(searchWord?.toLowerCase() || ''))?.id : null,
      })).then((res) => {
        if (res?.error) {
          dispatch(addAlert({
            type: 'warning',
            message: 'Данные отсуствуют',
          }));
          return;
        }
        handleNewVersionExcelFileExport(res?.payload?.results);
      });
    }
  };
  
  const onPaymentAnnulment = async (id) => {
    if (id) {
      setPaymentInAnnulmentProcess((prevState) => [
        ...prevState,
        id,
      ]);
      await dispatch(annulPayment(id));
      setPaymentInAnnulmentProcess((prevState) => [
        ...prevState.filter((prevId) => prevId !== id),
      ]);
      dispatch(getPayments({
        ...paginationData,
        searchWord, ...dateFilter,
      }));
    }
  };
  
  return (
    <div className='payments'>
      <Paper className='home-paper'>
        <h1>{paymentsLoading || usersLoading ? 'Загрузка...' : 'Платежи'}</h1>
        <div className='user-filters'>
          <div
            className='user-filters-inner'
            onKeyDown={e => e.key === 'Enter' && searchWithFilters()}
          >
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
            loading={paymentsLoading || usersLoading}
          >
            Искать...
          </CustomButton>
        </div>
        <div className='users-list-container'>
          <table
            className='users-list'
            ref={usersListRef}
          >
            <thead>
            <tr>
              <th>
                <input
                  type='checkbox'
                  checked={chosenPayments?.length === payments?.length}
                  onChange={(e) => onChoosePayment(e, 'all')}
                />
              </th>
              <th>ЛС абонента</th>
              <th>СИ</th>
              <th>Логин</th>
              <th>Дата оплаты</th>
              <th>Дата принятия оплаты</th>
              <th>Баланс</th>
              <th>Статус оплаты</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {payments?.map((payment, i) => (
              <tr key={i}>
                <th>
                  <input
                    type='checkbox'
                    onChange={(e) => onChoosePayment(e, payment?.number_payment)}
                    checked={chosenPayments.includes(payment?.number_payment)}
                  />
                </th>
                <td>{payment.ls_abon || '-'}</td>
                <td>{payment.user_name || '-'}</td>
                <td>{payment.login || '-'}</td>
                <td>
                  {!!payment.date_payment ? formatDate(payment.accept_payment) : '-'}
                </td>
                <td>
                  {!!payment.accept_payment ? formatDate(payment.accept_payment) : '-'}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {payment.money || 0}
                  <span className='currence-highlight'>с</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {payment.status_payment || '-'}
                </td>
                {['admin'].includes(role) && (
                  <td>
                    <div
                      className='user-action-btns'
                      style={{ position: 'unset' }}
                    >
                      {[
                        'Списание с бухгалтерии',
                        'Пополнение с бухгалтерии',
                      ].includes(payment?.status_payment) || !!payment?.annulment ?
                        <span
                          style={{
                            color: '#ff2626',
                            fontWeight: 'bold',
                          }}
                        >аннулирован</span> :
                        <CustomButton
                          color='success'
                          onClick={(_) => onPaymentAnnulment(payment?.id)}
                          size='small'
                          loading={paymentInAnnulmentProcess.includes(payment?.id)}
                        >
                          аннулировать
                        </CustomButton>}
                    </div>
                  </td>
                )}
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
                <span className='pagination-field-title'>
                  Выберите действие:
                </span>
                <Select
                  color='success'
                  size='small'
                  onChange={onListActionChange}
                >
                  <option value=''>-</option>
                  <option value='uploadChosenOptions'>
                    Выгрузить платежи (старая версия)
                  </option>
                  <option value='newVersionUpload'>Выгрузить платежи</option>
                </Select>
              </div>
              <CustomButton
                color='success'
                size='small'
                style={{ marginTop: 'auto' }}
                rounded
                onClick={onActionExecute}
                loading={paymentsForUploadLoading}
              >
                Выполнить
              </CustomButton>
            </div>
            <div
              className='pagination-field-wrapper'
              style={{ marginLeft: 'auto' }}
            >
              <CustomButton
                color='success'
                size='small'
                style={{ marginTop: 'auto' }}
                rounded
                onClick={onShowMore}
                loading={paymentsLoading || usersLoading}
              >
                {!paymentsPagesAmount || paginationData.page < paymentsPagesAmount ? 'Показать ещё...' : 'Больше данных нет'}
              </CustomButton>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Payments;
