import { motion } from 'framer-motion';
import styled from 'styled-components';
import background from '../../assets/bitCoin2.jpeg';
import { breakPoint, toRem } from '../../styles/global';

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;

  place-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

export const Content = styled(motion.div)`
  display: flex;
  width: ${toRem(960)};
  height: ${toRem(615)};

  justify-content: flex-start;
  align-items: flex-start;

  box-shadow: rgba(0, 0, 0, 0.3) 0px 25px 50px -12px;
  border-radius: 12px;

  background: ${({ theme }) => theme.colors.backgroundDark};

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
  }
`;

export const Left = styled.div`
  display: flex;

  width: 60%;
  height: 100%;

  flex-direction: column;
  padding: ${toRem(16)} ${toRem(35)};

  border-radius: 12px 0 0 12px;

  img {
    width: ${toRem(230)};
    height: ${toRem(120)};
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
  }
`;

export const Right = styled.div`
  width: 40%;
  height: 100%;

  border-radius: 0 12px 12px 0;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: ${breakPoint.mobileLg}) {
    display: none;
  }
`;
