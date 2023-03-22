import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Column, Title, toRem } from '../../styles/global';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  .text {
    cursor: pointer;

    opacity: 0.7;
    p {
      color: ${({ theme }) => theme.colors.gray};

      border: 1px solid;
      border-radius: 10px;

      font-size: ${toRem(13)};
      padding: ${toRem(8)};
    }
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  width: ${toRem(305)};
  height: ${toRem(420)};

  margin: 0 auto;
  margin-bottom: ${toRem(25)};
  padding: ${toRem(15)} ${toRem(15)} ${toRem(30)};

  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundDark};

  .value {
    font-size: ${toRem(18)};
    color: ${({ theme }) => theme.colors.gray};
  }

  .offer {
    font-size: ${toRem(12)};
    padding: ${toRem(5)} ${toRem(15)};

    font-weight: 500;
    border-radius: 15px;

    color: ${({ theme }) => theme.colors.white};
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secundary}
    );
  }
`;

export const ColumnText = styled(Column)`
  height: ${toRem(120)};
  justify-content: flex-start;
`;

export const TextContainer = styled(motion.div)`
  display: flex;

  align-items: center;
  justify-content: space-between;

  div {
    width: ${toRem(10)};
    height: ${toRem(10)};

    margin-right: ${toRem(10)};

    border-radius: 100%;
    background: ${({ theme }) => theme.colors.blue};
  }

  p {
    margin: ${toRem(3)} 0;
  }

  ${({ type }) =>
    type === 1 &&
    css`
      background: ${({ theme }) => theme.colors.red};
    `};
`;

export const Price = styled(Title)`
  font-size: ${toRem(36)};

  span {
    font-weight: 400;
  }
`;
