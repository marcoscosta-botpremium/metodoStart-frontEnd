import { Typography, Grid, Stack, Select, MenuItem, Card } from "@mui/material"
import Layout from "./layout/Layout"
import React, { useEffect, useState, useContext } from "react"
import * as api from '../services/api'
import CalculatorTable from '../components/CalculatorTable'
import { ForexSlider } from '../components'
import AppTextField from '../components/AppTextField'
import { BotContext } from "../contexts/BotContext"
import { Scrollbars } from 'react-custom-scrollbars';

const Calculator = () => {
  const { balance, bots, setBots } = useContext(BotContext)
  const [userInfo, setUser] = useState({})
  const [simulation, setSimulation] = useState([])
  const [settings, setSettings] = useState({
    balance:0,
    entrance: 1,
    stopWin: 5,
    stopLoss: 5,
    bot: (bots.length) ? bots[0]: {}
  })

  const setValue = (field, value) => {
    setSettings({
      ...settings,
      [field]: value
    })
  }
  const calculateMartingale = (balance, entryValue, bot) => { 
    let stopLoss = (settings?.balance * settings?.stopLoss / 100) || 0;
    let currentBet = Number(entryValue);
    let bl = Number(balance);
    let totalLoss = 0;
    let round = 0;
    const results = [];
    while ((!stopLoss) ? false:Math.abs(stopLoss) > Math.abs(totalLoss)) {
      let customIter = bot.gales.find(o => o.iteration === round+1);
      if(customIter){
        if(customIter?.multiplier) {
          bot.multiplier = customIter?.multiplier
        }
        if(customIter?.lossPayout) {
          bot.lossPayout = customIter?.lossPayout
        }
        if(customIter?.payout) {
          bot.payout = customIter?.payout
        }
      }
      let payout = (round > 0) ? Number(bot?.lossPayout) : Number(bot?.payout)
      let gain = (currentBet * (payout / 100));
      let loss = -(currentBet);
      totalLoss  += Number(loss);
      bl += Number(loss);
      round++;

      results.push({
        round: round,
        entry: currentBet,
        gain: gain,
        loss: loss,
        totalLoss: totalLoss.toFixed(2),
        balance: bl.toFixed(2)
      });
      currentBet = currentBet + (currentBet * Number(bot.multiplier));
      
    }
    setSimulation(results);
  };


  useEffect(() => {
    if(settings?.entrance > 0){
      if (settings.balance && settings.entrance && settings.stopWin && settings.stopLoss && settings.bot) {
        calculateMartingale(settings.balance, settings.entrance, settings.bot)
      }else{
        setSimulation([])
      }
    }
  }, [settings])

  useEffect(() => {
    setValue('balance', balance?.balance)
  }, [balance])

  useEffect(() => {
    api.getUser().then(data => {
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data?.user))
    })
  }, [])
  
  return (
    <Layout
      title="Mercado"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={4}/>
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h5" sx={{ marginTop: 5, fontWeight: 'bold' }}>
            Calculadora
          </Typography>
          <Grid container sx={{ width:'100%'}} justifyContent="space-between" direction="row">
            <Grid item paddingTop={1} paddingBottom={1} paddingRight={{xs:1, md:0, lg:0}} xs={6} md={6} lg={2}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height: '100%' }} padding={1}>
                  <Grid sx={{ width: "100%" }} direction="row" alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      Valor Entrada
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: '100%', height: '100%', display: 'flex' }} alignItems="flex-end">
                    <AppTextField
                      name="appliedValue"
                      sx={{
                        width: '77%',
                        "& input::placeholder": {
                          fontSize: 13
                        },
                        input:{
                          fontWeight: 'bold'
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <span style={{ color: '#555', paddingRight: '10px' }}>U$</span>
                        ),
                      }}
                      placeholder="0.00"
                      type="number"
                      value={settings?.entrance}
                      onChange={(e) => setValue('entrance', e.target.value)}
                    />
                  </Grid>
                </Stack>
              </Card>
            </Grid>
            <Grid item paddingTop={1} paddingBottom={1} paddingLeft={{ xs:1 }} padding={{lg:1, md:1 }} paddingRight={{md:0}} xs={6} md={6} lg={2}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height: '100%' }} padding={1}>
                  <Grid sx={{ width: "100%" }} direction="row" alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      Valor da Banca
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: '100%', height: '100%', display: 'flex' }} alignItems="flex-end">
                    <AppTextField
                      name="balance"
                      sx={{
                        width: '77%',
                        "& input::placeholder": {
                          fontSize: 13
                        },
                        input: {
                          fontWeight: 'bold'
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <span style={{ color: '#555', paddingRight: '10px' }}>U$</span>
                        ),
                      }}
                      placeholder="0.00"
                      type="number"
                      defaultValue={balance?.balance}
                      value={settings?.balance}
                      onChange={(e) => setValue('balance', e.target.value)}
                    />
                  </Grid>
                </Stack>
              </Card>
            </Grid>
            <Grid item paddingTop={1} paddingBottom={1} xs={12} md={12} lg={2}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height:'100%' }} md={3}>
                <Grid container sx={{ height:'50%'}} direction="row">
                  <Grid item xs={3} lg={7} sx={{ background: '#1db4a2', display: 'flex' }} alignItems="center" justifyContent="center" padding={0.5}>
                    <Typography variant="caption" sx={{ fontSize: 13, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      STOP WIN
                    </Typography>
                  </Grid>
                  <Grid display="flex" item xs={9} lg={5} alignItems="center" justifyContent="center">
                    <AppTextField
                      name="stopWin"
                      sx={{
                        width: '90%',
                        "& input::placeholder": {
                          fontSize: 13
                        },
                        input: {
                          color: '#777',
                          textAlign: 'center'
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <span style={{ color: '#555' }}>%</span>
                        ),
                      }}
                      placeholder="0.00"
                      type="number"
                      value={settings?.stopWin}
                      onChange={(e) => setValue('stopWin', e.target.value)}
                    />
                  </Grid>
                </Grid>
            <Grid container sx={{ height: '50%' }} direction="row">
                  <Grid item xs={3} lg={7} sx={{ background: '#da4e63', display:'flex' }} alignItems="center" justifyContent="center" padding={0.5}>
                    <Typography variant="caption" sx={{ fontSize: 13, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      STOP LOSS
                    </Typography>
                  </Grid>
                  <Grid display="flex" item xs={9} lg={5} alignItems="center" justifyContent="center">
                    <AppTextField
                      name="stopLoss"
                      sx={{
                        width: '90%',
                        "& input::placeholder": {
                          fontSize: 13
                        },
                        fontWeight: 'bold',
                        input:{
                          color: '#777',
                          textAlign: 'center'
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <span style={{ color: '#555' }}>%</span>
                        ),
                      }}
                      type="number"
                      value={settings?.stopLoss}
                      onChange={(e) => setValue('stopLoss', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item paddingTop={1} paddingBottom={1} paddingLeft={{lg:1}} paddingRight={{xs:1, md:1, lg:1}} xs={6} md={4} lg={2}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height:'100%'  }} md={3}>
                <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height:'100%'}} padding={1}>
                  <Grid sx={{ width:"100%" }} direction="row" alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      Alvo de Lucro
                    </Typography>
                  </Grid>
                  <Grid sx={{ width:'100%', height:'100%', display:'flex'}}>
                    <Typography variant="caption" sx={{ marginTop:1, fontSize: 15, color: '#4a8d8e', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      U$ {((settings?.balance * settings?.stopWin / 100) || 0).toFixed(2)}
                    </Typography>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
            <Grid item paddingTop={1} paddingBottom={1} paddingRight={{lg:1, md:1}} paddingLeft={{xs: 1, md:0, lg:0}} xs={6} md={4} lg={2}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height:'100%'  }} md={3}>
                <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height:'100%'}} padding={1}>
                  <Grid sx={{ width:"100%" }} direction="row" alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      Limite de Perca
                    </Typography>
                  </Grid>
                  <Grid sx={{ width:'100%', height:'100%', display:'flex'}}>
                    <Typography variant="caption" sx={{ marginTop:1, fontSize: 15, color: '#995e73', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      U$ {((settings?.balance * settings?.stopLoss / 100) || 0).toFixed(2)}
                    </Typography>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
            <Grid item paddingTop={1} paddingBottom={1} xs={12} md={4} lg={2}>
               <Card sx={{ marginTop: 1, background: '#2B2440', height:'100%' , width:'100%' }}>
                  <Stack alignItems="flex-start" justifyContent={'center'} padding={1}>
                    <Stack direction="row">
                      <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        Robô
                      </Typography>
                    </Stack>
                  {(bots.length) ? <Select
                    sx={{ width: '100%', fontSize: 14 }}
                    padding={0}
                    value={settings?.bot?.id || setValue('bot', bots.sort((a, b) => a.name.localeCompare(b.name))[0])}
                    label="Bots"
                    size="small"
                    onChange={(e) => {
                      const bot = bots.find((bot) => bot.id === e.target.value)
                      setValue('bot', bot)
                    }}
                  >
                    {bots.sort((a, b) => a.name.localeCompare(b.name)).map((bot) => (
                      <MenuItem sx={{ fontSize: 14 }} key={bot.id} value={bot.id}>
                        {bot.name}
                      </MenuItem>
                    ))}
                  </Select> : null}
                  </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height:'100%' , height:'500px' }} md={3}>  
                <Scrollbars style={{ width: '100%', height: '500px' }}>
                  <CalculatorTable simulation={simulation}/>
                </Scrollbars>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default Calculator;
