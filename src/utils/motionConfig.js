const animationScale = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemScale = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
    },
  },
};

const animationSlide = {
  hidden: { x: -200 },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      delay: 0.1,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemSlide = {
  hidden: { x: 300, opacity: 0 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
    },
  },
};

export const variants = {
  opacity: animationScale,
  itemOpacity: itemScale,

  slide: animationSlide,
  itemSlide: itemSlide,
};
