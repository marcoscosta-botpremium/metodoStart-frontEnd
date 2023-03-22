import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { toRem } from '../../styles/global';

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
      text-align: center;

      border: 1px solid;
      border-radius: 10px;

      padding: ${toRem(8)};
      font-size: ${toRem(13)};

      color: ${({ theme }) => theme.colors.gray};
    }
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  width: ${toRem(305)};
  height: ${toRem(370)};

  padding: ${toRem(30)} ${toRem(10)};
  margin: 0 auto;
  margin-bottom: ${toRem(25)};

  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundDark};

  .texts {
    display: flex;

    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;

    p {
      margin: ${toRem(6)} 0;
    }
  }
`;

export const TextContainer = styled(motion.div)`
  display: flex;

  justify-content: space-between;
  align-items: center;

  div {
    width: ${toRem(10)};
    height: ${toRem(10)};

    margin-right: ${toRem(10)};

    border-radius: 100%;
    background: ${({ theme }) => theme.colors.green};

    ${({ type }) =>
      type == 1 &&
      css`
        background: ${({ theme }) => theme.colors.red};
      `};
  }
`;
