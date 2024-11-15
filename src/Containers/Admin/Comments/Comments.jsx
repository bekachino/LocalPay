import React, { useEffect, useRef, useState } from 'react';
import Paper from '../../../Components/UI/Paper/Paper';
import { getComments, getUsers } from '../../../features/admin/adminThunk';
import Input from '../../../Components/UI/Input/Input';
import CustomButton from '../../../Components/UI/CustomButton/CustomButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearPayments } from '../../../features/admin/adminSlice';
import '../Payments/payments.css';

const Comments = () => {
  const usersListRef = useRef();
  const dispatch = useAppDispatch();
  const {
    comments,
    commentsLoading,
    commentsPagesAmount,
  } = useAppSelector((state) => state.adminState);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    page_size: 600,
  });
  const [searchWord, setSearchWord] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [chosenComments, setChosenComments] = useState([]);
  const [filtersChanged, setFiltersChanged] = useState(false);
  
  useEffect(() => {
    dispatch(getUsers({
      page: 1,
      page_size: 99999,
    }));
    return () => dispatch(clearPayments());
  }, [dispatch]);
  
  useEffect(() => {
    if (!commentsPagesAmount || paginationData.page <= commentsPagesAmount) {
      dispatch(getComments({
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
    
    dispatch(getComments({
      ...paginationData,
      page: paginationData.page + 1,
      searchWord, ...dateFilter,
    }));
  };
  
  const searchWithFilters = async () => {
    dispatch(getComments({
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
  
  const onChooseComment = (e, id) => {
    const { checked } = e.target;
    
    if (id === 'all') {
      if (chosenComments?.length === comments?.length) setChosenComments(() => []); else setChosenComments(() => [
        ...comments?.map((payment) => payment?.number_payment),
      ]);
      return;
    }
    
    if (checked) {
      if (chosenComments.includes(id)) return;
      setChosenComments([
        ...chosenComments,
        id,
      ]);
    } else {
      const filteredList = [...chosenComments].filter((payment) => payment !== id);
      setChosenComments(filteredList);
    }
  };
  
  return (
    <div className='payments comments'>
      <Paper className='home-paper'>
        <h1>{commentsLoading ? 'Загрузка...' : 'Операции платежей'}</h1>
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
            loading={commentsLoading}
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
                  checked={chosenComments?.length === comments?.length}
                  onChange={(e) => onChooseComment(e, 'all')}
                />
              </th>
              <th>СИ</th>
              <th>Комментарий</th>
              <th>Тип платежа</th>
              <th>До пололнения</th>
              <th>Пополненная сумма</th>
              <th>Баланс</th>
              <th>До списания</th>
              <th>Списание</th>
              <th>Сумма оплат</th>
              <th>Дата платежа</th>
            </tr>
            </thead>
            <tbody>
            {comments?.map((payment, i) => (
              <tr key={i}>
                <th>
                  <input
                    type='checkbox'
                    onChange={(e) => onChooseComment(e, payment?.number_payment)}
                    checked={chosenComments.includes(payment?.number_payment)}
                  />
                </th>
                <td style={{ minWidth: '150px' }}>{payment.user2 || '-'}</td>
                <td style={{ minWidth: '150px' }}>{payment.text || '-'}</td>
                <td style={{ minWidth: '120px' }}>{payment.type_pay || '-'}</td>
                <td>{payment.old_balance || 0}<span className='currence-highlight'>с</span>
                </td>
                <td>{payment.new_balance || 0}<span className='currence-highlight'>с</span>
                </td>
                <td>{payment.mont_balance || 0}<span className='currence-highlight'>с</span>
                </td>
                <td>{payment.old_avail_balance || 0}<span className='currence-highlight'>с</span>
                </td>
                <td>{payment.new_avail_balance || 0}<span className='currence-highlight'>с</span>
                </td>
                <td>{payment.mont_avail_balance || 0}<span className='currence-highlight'>с</span>
                </td>
                <td style={{ minWidth: '130px' }}>{payment.created_at || '-'}</td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className='pagination-container'>
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
                loading={commentsLoading}
              >
                {!commentsPagesAmount || paginationData.page < commentsPagesAmount ? 'Показать ещё...' : 'Больше данных нет'}
              </CustomButton>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Comments;
