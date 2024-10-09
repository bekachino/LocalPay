import React, { useEffect } from 'react';
import Paper from "../../../Components/Paper/Paper";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../features/admin/adminThunk";
import './users.css';

const Users = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className='users'>
      <Paper className='home-paper'>
        <h1>Пользователи</h1>
      </Paper>
    </div>
  );
};

export default Users;