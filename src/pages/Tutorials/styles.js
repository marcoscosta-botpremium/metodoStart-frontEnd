import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { breakPoint, Column, Row, toRem } from '../../styles/global';

export const Container = styled(Row)`
  height: ${toRem(440)};
  padding: 0 ${toRem(12)};
  width: 100%;

  overflow-y: auto;

  iframe {
    width: ${toRem(620)};
    height: ${toRem(350)};
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    height: unset;
    flex-direction: column;

    padding: 0;

    iframe {
      width: ${toRem(375)};
      height: ${toRem(260)};
    }
  }

  @media (max-width: ${breakPoint.mobile}) {
    iframe {
      width: ${toRem(335)};
      height: ${toRem(250)};
    }
  }
`;

export const VideoContainer = styled(Column)`
  width: 63%;

  h2 {
    margin: ${toRem(12)} 0;
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;

    align-items: center;
  }
`;

export const ListTutorials = styled(motion.div)`
  width: 35%;

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;

    margin-top: ${toRem(32)};
  }
`;

export const ItemTutorials = styled(Row)`
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;

  margin-top: ${toRem(14)};
  padding: ${toRem(10)} ${toRem(16)};

  cursor: pointer;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.backgroundDark};

  &:nth-child(1) {
    margin-top: 0;
  }

  img {
    width: ${toRem(35)};
    height: ${toRem(35)};

    margin-right: ${toRem(10)};
  }

  p {
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ active }) =>
    active &&
    css`
      background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.primary},
        ${({ theme }) => theme.colors.secundary}
      );
    `};
`;
