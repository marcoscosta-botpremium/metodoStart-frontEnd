import { CircularProgress } from '@mui/material';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { oauthLogin } from '../services/app';

const useComponentWillMount = (cb) => {
  const willMount = useRef(true);

  if (willMount.current) cb();

  willMount.current = false;
};

const LoginBinary = () => {
  const navigate = useNavigate();
  useComponentWillMount(() => oauthLogin(() => navigate('/home')));

  return (
    <div
      style={{
        background: '#010101',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div>
        <p style={{ color: 'white', fontWeight: 'bold' }}>
          Aguarde! Estamos conectando os servidores a sua conta.
        </p>
        <CircularProgress sx={{ marginTop: 3 }} color="secondary" />
      </div>
    </div>
  );
};

export default LoginBinary;
