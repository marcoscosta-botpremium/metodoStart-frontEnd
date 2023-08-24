import React, { useState, useEffect } from 'react';
import { Card, CardContent, Avatar } from '@mui/material';
import { faker } from '@faker-js/faker/locale/pt_BR';
import PersonIcon from '@mui/icons-material/Person';
import { CSSTransition } from 'react-transition-group';
import './index.css';

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const NotificationSolo = () => {
  const [notification, setNotification] = useState(null);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const notificationType = Math.random() < 0.2 ? 'loss' : 'gain';
      addNotification(notificationType);
    }, getRandomValue(5000, 10000)); // Interval between 10 seconds and 1 minute

    return () => clearInterval(interval);
  }, []); // Empty dependency array runs the effect only once on mount

  const addNotification = (type) => {
    const types = {
      loss: 'Loss',
      gain: 'Gain',
    };

    const notificationType = types[type];
    const value = getRandomValue(type === 'loss' ? 1 : 70, type === 'loss' ? 50 : 200);
    setTimeout(() => {
      setNotification({
        name: `${faker.person.firstName()} ${faker.person.lastName()[0]}.`,
        type: notificationType,
        value,
      });
      setHide(false)
    }, 300);

    setTimeout(() => {
      setHide(true)
    }, 3000); // Clear the notification after 3 seconds
  };

  return (
    <div style={{ width: '100%', display: 'flex', height: 15, justifyContent: 'flex-end' }} className="notification-solo-container">
      <CSSTransition in={!hide} timeout={300} classNames="notification-fade" unmountOnExit>
        <div style={{ marginTop: -37 }}>
          <Card style={{ width: '100%', backgroundColor: 'rgb(13, 14, 13)' }}>
            <CardContent style={{ padding: 7 }}>
              <div className="notification-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 37,
                    height: 37,
                    backgroundColor: notification?.type === 'Loss' ? '#FF3D71' : '#1AE363',
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <div style={{ width: '100%', paddingLeft: 14 }} className="notification-content">
                  <div style={{ width: '100%', textAlign: 'start' }} className={`notification-title ${notification?.type}`}>
                    {notification?.name}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'start',
                      color: notification?.type === 'Loss' ? '#FF3D71' : '#1AE363',
                    }}
                    className={`notification-description ${notification?.type}`}
                  >
                    {notification?.type === 'Loss' ? '-' : '+'} ${notification?.value?.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CSSTransition>
    </div>
  );
};

export default NotificationSolo;
