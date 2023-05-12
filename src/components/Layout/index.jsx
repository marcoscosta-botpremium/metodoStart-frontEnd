import { Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import { Img, SubTitle } from '../../styles/global';
import { variants } from '../../utils/motionConfig';
import Menu from './Menu/index';
import Side from './Side/index';
import { Container, Content, Flex, Items, Left, Rigth } from './styles';

const Layout = ({ title, noMenu, children }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content variants={variants.opacity} animate="visible" initial="hidden">
        <Left>
          <Flex>
            <Stack
              direction="row"
              sx={{ width: { xs: '100%', md: 'unset' } }}
              justifyContent="space-between"
            >
              <Img
                className="imgLogo"
                src={imgLogo}
                alt="Logo"
                variants={variants.itemOpacity}
                onClick={() => navigate('/home')}
              />

              <Side sx={{ display: { xs: 'block', md: 'none' } }} />
            </Stack>
            {noMenu || <Menu title={title} />}
          </Flex>

          {noMenu || (
            <>
              <SubTitle>{title}</SubTitle>
              <Items>{children}</Items>
            </>
          )}

          {noMenu && children}
        </Left>

        <Rigth>
          <Side sx={{ display: { xs: 'none', md: 'block' } }} />
        </Rigth>
      </Content>
    </Container>
  );
};

export default Layout;
