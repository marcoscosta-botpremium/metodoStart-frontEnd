import styled from "styled-components";
import { toRem, breakPoint } from "../../styles/global";

export const Contain = styled.div`
  display: flex;
  padding: ${toRem(20)};

  img {
    width: ${toRem(130)};
    height: ${toRem(130)};

    border-radius: 100%;
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
    flex-direction: column;
  }
`;

export const ImgContainer = styled.div`
  width: ${toRem(130)};
  height: ${toRem(130)};

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${toRem(20)};

  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-top: ${toRem(20)};
  }

  .imgEditor {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${toRem(5)} ${toRem(20)};

    background: ${({ theme }) => theme.colors.backgroundDark};

    margin-top: ${toRem(15)};
    border-radius: ${toRem(8)};
    cursor: pointer;

    p {
      cursor: pointer;
    }
  }
`;

export const TextContainer = styled.div`
  margin-left: ${toRem(40)};
  justify-content: space-between;

  h2 {
    font-weight: bold;
  }

  @media (max-width: ${breakPoint.mobileLg}) {
    width: ${toRem(150)};
    display: flex;

    margin: 0;

    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
`;

export const Infos = styled.div`
  width: 100%;

  padding: ${toRem(20)};
`;

export const InfosPayment = styled.div`
  width: 100%;

  padding: ${toRem(20)};
`;

export const InfosContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;



  @media (max-width: ${breakPoint.mobileLg}) {
    width: 100%;
    display: flex;

    margin: 0;

    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
`;
