import { useEffect, useState } from 'react'
import { Typography, Grid, Stack, Button, ButtonBase, Divider, styled, Card, useTheme } from "@mui/material"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import Slider from "react-slick"
import * as api from '../services/api'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

export const ForexSlider = (props) => {
  const { key } = props
  const [pairs, setPairs] = useState()

  useEffect(() => {
      fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL,CHF-BRL,CAD-BRL,AUD-BRL').then(data => data.json()).then(dt => setPairs(dt))
  }, [])

  useEffect(() => {
      setInterval(() => {
          fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL,CHF-BRL,CAD-BRL,AUD-BRL').then(data => data.json()).then(dt => setPairs(dt))
      }, 300000)
  }, [])

  return (
      <Slider
        key={key}
        style={{marginTop:7}}
        infinite
        slidesToScroll={1}
        autoplay
        autoplaySpeed={0}
        speed={10000}
        arrows={false}
        variableWidth
        cssEase='linear'>
        {(pairs) ? Object.keys(pairs).map((item, index) => (
          <Card sx={{ width:177, paddingRight: 2, paddingLeft: 2, paddingTop: 1, paddingBottom: 1, background: "#2b2440" }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Grid item md={4} xs={4} order={1}>
                <Stack alignItems="flex-start" padding={1}>
                  <Typography variant="caption" sx={{ fontSize: 12, fontWeight: 'bold' }} color="primary.muted">
                    {item}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', }} variant="subtitle">
                    R${(pairs[item]) ? String(Number(pairs[item].bid).toFixed(2)).replace('.', ','):null}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={8} xs={8} order={2}>
                <Stack alignItems="flex-end" padding={1}>
                  <Typography sx={{ fontSize: 12 }} color={Number(pairs[item].pctChange) > 0 ? "success.main": "error.main"}>
                    {(pairs[item]) ? String(Number(pairs[item].pctChange).toFixed(2)).replace('.', ',') : null}%
                  </Typography>
                  {(Number(pairs[item].pctChange) > 0) ? <TrendingUpIcon color={"success"} /> : <TrendingDownIcon color="error" />}
                </Stack>
              </Grid>
            </Stack>
          </Card>
        )):null}
      </Slider>
  )
}