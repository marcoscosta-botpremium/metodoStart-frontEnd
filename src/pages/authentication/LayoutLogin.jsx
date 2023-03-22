import { LinearProgress, Grid, Stack } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box } from "@mui/system"
import React, { useEffect } from "react"

const AuthenticationLayout = (props) => {
  const { children, isLoading } = props;
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Grid container height="100%">
      <Grid container style={{ width:'100%', height:'100%', position:'fixed', zIndex:100}}>
        <Grid item md={12} xs={12} order={1} >
          <Stack alignItems="center" justifyContent="center" height="100%">
            <Box
              sx={{
                borderRadius: 7,
                backgroundColor: 'primary.main',
                overflow: 'hidden'
              }}
              textAlign="center" maxWidth={450} width="100%">
              <img style={{ marginTop: 14 }} src="/logo.png" width={"100%"} alt="Logo" />
              {children}
              <LinearProgress color="success" sx={{ display: isLoading ? 'flex' : 'none', width: '100%' }} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <video id="myVideo" style={{ position: 'fixed', opacity: 0.2, minWidth: '100%', minHeight: '100%', overflow: 'hidden', bottom: 0, right: 0, zIndex: '-2' }} autoPlay muted loop>
        <source src="/videos/acesso.webm" type="video/webm" />
      </video>
    </Grid>
  );
};

export default AuthenticationLayout;
