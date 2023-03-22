import { Typography, Grid, Stack, Button, Card, TextField, Collapse } from "@mui/material"
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from "./layout/Layout"
import React, { useEffect, useState, useContext } from "react"
import * as api from '../services/api'
import ReportsTable from '../components/ReportsTable'
import { ForexSlider } from '../components'
import AppTextField from '../components/AppTextField'
import { BotContext } from "../contexts/BotContext"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs"
import { styled } from '@mui/material/styles';
import "dayjs/locale/pt-br";
import Scrollbars from "react-custom-scrollbars";


const Reports = () => {
  const { balance, bots } = useContext(BotContext)
  const [userInfo, setUser] = useState({})
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [expanded, setExpanded] = React.useState(false);
  const [saved, setSaved] = useState(true)
  const [calculated, setCalculated] = useState({
    calculatedProfit: 0,
    calculatedLoss: 0,
  })
  const [settings, setSettings] = useState({
    balance: balance,
    stopGain: 0,
    stopLoss: 0,
  })
  const [management, setManagement] = useState([])

  const saveManagement = () => {
    api.saveManagement(settings).then(data => {
      setManagement(mng => {
        return [
          ...mng.filter(tm => tm.id != data.data.id),
          {...data.data, stopLoss:calculated?.calculatedLoss, stopGain:calculated?.calculatedProfit}
        ].sort((a, b) => b.id - a.id)
      })
      setSaved(true)
    })
  }

  const setValue = (field, value) => {
    setSaved(false)
    setSettings({
      ...settings,
      [field]: value
    })
  }

  useEffect(() => {
    setValue('balance', balance?.balance)
  }, [balance])

  useEffect(() => {
    if(!settings.calculatedLoss && !settings.calculatedProfit){
      setCalculated({
        calculatedProfit: (settings.stopGain) ? (settings.balance * (settings.stopGain / 100)):0 ,
        calculatedLoss: (settings.stopLoss) ? (settings.balance * (settings.stopLoss / 100)):0,
      })
      if(management.length){
        const data = management.reduce(function (prev, curr) {
          return prev.id > curr.id ? prev : curr
        })
        setManagement(mng => {
          return [
            ...mng.filter(tm => tm.id != data.id),
            { ...data, stopLoss: calculated?.calculatedLoss, stopGain: calculated?.calculatedProfit }
          ].sort((a, b) => b.id - a.id)
        })
      }
    }
  }, [settings])

  useEffect(() => {
    api.getUser().then(data => {
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data?.user))
    })
    let start = startDate.format('DD/MM/YYYY')
    let end = endDate.format('DD/MM/YYYY')
    api.getManagement(start, end).then(data => {
      setManagement(data.sort((a, b) => dayjs(b.date, 'DD/MM/YYYY') > dayjs(a.date, 'DD/MM/YYYY')))
    })
    api.getManagement().then(data => {
      setSettings(data)
    })
  }, [])

  useEffect(() => {
    let start = startDate.format('DD/MM/YYYY')
    let end = endDate.format('DD/MM/YYYY')
    api.getManagement(start, end).then(data => {
      setManagement(data.sort((a, b) => dayjs(b.date, 'DD/MM/YYYY') > dayjs(a.date, 'DD/MM/YYYY')))
    })
  }, [startDate, endDate])

  const updateField = (item, e) => {
    setManagement(management => {
      const newData = { ...item, [e.target.name]: e.target.value }
      const oldData = management.filter(tm => item.id != tm.id)
      return [newData, ...oldData]  
    })
  }

  return (
    
    <Layout
      title="Mercado"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={4} />
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h5" sx={{ marginTop: 5, fontWeight: 'bold' }}>
            Gerenciamento
          </Typography> 
          <Grid container sx={{ width: '100%' }} direction="row">
            <Grid item xs={12} paddingTop={1} paddingBottom={1} md={4} lg={2}>
              <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height: '100%' }} padding={1}>
                  <Grid sx={{ width: "100%" }} direction="row" alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                      Valor Inicial
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: '100%', height: '100%', display: 'flex' }} alignItems="flex-end">
                    <AppTextField
                      name="startValue"
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
                        inputProps: { min: 1}
                      }}
                      placeholder="0.00"
                      type="number"
                      value={settings?.balance}
                      onChange={(e) => {
                        if (Number(e.target.value) > 1) {
                          setValue('balance', e.target.value)
                          setManagement(mng => (
                            [
                              ...mng.filter(tm => tm.id != mng[0].id),
                              { ...mng[0], balance: e.target.value }
                            ]
                          ))
                        }else{
                          setValue('balance', 1)
                          setManagement(mng => (
                            [
                              ...mng.filter(tm => tm.id != mng[0].id),
                              { ...mng[0], balance: 1 }
                            ]
                          ))
                        }
                      }}
                    />
                  </Grid>
                </Stack>
              </Card>
            </Grid>
              <Grid item paddingTop={1} paddingBottom={1} padding={{lg:1, md:1, }} xs={12} md={4} lg={2}>
                <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                  <Grid container sx={{ height: '50%' }} direction="row">
                    <Grid item xs={3} lg={7} sx={{ background: '#1db4a2', display: 'flex' }} alignItems="center" justifyContent="center" padding={0.5}>
                      <Typography variant="caption" sx={{ fontSize: 13, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        STOP WIN
                      </Typography>
                    </Grid>
                    <Grid display="flex" item xs={9} lg={5} alignItems="center" justifyContent="center">
                      <AppTextField
                        name="stopGain"
                        sx={{
                          width: '90%',
                          "& input::placeholder": {
                            fontSize: 13
                          },
                          fontWeight: 'bold',
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
                        type="number"
                        value={settings?.stopGain}
                        onChange={(e) => setValue('stopGain', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ height: '50%' }} direction="row">
                    <Grid item xs={3} lg={7} sx={{ background: '#da4e63', display: 'flex' }} alignItems="center" justifyContent="center" padding={0.5}>
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
                        type="number"
                        value={settings?.stopLoss}
                        onChange={(e) => setValue('stopLoss', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item paddingTop={1} paddingBottom={1} padding={{ lg: 1, md: 1, }} paddingRight={{ xs: 1, md: 0 }} xs={6} md={4} lg={2}>
                <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                  <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height: '100%' }} padding={1}>
                    <Grid sx={{ width: "100%" }} direction="row" alignItems="center">
                      <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        Alvo de Lucro
                      </Typography>
                    </Grid>
                    <Grid sx={{ width: '100%', height: '100%', display: 'flex' }}>
                      <Typography variant="caption" sx={{ marginTop: 1, fontSize: 15, color: '#4a8d8e', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        {new Intl.NumberFormat('pt-BR', {style: 'currency', currencyDisplay:'code', currency: 'USD' }).format(calculated?.calculatedProfit).replace('USD', '$')}
                      </Typography>
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
              <Grid item paddingTop={1} paddingBottom={1} padding={{lg:1, md:1 }} paddingLeft={{ xs:1, md:0}} xs={6} md={4} lg={2}>
                <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                  <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height: '100%' }} padding={1}>
                    <Grid sx={{ width: "100%" }} direction="row" alignItems="center">
                      <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        Limite de Perca
                      </Typography>
                    </Grid>
                    <Grid sx={{ width: '100%', height: '100%', display: 'flex' }}>
                      <Typography variant="calculatedLoss" sx={{ marginTop: 1, fontSize: 15, color: '#995e73', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        {new Intl.NumberFormat('pt-BR', {style: 'currency', currencyDisplay:'code', currency: 'USD' }).format(calculated?.calculatedLoss).replace('USD', '$')}
                      </Typography>
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
              <Grid item paddingTop={1} paddingBottom={1} padding={{lg:1, md:1, }} xs={12} md={4} lg={2}>
                <Card sx={{ marginTop: 1, background: '#2B2440', height: '100%' }} md={3}>
                  <Stack alignItems="flex-start" justifyContent={'center'} sx={{ height: '100%' }} padding={1}>
                    <Grid sx={{ width: "100%" }} direction="row" alignItems="center">
                      <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                        Confirmação
                      </Typography>
                    </Grid>
                    <Stack sx={{ width: '100%', height: '100%'}} justifyContent="flex-end">
                      {saved ? 
                        <Button disabled sx={{ width: '100%', background: '#555', color:'#999', borderRadius: 17 }}>
                          <Card sx={{ width: '100%', background: '#555', paddingTop: 0.5, paddingBottom: 0.5 }}>
                            Confirmado
                          </Card>
                        </Button>
                      :<Button onClick={saveManagement} sx={{ width: '100%', background: '#1db4a2', borderRadius: 17 }}>
                        <Card sx={{ width: '100%', background: '#1db4a2', paddingTop: 0.5, paddingBottom: 0.5 }}>
                          Salvar
                        </Card>
                      </Button>}
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item paddingTop={1} paddingBottom={1} xs={12} md={4} lg={2}>
                <Card sx={{ marginTop:1, paddingRight:1, paddingLeft:1, background: '#2B2440', height: '100%' }} md={3}>
                  <Stack sx={{ width:'100%', height:'100%'}} justifyContent="center">
                    <Button sx={{ width: '100%' }} onClick={() => {
                      let start = startDate.format('DD/MM/YYYY')
                      let end = endDate.format('DD/MM/YYYY')
                      let anchor = document.createElement("a");
                      document.body.appendChild(anchor);
                      let file = `https://api.botpremium.com.br/api/history/excel/?start=${start}&end=${end}`;

                      let headers = new Headers();
                      headers.append('Authorization', 'Token '+localStorage.getItem('accessToken'));

                      fetch(file, { headers })
                        .then(response => response.blob())
                        .then(blobby => {
                          let objectUrl = window.URL.createObjectURL(blobby);

                          anchor.href = objectUrl;
                          anchor.download = `${start}_${end}_operacoes.xlsx`;
                          anchor.click();

                          window.URL.revokeObjectURL(objectUrl);
                        });
                    }}>
                      <Card sx={{ background: '#211c32', width: '100%', paddingLeft: 1, paddingRight: 1 }}>
                        Baixar Planilha
                      </Card>
                    </Button>
                  </Stack>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ marginTop: 1, padding:1, background: '#2B2440', }}>
                  <IconButton
                    expand={expanded}
                    onClick={() => setExpanded(exp => !exp)}
                    aria-expanded={expanded}
                    aria-label="Mostrar datas"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  <Collapse in={expanded} timeout="auto">
                    <Grid sx={{ paddingTop:1, paddingBottom:1}}>
                      <DatePicker
                        sx={{ maxHeight: '30px' }}
                        disableFuture
                        label="Início"
                        openTo="day"
                        views={['year', 'month', 'day']}
                        value={startDate}
                        inputFormat="DD/MM/YYYY"
                        onChange={(newDate) => {
                          setStartDate(newDate);
                        }}
                        renderInput={(params) => <TextField size="small" {...params} />}
                      />
                      <DatePicker
                        disableFuture
                        label="Fim"
                        openTo="day"
                        size="small"
                        views={['year', 'month', 'day']}
                        value={endDate}
                        inputFormat="DD/MM/YYYY"
                        onChange={(newDate) => {
                          setEndDate(newDate);
                        }}
                        renderInput={(params) => <TextField size="small" {...params} />}
                      />
                    </Grid>
                  </Collapse>
              </Card>
              <Card sx={{ width:'100%', marginTop: 1, background: '#2B2440', height: '500px' }} md={3}>
                <Scrollbars style={{ width:'100%', height: '500px'}}>
                  <ReportsTable data={management} updateField={updateField} />
                </Scrollbars>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      </LocalizationProvider>
    </Layout>
  );
};

export default Reports;
