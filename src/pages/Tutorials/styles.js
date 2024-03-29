import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { breakPoint, Column, Row, toRem } from '../../styles/global';

export const Container = styled(Row)`
  height: ${toRem(700)};
  padding: 0 ${toRem(12)};
  width: 100%;
  overflow: hidden;

  iframe {
    width: 100% !important;
  }

  .vimeo-player{
    display:flex;
    justify-content:center;
    width:100% !important;
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
  @media (min-width: 1420px) {
    iframe {
      width: 100%;
      height: 500px;
    }
  }
  @media (min-width: 1024px) {
    iframe {
      width: 100%;
      //height: 400px;
    }
  }
`;

export const VideoContainer = styled(Column)`
  width: 63%;

  h2 {
    margin: ${toRem(12)} 0;
  }

  iframe{
    border-radius:10px;
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;

    align-items: center;
  }
`;

export const ListTutorials = styled(motion.div)`
  width: 35%;
  overflow-y: scroll;
  height: ${toRem(560)};

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

  background: #010101;

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
        #0D953C,
        #1AE363
      );
    `};
`;

export const Scroll = styled(Row)`
  overflow-y: auto;
`;
