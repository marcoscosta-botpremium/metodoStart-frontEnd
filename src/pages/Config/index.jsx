import React, { useEffect } from 'react';
import imgAvatar from '../../assets/avatar.svg';
import Layout from '../../components/Layout/index';
import { useAuth } from '../../contexts/auth';
import { Img, Row, SubTitle, Text } from '../../styles/global';
import {
  Contain,
  ImgContainer,
  Infos,
  InfosContainer,
  InfosPayment,
  TextContainer,
} from './styles';

import { useState } from 'react';
import * as api from '../../services/api';

function Config() {
  const { user, setUser } = useAuth();
  const [boostTrueChecked, setBoostTrueChecked] = useState(
    localStorage.bootTrue === 'true'
  );

  useEffect(() => {
    const getUser = localStorage.getItem('getUser');
    setUser(JSON.parse(getUser));
  }, []);

  const handleCheck = (e) => {
    if (!localStorage.bootTrue) {
      localStorage.setItem('bootTrue', 'true');
      setBoostTrueChecked(localStorage.bootTrue === 'true');
    } else {
      localStorage.bootTrue === 'true'
        ? localStorage.setItem('bootTrue', 'false')
        : localStorage.setItem('bootTrue', 'true');
      setBoostTrueChecked(localStorage.bootTrue === 'true');
    }
  };

  const handleImgUpload = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      const img = reader.result;
      setUser((data) => ({
        ...data,
        user: {
          ...data.user,
          picture: img.replace('data:image/png;base64,', ''),
        },
      }));
      api.setPicture(img).then(() => {});
    };
  };

  const handleText = (text) => {
    if (text) {
      return text;
    }

    return 'Não informado';
  };

  return (
    <Layout title="Configurações">
      <Row>
        <Contain>
          <ImgContainer>
            {user?.user?.picture && (
              <Img
                src={`data:image/png;base64,${user?.user?.picture}`}
                alt="foto-user"
              />
            )}
            {!!user?.user?.picture || (
              <Img className="avatar" src={imgAvatar} alt="foto-user" />
            )}
            <input
              style={{ display: 'none' }}
              type="file"
              onChange={handleImgUpload}
              id="pictureImg"
            />
            <div
              className="imgEditor"
              onClick={() =>
                window.document.getElementById('pictureImg').click()
              }
            >
              <Text>Editar</Text>
            </div>
          </ImgContainer>

          <TextContainer>
            <SubTitle>Olá, {handleText(user?.user?.nome)}</SubTitle>

            <Text>
              <b>CPF:</b> {handleText(user?.user?.cpf)}
            </Text>

            <Text>
              <b>E-mail:</b> {handleText(user?.user?.email)}
            </Text>
          </TextContainer>
        </Contain>
      </Row>

      <Row>
        <InfosContainer>
          <Infos>
            <SubTitle>Informações da Assinatura</SubTitle>

            <Text>
              <b>Status da conta: </b>
              {user?.subscription?.isActive ? 'Ativo' : 'Inativo'}
            </Text>

            <Text>
              <b>Data de Vencimento: </b>
              {handleText(
                new Date(user?.subscription?.endDate).toLocaleDateString(
                  'pt-br'
                )
              )}
            </Text>
          </Infos>

          <InfosPayment>
            <SubTitle>Informações de Pagamento</SubTitle>

            <Text>
              <b>Pagamento Realizado: </b>
              <span>
                {handleText(
                  new Date(user?.payments[0]?.date).toLocaleDateString('pt-br')
                )}
              </span>
            </Text>

            <Text>
              <b>Valor: </b>
              {handleText(user?.payments[0]?.amount)}
            </Text>
          </InfosPayment>
        </InfosContainer>
      </Row>

      {user?.user?.email === 'marcos.vinicios_12@hotmail.com' && (
        <div style={{ position: 'absolute', right: 10, bottom: 0 }}>
          <input
            type="checkbox"
            defaultChecked={boostTrueChecked}
            onClick={handleCheck}
          />
        </div>
      )}
    </Layout>
  );
}

export default Config;
