import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/index';
import Layout from '../../components/Layout/index';
import * as api from '../../services/api';
import { Row, Text } from '../../styles/global';
import { variants } from '../../utils/motionConfig';
import { Card, ColumnText, Container, Price, TextContainer } from './styles';

function Upgrades() {
  const [updrades, setUpdrades] = useState([]);

  const response = [
    {
      title: 'Método Start',
      price: 'R$49,90',
      options: [
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
      ],
    },

    {
      title: 'Profissional',
      offer: 'Melhor Oferta',
      price: 'R$159,90',
      options: [
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
      ],
    },

    {
      title: 'Ilimitado',
      offer: 'Maior Vantagem',
      price: 'R$359,90',
      options: [
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
        { label: 'Acesso a plaataforma' },
      ],
    },
  ];

  useEffect(() => {
    const controller = new AbortController();

    const getUpgrades = async () => {
      try {
        const response = await api.getUpgrades(controller);

        response.plans.forEach(
          (plan) => (plan.options = plan.values.split(';'))
        );

        setUpdrades(response?.plans);
      } catch (error) {
        // console.log(error);
      }
    };

    getUpgrades();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Layout title="Upgrades">
      <Container variants={variants.opacity} animate="visible" initial="hidden">
        <Row>
          {updrades.map((item, index) => (
            <Card key={index} variants={variants.itemSlide}>
              <Row>
                <span className="value">{item.title}</span>
                {/* {item.offer && <span className="offer">{item.offer}</span>} */}
              </Row>

              <Price>
                {item.price} <span>/mês</span>{' '}
              </Price>

              <ColumnText>
                {item.options.map((option) => (
                  <TextContainer>
                    <div></div>
                    <Text>{option}</Text>
                  </TextContainer>
                ))}
              </ColumnText>

              <Button>Quero Assinar</Button>
            </Card>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}

export default Upgrades;
