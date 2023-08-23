import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/index';
import Layout from '../../components/Layout/index';
import { BotContext } from '../../contexts/BotContext';
import * as api from '../../services/api';
import { Row, Text, Title } from '../../styles/global';
import { variants } from '../../utils/motionConfig';
import { Card, Container, TextContainer } from './styles';

const Operation = () => {
  const { selectBot } = useContext(BotContext);

  const navigate = useNavigate();
  const [bots, setBots] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const getTutorials = async () => {
      try {
        const response = await api.getBots(controller);

        // response.scripts.forEach((script) => {
        //   switch (script.name) {
        //     case 'Conservador':
        //       script.options = [
        //         { label: 'Menor chance de perdas' },
        //         { label: 'Lucros menores' },
        //         { label: 'Oportunidade de aprender' },
        //       ];
        //       break;

        //     case 'Moderado':
        //       script.options = [
        //         { label: 'Moderada chance de perdas' },
        //         { label: 'Moderada chance de lucro' },
        //         { label: 'Oportunidade de avançar' },
        //       ];
        //       break;

        //     case 'Agressivo':
        //       script.options = [
        //         { label: 'Alta chance de lucro' },
        //         { label: 'Alta chance de perdas' },
        //         { label: 'Operações avancadas' },
        //       ];
        //       break;

        //     default:
        //       break;
        //   }
        // });

        response?.scripts.reverse();

        setBots(response?.scripts);
      } catch (error) {
        // console.log(error);
      }
    };

    getTutorials();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Layout title="Operações">
      <Container variants={variants.opacity} animate="visible" initial="hidden">
        <Row>
          {bots?.map((item, index) => (
            <Card key={index} variants={variants.itemSlide} image={item?.image}>
              <Title>{item.name}</Title>

              <Button
                onClick={() => {
                  navigate('/robot');
                  selectBot(item);
                }}
              >
                Começar agora
              </Button>
            </Card>
          ))}
        </Row>

        <div className="text" onClick={() => navigate('/upgrades')}>
          <Text>Quero ter acesso a mais robôs em outros planos</Text>
        </div>
      </Container>
    </Layout>
  );
};

export default Operation;
