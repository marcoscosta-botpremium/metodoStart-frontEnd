import Vimeo from '@u-wave/react-vimeo';
import React, { useEffect, useState } from 'react';
import imgPlay from '../../assets/play.svg';
import Layout from '../../components/Layout/index';
import * as api from '../../services/api';
import { Img, SubTitle, Text } from '../../styles/global';
import { variants } from '../../utils/motionConfig';
import {
  Container,
  ItemTutorials,
  ListTutorials,
  VideoContainer,
} from './styles';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const getTutorials = async () => {
      try {
        const response = await api.getTutorials(controller);

        response.publications.reverse();

        setSelectedVideo(response?.publications[0]);
        setTutorials(response?.publications);
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
    <Layout title="Aulas">
      <Container variants={variants.opacity} animate="visible" initial="hidden">
        <VideoContainer>
          {selectedVideo.link && (
            <Vimeo
              video={selectedVideo.link}
              showTitle={false}
              showPortrait={false}
            />
          )}

          <SubTitle>{selectedVideo.title}</SubTitle>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            tenetur totam. Commodi nostrum eius laudantium, saepe expedita autem
            non cumque minus ipsam voluptates! Ex, nemo quod sunt nobis
            consequatur cupiditate.
          </Text>
        </VideoContainer>

        <ListTutorials>
          {tutorials.map((item, index) => (
            <ItemTutorials
              key={index}
              active={item.link === selectedVideo.link}
              variants={variants.itemOpacity}
              onClick={() => setSelectedVideo(item)}
              whileTap={{
                scale: 0.9,
              }}
            >
              <Img src={imgPlay} alt="player" />

              <Text>
                Aula {index + 1} - {item.title}
              </Text>
            </ItemTutorials>
          ))}
        </ListTutorials>
      </Container>
    </Layout>
  );
};

export default Tutorials;
