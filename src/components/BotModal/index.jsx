import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Carousel from "react-multi-carousel";
import Typography from '@mui/material/Typography';
import "react-multi-carousel/lib/styles.css";
import * as api from '../../services/api';
import './index.css'
import { DialogTitle } from '@material-ui/core';
import { BotContext } from '../../contexts/BotContext';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function BotModal(props) {
  const { selectBot } = React.useContext(BotContext)
  const { open, setOpen } = props

  const [bots, setBots] = React.useState([]);

  React.useEffect(() => {
    const controller = new AbortController();

    const getTutorials = async () => {
      try {
        const response = await api.getBots(controller);

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        xs={12}
        md={6}
        lg={6}
        xl={4}
        PaperProps={{
          style: {
            background: '#010101',
            borderRadius: 7,
            width: '60vw',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          },
        }}
      >
        <DialogTitle style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Escolha um robô
          </Typography>
        </DialogTitle>
        <DialogContent style={{ width: '100%' }}>
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
            {bots?.map((item, index) => (
              <div
                style={{
                  paddingRight: 10,
                  paddingLeft: 10,
                  width: '100%',
                  height: '100%',
                  borderRadius: 27,
                  cursor: 'pointer',
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
                  alt={item?.name} />
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
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {item?.name}
                  </Typography>
                </div>
              </div>
            ))}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div >
  )
}
