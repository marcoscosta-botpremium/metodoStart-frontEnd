import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import { Img } from '../../styles/global';
import ForgotPassword from './ForgotPassword/index';
import Login from './Login/index';
import RecoverPassword from './RecoverPassword/index';
import { Container, Content, Left, Right } from './styles';

const useQuery = () => new URLSearchParams(useLocation().search);

const Auth = () => {
  const query = useQuery();
  const [activeContent, setActiveContent] = useState(0);

  const code = query.get('code');

  return (
    <>
      <Container>
        <Content>
          <Left>
            <Img src={imgLogo} alt="logo" />

            {activeContent === 0 && !code && (
              <Login setActiveContent={setActiveContent} />
            )}

            {activeContent === 1 && !code && (
              <ForgotPassword setActiveContent={setActiveContent} />
            )}

            {code && <RecoverPassword code={code} />}
          </Left>
        </Content>
      </Container>
    </>
  );
};

export default Auth;
