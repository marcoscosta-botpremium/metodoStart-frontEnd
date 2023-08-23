import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import imgAulas from '../../assets/1.png';
import imgOperacoes from '../../assets/2.png';
import imgUpgrade from '../../assets/3.png';
import { breakPoint, toRem } from '../../styles/global';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 80%;

  margin-top: ${toRem(38)};

  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakPoint.mobileLg}) {
    height: 100%;
    justify-content: center;
  }
`;

export const Title = styled(motion.h1)`
  display: flex;

  align-items: flex-end;
  margin-left: ${toRem(20)};
  margin-bottom: ${toRem(20)};

  font-size: ${toRem(40)};
  font-weight: 400;

  @media (max-width: ${breakPoint.mobileLg}) {
    height: 100%;
    justify-content: center;
  }
`;


export const Card = styled(motion.div)`
  display: flex;
  width: ${toRem(330)};
  height: ${toRem(500)};
  margin: ${toRem(50)};

  align-items: flex-end;
  justify-content: flex-start;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

  ${({ type }) =>
    type == '1' &&
    css`
      background: url(${imgAulas});
      background-position: center;
    `};

  ${({ type }) =>
    type == '2' &&
    css`
      background: url(${imgOperacoes});
      background-position: center;
    `};

  ${({ type }) =>
    type == '3' &&
    css`
      background: url(${imgUpgrade});
      background-position: right;
    `};

  background-size: cover;

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 90%;
    height: ${toRem(280)};
    margin: 0;

    background-position: top;

    border-radius: 20px;

    &:nth-last-child(1) {
      margin-bottom: ${toRem(50)};
    }
  }
`;
