import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/index';
import Layout from '../../components/Layout/index';

import { variants } from '../../utils/motionConfig';
import { Card, Container } from './styles';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout title="Aulas" noMenu>
        <Container>
          <Card type="1" variants={variants.itemSlide}>
            <Button onClick={() => navigate('/tutorials')}>Aulas</Button>
          </Card>

          <Card type="2" variants={variants.itemSlide}>
            <Button onClick={() => navigate('/operation')}>Operações</Button>
          </Card>

          <Card type="3" variants={variants.itemSlide}>
            <Button onClick={() => navigate('/upgrades')}>Upgrades</Button>
          </Card>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
