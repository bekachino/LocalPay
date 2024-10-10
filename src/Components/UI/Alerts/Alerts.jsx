import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from "../../../app/hooks";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../../features/data/dataSlice";
import './alerts.css';

const Alerts = () => {
  const dispatch = useDispatch();
  const alerts = useAppSelector(state => state.dataState.alerts);
  const alertsRef = useRef(null);
  const [prevAmount, setPrevAmount] = useState(0);
  
  useEffect(() => {
    if (prevAmount < alerts.length) {
      if (alertsRef.current) {
        alertsRef.current.scrollTo({
          top: alertsRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
    setPrevAmount(alerts.length);
    
    const lastAlert = alerts[alerts.length - 1];
    if (lastAlert) {
      setTimeout(() => dispatch(removeAlert(lastAlert.id)), 8000);
    }
  }, [alerts, alerts.length, dispatch, prevAmount]);
  
  return (
    <div
      className='alerts'
      ref={alertsRef}
    >
      {alerts.map(alert => (
        <div
          className={`alert ${alert.show ? '' : 'alert-hidden'}`}
          key={alert.id}
        >
          <div className={`alert-inner alert-${alert.type}`} onClick={() => dispatch(removeAlert(alert.id))}>{alert.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;