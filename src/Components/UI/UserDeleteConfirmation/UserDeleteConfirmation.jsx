import React from 'react';
import './userDeleteConfirmation.css';
import Paper from "../Paper/Paper";
import CustomButton from "../CustomButton/CustomButton";

const UserDeleteConfirmation = ({userId, toggleModal, onDeleteUser}) => {
  return (
    <div className='user-delete-confirmation-modal'>
      <Paper>
        <h2>Удалить пользователя?</h2>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
          <CustomButton color='warning' style={{flexGrow: 1}} onClick={toggleModal}>Отмена</CustomButton>
          <CustomButton color='error' style={{flexGrow: 1}} onClick={() => onDeleteUser(userId)}>Удалить</CustomButton>
        </div>
      </Paper>
    </div>
  );
};

export default UserDeleteConfirmation;