import { motion } from 'framer-motion';
import styled from 'styled-components';
import { toRem } from '../../../styles/global';

export const Container = styled(motion.form)`
  display: flex;
  height: ${toRem(250)};

  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  margin-top: ${toRem(40)};

  h2 {
    margin-bottom: ${toRem(20)};

    font-size: ${toRem(28)};
    font-weight: 500;

    color: ${({ theme }) => theme.colors.white};
  }

  p {
    cursor: pointer;
  }

  button {
    margin-top: ${toRem(10)};
  }
`;
