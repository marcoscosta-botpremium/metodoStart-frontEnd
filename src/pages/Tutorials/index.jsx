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
  Scroll
} from './styles';
import { useParams } from 'react-router-dom';

const Tutorials = () => {
  const { id } = useParams();
  const [tutorials, setTutorials] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [page, setPage] = useState(1);
  const tutorialContainerRef = React.useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const getTutorials = async () => {
      try {
        const response = await api.getTutorials(controller);

        if (id) {
          setSelectedVideo(response?.publications[1]);
        } else {
          setSelectedVideo(response?.publications[0]);
        }
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

  const handleScroll = () => {
    const controller = new AbortController();
    api.getTutorials(controller, page + 1).then(res => {
      let moreTutorials = res.publications;
      setTutorials(t => [...t, ...moreTutorials])
    })
    setPage(pg => pg + 1)
  };

  useEffect(() => {
    if (selectedVideo) {
      const elementText = document.querySelector('#describe');
      elementText.innerHTML = selectedVideo?.describe;
    }
  }, [selectedVideo]);

  return (
    <Layout title="Aulas">
      <Container variants={variants.opacity} animate="visible" initial="hidden">
        <VideoContainer>
          {selectedVideo?.link && (
            <Vimeo
              className="vimeo-player"
              video={selectedVideo?.link}
              showTitle={false}
              showPortrait={false}
            />
          )}

          <SubTitle
            style={{
              color: '#00DF00',
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'center'
            }}
          >{selectedVideo?.title}</SubTitle>
          <Text
            style={{
              width: '100%',
              textAlign: 'center'
            }} id="describe"></Text>
        </VideoContainer>

        <ListTutorials ref={tutorialContainerRef}>
          {tutorials.map((item, index) => (
            <ItemTutorials
              key={index}
              active={item.id === selectedVideo?.id}
              variants={variants.itemOpacity}
              onClick={() => setSelectedVideo(item)}
              whileTap={{
                scale: 0.9,
              }}
            >
              <Img src={imgPlay} alt="player" />

              <Text>
                Aula {item?.number} - {item.title}
              </Text>
            </ItemTutorials>
          ))}
          {/* <ItemTutorials
            key={1000000}
            active={true}
            variants={variants.itemOpacity}
            onClick={handleScroll}
            whileTap={{
              scale: 0.9,
            }}
          >
            <Text>
              P
            </Text>
          </ItemTutorials> */}
        </ListTutorials>
      </Container>
    </Layout >
  );
};

export default Tutorials;
