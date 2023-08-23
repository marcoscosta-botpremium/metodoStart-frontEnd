import { Typography, Grid, Stack, Button, CircularProgress, ButtonBase, Divider, Avatar, styled, Card } from "@mui/material"
import Layout from "./layout/Layout"
import React, { useEffect, useState } from "react"
import * as api from '../services/api'
import { ForexSlider } from '../components'
import moment from 'moment'

const Settings = () => {
  const [userInfo, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [boostTrueChecked, setBoostTrueChecked] = useState(localStorage.bootTrue == 'true')

  useEffect(() => {
    api.getUser().then(data => {
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data?.user))
      setIsLoading(false)
    })
  }, [])

  const handleImgUpload = e => {
    e.preventDefault()
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function() {
      const img = reader.result
      setUser(data => ({
        ...data,
        user: {
          ...data.user,
          picture: img.replace('data:image/png;base64,', '')
        }
      }))
      api.setPicture(img).then(() => {

      })
    };
  }

  const handleCheck = e => {
    if (!localStorage.bootTrue) {
      localStorage.setItem('bootTrue', 'true')
      setBoostTrueChecked(localStorage.bootTrue == 'true')
    } else {
      localStorage.bootTrue == 'true' ? localStorage.setItem('bootTrue', 'false') : localStorage.setItem('bootTrue', 'true')
      console.log(localStorage.bootTrue)
      setBoostTrueChecked(localStorage.bootTrue == 'true')
    }
  };
  return (
    <Layout
      title="Mercado"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={3} />
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h5" sx={{ marginTop: 5, fontWeight: 'bold' }}>
            Configurações
          </Typography>
          {(isLoading) ?
            <Grid container sx={{ width: '100%', height: 300 }} alignItems="center" justifyContent="center">
              <CircularProgress sx={{ color: 'white', borderWidth: 0 }} />
            </Grid>
            : <Grid container>
              <Grid padding={1} lg={7} md={12} xs={12}>
                <Card sx={{ background: '#2b2440', width: '100%', padding: 2 }}>
                  <Grid container>
                    <Grid md={3} xs={12}>
                      <Stack alignItems="center">
                        <Avatar src={(userInfo.user?.picture.indexOf('data:image/png;base64,') >= 0) ? userInfo.user?.picture : `data:image/png;base64,${userInfo?.user?.picture}`} sx={{ width: 117, height: 117 }} />
                        <input style={{ display: 'none' }} type="file" onChange={handleImgUpload} id="pictureImg" />
                        <Button
                          sx={{ marginTop: 2, width: '50%', color: '#999', background: '#221c33' }}
                          onClick={() => window.document.getElementById('pictureImg').click()}
                        >
                          Editar
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid md={8} xs={12} sx={{ marginTop: { md: 0, xs: 4 }, marginLeft: { md: 3, xs: 0 } }} justifyContent="center">
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Olá, {userInfo?.user?.nome}
                      </Typography>
                      <Grid container style={{ marginTop: 7 }} direction="row" alignItems="flex-start">
                        <Grid md={6} xs={6}>
                          <Typography variant="body2" sx={{ color: '#999', marginLeft: 1, fontWeight: 'bold' }}>
                            Telefone
                          </Typography>
                        </Grid>
                        <Grid alignItems="flex-end" md={6} xs={6}>
                          <Typography variant="body2" sx={{ marginLeft: 1, textAlign: 'end', fontWeight: 'bold' }}>
                            {(userInfo?.user?.mobile) ? userInfo?.user?.mobile : 'Não informado'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginTop: 7 }} direction="row" alignItems="flex-start">
                        <Grid md={6} xs={6}>
                          <Typography variant="body2" sx={{ color: '#999', marginLeft: 1, fontWeight: 'bold' }}>
                            CPF
                          </Typography>
                        </Grid>
                        <Grid alignItems="flex-end" md={6} xs={6}>
                          <Typography variant="body2" sx={{ marginLeft: 1, textAlign: 'end', fontWeight: 'bold' }}>
                            {(userInfo?.user?.cpf) ? userInfo?.user?.cpf : 'Não informado'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginTop: 7 }} direction="row" alignItems="flex-start">
                        <Grid md={6} xs={3}>
                          <Typography variant="body2" sx={{ color: '#999', marginLeft: 1, fontWeight: 'bold' }}>
                            E-mail
                          </Typography>
                        </Grid>
                        <Grid alignItems="flex-end" md={6} xs={9}>
                          <Typography variant="body2" sx={{ marginLeft: 1, textAlign: 'end', fontWeight: 'bold' }}>
                            {(userInfo?.user?.email) ? userInfo?.user?.email : 'Não informado'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid padding={1} lg={5} md={12} xs={12}>
                <Card sx={{ background: '#2b2440', width: '100%', padding: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Assinatura
                  </Typography>
                  <Grid container style={{ marginTop: 7 }} direction="row" alignItems="flex-start">
                    <Grid md={6} xs={6}>
                      <Typography variant="body2" sx={{ color: '#999', marginLeft: 1, fontWeight: 'bold' }}>
                        Vencimento
                      </Typography>
                    </Grid>
                    <Grid alignItems="flex-end" md={6} xs={6}>
                      <Typography variant="body2" sx={{ marginLeft: 1, textAlign: 'end', fontWeight: 'bold' }}>
                        {(userInfo?.subscription) ? moment(userInfo?.subscription?.endDate).format('DD/MM/YYYY') : 'Não existe'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="flex-start">
                    <Grid md={6} xs={6}>
                      <Typography variant="body2" sx={{ color: '#999', marginLeft: 1, fontWeight: 'bold' }}>
                        Status
                      </Typography>
                    </Grid>
                    <Grid alignItems="flex-end" md={6} xs={6}>
                      <Typography variant="body2" sx={{ marginLeft: 1, color: (userInfo?.subscription?.isActive) ? 'success.main' : 'error.main', textAlign: 'end', fontWeight: 'bold' }}>
                        {(userInfo?.subscription?.isActive) ? 'Ativo' : 'Inativo'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    sx={{
                      width: '100%',
                      marginTop: 5,
                      minHeight: 30,
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 'bold',
                      background: "linear-gradient(0.25turn, #6cdd60, #2196b6);"
                    }}
                    onPress={() => {
                      setIsLoading(true)
                      api.getUser().then(data => {
                        localStorage.setItem('userInfo', JSON.stringify(data?.user))
                      }).then(() => setIsLoading(false))
                    }}>
                    {isLoading ? <CircularProgress sx={{ color: 'white', borderWidth: 0 }} /> : 'Atualizar'}
                  </Button>
                </Card>
              </Grid>
            </Grid>}
        </Stack>
      </Grid>
      {(userInfo?.user?.email) ? <div style={{ position: 'absolute', right: 10, bottom: 0 }}>
        <input type="checkbox" defaultChecked={boostTrueChecked} onClick={handleCheck} />
      </div> : null}
    </Layout>
  );
};

export default Settings;
