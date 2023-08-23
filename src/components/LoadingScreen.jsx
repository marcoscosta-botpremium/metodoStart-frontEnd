import { Box } from "@mui/material";
import NProgress from "nprogress";
import React, { useEffect } from "react";

const LoadingScreen = () => {
  NProgress.configure({
    showSpinner: false,
  });
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <Box style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    background: '#000',
  }} />;
};

export default LoadingScreen;
