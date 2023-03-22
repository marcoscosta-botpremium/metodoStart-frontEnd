import { motion } from 'framer-motion';
import styled from 'styled-components';
import { breakPoint, toRem } from '../../styles/global';

export const Btn = styled(motion.button)`
  display: grid;
  width: ${toRem(216)};

  border-radius: 8px;
  place-items: center;
  padding: ${toRem(10)};

  cursor: pointer;
  border: none;

  font-size: ${toRem(20)};

  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secundary}
  );

  .loadingImg {
    width: ${toRem(30)};
    height: ${toRem(30)};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    width: ${toRem(180)};
    padding: ${toRem(8)};

    font-size: ${toRem(18)};
  }

  @media (max-width: ${breakPoint.mobile}) {
    font-size: ${toRem(16)};
  }
`;
