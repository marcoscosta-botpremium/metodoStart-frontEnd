import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Column, Title, toRem } from '../../styles/global';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;

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
  width: ${toRem(300)};
  height: ${toRem(500)};

  margin-left: ${toRem(15)};
  margin-bottom: ${toRem(10)};
  padding: ${toRem(15)} ${toRem(15)} ${toRem(15)};

  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;

  border-radius: 8px;
  background: url(${({ image }) => image}) center no-repeat;

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
  @media (max-width: 768px) {
    width: 100%;
    height: ${toRem(350)};

    margin: 0 auto;
    margin-bottom: ${toRem(25)};
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

export const Subtitle = styled(Title)`
  margin: 0;
  padding: 0;
  padding-bottom: 7px;
  font-size: ${toRem(27)};
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled(Title)`
  margin: 0;
  padding-bottom: 7px;
  font-size: ${toRem(14)};
  color: ${({ theme }) => theme.colors.gray};
`;
