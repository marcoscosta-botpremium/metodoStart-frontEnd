import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import imgAulas from '../../assets/aulas.jpeg';
import imgOperacoes from '../../assets/operacoes.jpeg';
import imgUpgrade from '../../assets/upgrades.jpeg';
import { breakPoint, toRem } from '../../styles/global';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 80%;

  margin-top: ${toRem(38)};

  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${breakPoint.mobileLg}) {
    height: 100%;
    justify-content: center;
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  width: ${toRem(330)};
  height: ${toRem(500)};

  padding-bottom: ${toRem(50)};

  align-items: flex-end;
  justify-content: center;

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
    width: 100%;
    height: ${toRem(330)};

    border-radius: 20px;

    &:nth-last-child(1) {
      margin-bottom: ${toRem(50)};
    }
  }
`;
