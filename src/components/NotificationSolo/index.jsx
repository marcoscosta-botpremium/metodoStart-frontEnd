import React, { useState, useEffect } from 'react';
import { Card, CardContent, Avatar } from '@mui/material';
import { faker } from '@faker-js/faker/locale/pt_BR';
import PersonIcon from '@mui/icons-material/Person';
import './index.css';

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const NotificationSolo = () => {
  const [notification, setNotification] = useState({
    name: `${faker.name.firstName()} ${faker.name.lastName()[0]}.`,
    type: Math.random() < 0.2 ? 'Loss' : 'Gain',
    value: getRandomValue(1, 100),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const notificationType = Math.random() < 0.2 ? 'loss' : 'gain';
      addNotification(notificationType);
    }, getRandomValue(10000, 60000)); // Interval between 10 seconds and 1 minute

    return () => clearInterval(interval);
  }, []); // Empty dependency array runs the effect only once on mount

  const addNotification = (type) => {
    const types = {
      loss: 'Loss',
      gain: 'Gain',
    };

    const notificationType = types[type];
    const value = getRandomValue(type === 'loss' ? 1 : 15, type === 'loss' ? 20 : 200);

    setNotification({
      name: `${faker.name.firstName()} ${faker.name.lastName()[0]}.`,
      type: notificationType,
      value,
    });
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }} className="notification-solo-container">
      <div style={{ marginTop: -37 }}>
        <Card style={{ width: '100%' }}>
          <CardContent style={{ padding: 7 }}>
            <div className="notification-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 37,
                  height: 37,
                  backgroundColor: notification.type === 'Loss' ? '#FF3D71' : '#1AE363',
                }}
              >
                <PersonIcon />
              </Avatar>
              <div style={{ width: '100%', paddingLeft: 14 }} className="notification-content">
                <div style={{ width: '100%', textAlign: 'start' }} className={`notification-title ${notification.type}`}>
                  {notification.name}
                </div>
                <div
                  style={{
                    width: '100%',
                    textAlign: 'start',
                    color: notification.type === 'Loss' ? '#FF3D71' : '#1AE363',
                  }}
                  className={`notification-description ${notification.type}`}
                >
                  {notification.type === 'Loss' ? '-' : '+'} ${notification.value.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationSolo;
