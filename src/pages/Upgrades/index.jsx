import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/index';
import Layout from '../../components/Layout/index';
import * as api from '../../services/api';
import { Row, Text } from '../../styles/global';
import { variants } from '../../utils/motionConfig';
import { Card, Container, Subtitle, Description } from './styles';
import Slider from '../../components/Slider'
import { Grid } from '@mui/material';

function Upgrades() {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const getUpgrades = async () => {
      try {
        const response = await api.getUpgrades(controller);

        // response.plans.forEach(
        //   (plan) => (plan.options = plan.values.split(';'))
        // );

        response?.plans.reverse();

        setUpgrades(response?.plans);
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
    <Layout
      title="Upgrades"
      noBg>
      <Grid sx={{
        display: { sm: 'block', xs: 'block', md: 'none', lg: 'none', xl: 'none' },
      }}>
        <Row
          style={{ justifyContent: 'flex-start' }}>
          {upgrades?.map((item, index) => (
            <Card key={index} variants={variants.itemSlide} image={item?.image}>
              <Subtitle>
                {item?.title}
              </Subtitle>

              <Description>
                {item?.description}
              </Description>

              <Button style={{ marginTop: 7, width: '100%' }} onClick={() => window.open(item?.link)}>
                {item?.buttonName}
              </Button>
            </Card>
          ))}
        </Row>
      </Grid>
      <Grid sx={{
        display: { sm: 'none', xs: 'none', md: 'block', lg: 'block', xl: 'block' },
        width: { xl: '80vw', lg: '80vw', md: '75vw', sm: '97vw', xs: '95vw' }
      }}>
        <Slider items={upgrades} />
      </Grid>
    </Layout >
  );
}

export default Upgrades;
