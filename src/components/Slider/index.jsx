import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Carousel from "react-multi-carousel";
import Typography from '@mui/material/Typography';
import "react-multi-carousel/lib/styles.css";
import * as api from '../../services/api';
import './index.css'
import { DialogTitle } from '@material-ui/core';
import { Button } from '@mui/material';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 4
  },
  laptop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 0
  }
};

export default function BotModal(props) {
  const { open, setOpen, items } = props

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: '100%', paddingRight: 15 }}>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        partialVisible={false}
        className='carousel-container'
      >
        {items?.map((item, index) => (
          <div
            style={{
              paddingRight: 10,
              paddingLeft: 10,
              width: '100%',
              height: '500px',
              borderRadius: 27,
            }}
            className="slider"
            key={index}
            onClick={() => {
              selectBot(item);
              setOpen(false);
            }}>
            <img
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
              src={item?.image}
              alt={item?.title} />
            <div style={{
              position: 'absolute',
              bottom: 10,
              width: '100%',
              paddingRight: 30,
              paddingLeft: 10
            }}>
              <Typography
                style={{
                  color: '#fff',
                  fontSize: 27,
                  fontWeight: 'bold',
                }}
              >
                {item?.title}
              </Typography>
              {/* Description */}
              <Typography
                style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                {item?.description}
              </Typography>
              <Button variant="contained" style={{ width: '100%', borderRadius: 17, fontSize: 17, background: 'linear-gradient(0.25turn, #0D953C, #1AE363)', marginTop: 10 }}
                onClick={() => {
                  window.open(item?.link, '_blank');
                }}>
                {item?.buttonName.toUpperCase()}
              </Button>
            </div>
          </div>
        ))
        }
      </Carousel >
    </div >
  )
}
