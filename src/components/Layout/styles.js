import { motion } from 'framer-motion';
import styled from 'styled-components';
import { breakPoint, Row, toRem } from '../../styles/global';

export const Container = styled(motion.div)`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;

  background: ${({ theme }) => theme.colors.background};
`;

export const Content = styled(motion.div)`
  display: flex;
  width: 94%;
  height: 92%;

  align-items: center;
  justify-content: space-between;

  border: 1px solid;
  border-right: none;
  border-color: ${({ theme }) => theme.colors.grayLight};

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
    height: 100%;

    border: none;
  }
`;

export const Left = styled(motion.div)`
  width: 84%;
  height: 100%;

  padding: ${toRem(35)} ${toRem(30)};

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
    padding: ${toRem(50)} ${toRem(8)};
  }
`;

export const Rigth = styled(motion.div)`
  width: 18%;
  max-width: 301px;
  height: 100%;

  padding: ${toRem(15)};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  transform: scale(1.01);
  border-radius: ${toRem(20)} 0 0 ${toRem(20)};

  box-shadow: 10px 8px 10px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.colors.backgroundDark};

  @media (max-width: ${breakPoint.mobileLg}) {
    display: none;
  }
`;

export const Flex = styled(Row)`
  align-items: flex-end;
  gap: ${toRem(30)} 0;

  .imgLogo {
    width: ${toRem(175)};

    cursor: pointer;
    margin-left: ${toRem(20)};
    margin-bottom: ${toRem(16)};
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    .imgLogo {
      width: ${toRem(155)};
      margin-left: 0;
      margin-bottom: 0;
    }
  }
`;

export const Items = styled(motion.div)`
  height: 78%;

  margin: auto;
  padding: ${toRem(12)};

  border-radius: ${toRem(10)};
  background: ${({ theme }) => theme.colors.backgroundLight};

  @media (max-width: ${breakPoint.mobileLg}) {
    height: unset;
  }
`;
