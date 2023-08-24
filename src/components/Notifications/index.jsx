import React, { useState, useEffect } from 'react';
import { Card, CardContent, Stack, Avatar } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.css'; // Import your CSS for animations
import PersonIcon from '@mui/icons-material/Person';
import { faker } from '@faker-js/faker/locale/pt_BR';

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const NotificationList = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, name: `${faker.person.firstName()} ${faker.person.lastName()[0]}.`, type: Math.random() < 0.2 ? 'Loss' : 'Gain', value: getRandomValue(1, 100) },
    { id: 2, name: `${faker.person.firstName()} ${faker.person.lastName()[0]}.`, type: Math.random() < 0.2 ? 'Loss' : 'Gain', value: getRandomValue(1, 100) },
    { id: 3, name: `${faker.person.firstName()} ${faker.person.lastName()[0]}.`, type: Math.random() < 0.2 ? 'Loss' : 'Gain', value: getRandomValue(1, 100) },
  ]);

  const addNotification = (type) => {
    const types = {
      loss: 'Loss',
      gain: 'Gain',
    };

    const notificationType = types[type];
    const value = getRandomValue(type === 'loss' ? 1 : 70, type === 'loss' ? 50 : 200);

    const newNotification = {
      id: Date.now(),
      name: `${faker.person.firstName()} ${faker.person.lastName()[0]}.`,
      type: notificationType,
      value,
    };

    setNotifications([newNotification, ...notifications.slice(0, 2)]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const notificationType = Math.random() < 0.2 ? 'loss' : 'gain';
      addNotification(notificationType);
    }, getRandomValue(5000, 10000)); // Interval between 10 seconds and 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ marginTop: 21, marginBottom: 7, width: '100%', textAlign: 'start' }}>Notificações</h2>
      <Stack style={{
        width: '100%',
      }} spacing={2}>
        <TransitionGroup>
          {notifications.map((notification, index) => (
            <CSSTransition
              key={notification.id}
              timeout={500}
              classNames="notification"
              style={{
                marginBottom: 7,
                background: '#010101',
                opacity: (notifications.length - index) / notifications.length,
                transformOrigin: 'top',
              }}>
              <Card style={{ width: '100%' }}>
                <CardContent
                  style={{
                    padding: 7,
                  }}>
                  <div className="notification-item" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Avatar
                      sx={{
                        width: 37,
                        height: 37,
                        backgroundColor: notification.type === 'Loss' ? '#FF3531' : '#02BF44',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <div style={{ width: '100%', paddingLeft: 14 }} className="notification-content">
                      <div style={{ width: '100%', textAlign: 'start' }} className={`notification-title ${notification.type}`}>
                        {notification?.name}
                      </div>
                      <div style={{
                        width: '100%',
                        textAlign: 'start',
                        color: notification.type === 'Loss' ? '#FF3531' : '#02BF44'
                      }} className={`notification-description ${notification.type}`}>
                        {notification.type === 'Loss' ? '-' : '+'} ${notification.value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Stack>
    </div >
  );
};

export default NotificationList;
