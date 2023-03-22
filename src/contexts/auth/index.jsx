import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as api from '../../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async (navigate) => {
    try {
      const response = await api.getUser();

      if (response.success) {
        setUser(response);
        localStorage.setItem('userInfo', JSON.stringify(response?.user));
        localStorage.setItem('getUser', JSON.stringify(response));

        navigate('/home');
      } else {
        toast.error('Usuário não encontrado', {
          position: 'top right',
          autoHide: true,
          className: 'warn web-status',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user, navigate) => {
    try {
      const response = await api.login(user);

      if (response.success) {
        localStorage.setItem('accessToken', response.token);
        getUser(navigate);
      } else {
        toast.error(response.message, {
          position: 'top right',
          autoHide: true,
          className: 'warn web-status',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = async (user) => {
    try {
      const response = await api.forgot(user);

      if (response.success) {
        toast.success('E-mail enviado com sucesso.', {
          position: 'top right',
          autoHide: true,
          className: 'warn web-status',
        });
      } else {
        toast.error(response.message, {
          position: 'top right',
          autoHide: true,
          className: 'warn web-status',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const recoverPassword = async (data, code, navigate) => {
    try {
      const response = await api.recover({ ...data, code: code });

      if (response.success) {
        toast.success('Senha alterada com sucesso.', {
          position: 'top right',
          autoHide: true,
          className: 'warn web-status',
        });

        navigate('/login');
      } else {
        toast.error(response.message.code[0], {
          position: 'top right',
          autoHide: true,
          className: 'warn web-status',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        forgotPassword,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth, AuthContext };
