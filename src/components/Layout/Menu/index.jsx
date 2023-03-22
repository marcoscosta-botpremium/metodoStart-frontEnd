import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgAulas from '../../../assets/aulas.svg';
import imgOperacoes from '../../../assets/operacoes.svg';
import imgUpgrade from '../../../assets/upgrade.svg';
import { Img } from '../../../styles/global';
import { variants } from '../../../utils/motionConfig';
import { Card, Container, Txt } from './styles';

function Menu({ title }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Card
        variants={variants.itemOpacity}
        active={title === 'Aulas'}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => navigate('/tutorials')}
      >
        <Img src={imgAulas} alt="aulas" />
        <Txt>Aulas</Txt>
      </Card>

      <Card
        variants={variants.itemOpacity}
        active={title === 'Operações'}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => navigate('/operation')}
      >
        <Img src={imgOperacoes} alt="operacoes" />
        <Txt>Operações</Txt>
      </Card>

      <Card
        variants={variants.itemOpacity}
        active={title === 'Upgrades'}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => navigate('/upgrades')}
      >
        <Img src={imgUpgrade} alt="upgrade" />
        <Txt>Upgrades</Txt>
      </Card>
    </Container>
  );
}

export default Menu;
