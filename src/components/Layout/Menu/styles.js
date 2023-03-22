import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { breakPoint, SubTitle, toRem } from '../../../styles/global';

export const Container = styled(motion.div)`
  display: flex;
  width: 70%;
  height: 100%;

  margin-left: ${toRem(30)};
  justify-content: space-around;

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
    margin-left: 0;
    margin-bottom: ${toRem(30)};

    justify-content: space-between;
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  width: ${toRem(160)};
  height: ${toRem(100)};

  align-items: center;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;
  border-radius: 8px;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 8px 10px;
  background: ${({ theme }) => theme.colors.backgroundLight};

  img {
    margin-bottom: 8px;
    width: ${toRem(45)};
  }

  ${({ active }) =>
    active == true &&
    css`
      border: 1px solid;
      border-color: ${({ theme }) => theme.colors.white};
    `};

  @media (max-width: ${breakPoint.mobileLg}) {
    width: ${toRem(115)};
    height: ${toRem(85)};

    img {
      margin-bottom: ${toRem(8)};
      width: ${toRem(35)};
    }
  }

  @media (max-width: ${breakPoint.mobile}) {
    width: ${toRem(105)};
    height: ${toRem(80)};

    img {
      margin-bottom: ${toRem(6)};
      width: ${toRem(32)};
    }
  }
`;

export const Txt = styled(SubTitle)`
  margin: 0;

  font-size: ${toRem(16)};
  color: ${({ theme }) => theme.colors.gray};

  @media (max-width: ${breakPoint.mobileLg}) {
    font-size: ${toRem(14)};
  }
`;
