import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/index';
import Layout from '../../components/Layout/index';

import { variants } from '../../utils/motionConfig';
import { Title, Card, Container } from './styles';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout title="Aulas" noMenu>
        <Container>
          <Card type="1" variants={variants.itemSlide} onClick={() => navigate('/tutorials')}>
            <Title>Aulas</Title>
          </Card>

          <Card type="2" variants={variants.itemSlide} onClick={() => navigate('/robot')}>
            <Title>Operações</Title>
          </Card>

          <Card type="3" variants={variants.itemSlide} onClick={() => navigate('/upgrades')}>
            <Title>Upgrades</Title>
          </Card>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
