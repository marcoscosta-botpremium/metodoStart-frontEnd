import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgAulas from '../../../assets/aulas.svg';
import imgOperacoes from '../../../assets/operacoes.svg';
import imgUpgrade from '../../../assets/upgrade.svg';
import { Img } from '../../../styles/global';
import { variants } from '../../../utils/motionConfig';
import { Card, Container, Txt } from './styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyIcon from '@mui/icons-material/Psychology';
import UpdateIcon from '@mui/icons-material/Update';

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
        <DashboardIcon sx={{
          width: 40,
          height: 40
        }} />
        <Txt>Aulas</Txt>
      </Card>

      <Card
        variants={variants.itemOpacity}
        active={title === 'Operações'}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => navigate('/robot')}
      >
        <PsychologyIcon
          sx={{
            width: 40,
            height: 40
          }}
        />
        <Txt>Operações</Txt>
      </Card>

      <Card
        variants={variants.itemOpacity}
        active={title === 'Atualizações'}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => navigate('/upgrades')}
      >
        <UpdateIcon
          sx={{
            width: 40,
            height: 40
          }} />
        <Txt>Atualizações</Txt>
      </Card>
    </Container>
  );
}

export default Menu;
