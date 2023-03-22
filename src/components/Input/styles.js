import { motion } from 'framer-motion';
import styled from 'styled-components';
import { breakPoint, toRem } from '../../styles/global';

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;

  margin: 10px 0;
  input {
    width: ${toRem(350)};
    height: ${toRem(45)};

    padding: 0 ${toRem(12)};

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    outline: none;

    color: ${({ theme }) => theme.colors.grayLight};
    background: ${({ theme }) => theme.colors.white};

    &::placeholder {
      color: rgba(0, 0, 0, 0.35);
    }

    @media (max-width: ${breakPoint.mobileLg}) {
      width: ${toRem(320)};
    }
  }
  .password {
    z-index: 2;
    position: relative;

    img {
      position: absolute;
      width: ${toRem(22)};
      height: ${toRem(22)};

      opacity: 0.4;
      cursor: pointer;

      top: ${toRem(14)};
      right: ${toRem(20)};
    }
  }
`;

export const ErrorMsg = styled.span`
  margin-top: ${toRem(8)};
  font-size: ${toRem(14)};

  color: ${({ theme }) => theme.colors.red};
`;
