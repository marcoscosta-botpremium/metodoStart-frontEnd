import { motion } from 'framer-motion';
import styled, { createGlobalStyle, css } from 'styled-components';

export const toRem = (value) => {
  const remValue = value / 16 + 'rem';
  return remValue;
};

export const breakPoint = {
  mobile: '388px',
  mobileLg: '430px',
  laptop: '1400px',
};

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Poppins', sans-serif;
        font-size: ${toRem(16)};

        color: ${({ theme }) => theme.colors.white};

        &::-webkit-scrollbar {
          width: 8px;
        }

         &::-webkit-scrollbar-thumb {
           border-radius: 20px;
          background-color: ${({ theme }) => theme.colors.backgroundDark};
         }
    }

      html {
        font-size: 100%;
        
        @media (max-width: ${breakPoint.mobile}) {
          font-size: 85%;
        }

         @media (max-width: ${breakPoint.mobileLg}) {
          font-size: 94%;
        }
        @media (max-width: ${breakPoint.laptop}) {
          font-size: 88%;
        }
    }
    
    #root{
        margin:0 auto;
    }

    #videoPlayer {
      button {
        display: none !important;
      }
    }
 `;

export const Img = styled(motion.img)``;

export const Row = styled(motion.div)`
  display: flex;
  width: 100%;

  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Column = styled(motion.div)`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(motion.h1)`
  font-weight: 500;
  font-size: ${toRem(30)};
`;

export const SubTitle = styled(motion.h2)`
  margin: ${toRem(16)} 0;

  font-weight: 400;
  letter-spacing: 1px;
  font-size: ${toRem(20)};
`;

export const Text = styled(motion.p)`
  text-align: justify;
  font-size: ${toRem(16)};
`;

export const Description = styled(motion.p)`
  text-align: start;
  font-size: ${toRem(12)};

  color: ${({ theme }) => theme.colors.gray};

  ${({ center }) =>
    center == true &&
    css`
      text-align: center;
    `};
`;

export const Space = styled(motion.div)`
  width: 100%;
  height: ${toRem(24)};
`;
