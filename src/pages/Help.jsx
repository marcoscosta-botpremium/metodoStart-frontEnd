import { Typography, Grid, Stack, Button, CircularProgress, Accordion, AccordionSummary, AccordionDetails, ButtonBase, Divider, Avatar, styled, Card, Input } from "@mui/material"
import Layout from "./layout/Layout"
import React, { useEffect, useState } from "react"
import * as api from '../services/api'
import { ForexSlider } from '../components'
import moment from 'moment'
import { ExpandMore } from "@material-ui/icons"

const Help = () => {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [article, setArticle] = useState(null)
  const [userInfo, setUser] = useState({})

  const selectedArticle = (id) => {
    return article?.id == id
  }
  useEffect(() => {
    api.getUser().then(data => {
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data?.user))
    })
    api.getTopics().then(data => {
      setTopics(data.topics)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {

  }, [article])
  
  return (
    <Layout
      title="Mercado"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={2}/>
        <Stack alignItems="flex-start" spacing={2}>
          <Stack sx={{ marginTop: 5, width:'100%' }} alignItems="center" justifyContent="center" direction="row">
            <Grid md={4} xs={12}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Ajuda
              </Typography>
            </Grid>
            <Grid md={8} xs={12}>
              {/* <Card sx={{ background: '#2b2440', paddingX:2, paddingY:0.3 }}>
                <Input sx={{ width: '100%' }} onChange={() => api.getArticles()} disableUnderline variant="" placeholder="Buscar na Central de Ajuda" />
              </Card> */}
            </Grid>
          </Stack>
          {(isLoading) ? 
          <Grid container sx={{ width:'100%', height:300}} alignItems="center" justifyContent="center">
            <CircularProgress sx={{ color: 'white', borderWidth: 0 }} />
          </Grid>
          :<Grid container>
            <Grid padding={1} lg={3} md={12} xs={12}>
              <Stack alignItems="center">
                {topics.map((item, index) => (
                  <Accordion
                    sx={{ width: '100%' }}
                  >
                    <Accordion>
                      <Card sx={{ width: '100%', background: '#2b2440' }}>
                        <AccordionSummary
                          expandIcon={<ExpandMore/>}>
                          <Button sx={{ width: '100%' }}>
                              <Grid paddingTop={1} paddingBottom={1}>
                                <Typography>
                                  {item?.title}
                                </Typography>
                              </Grid>
                          </Button>
                        </AccordionSummary>
                      </Card>
                      <Divider/>
                      <AccordionDetails sx={{ padding:0 }}>
                        <Card sx={{ width:'100%', background: '#2b2440', borderTopLeftRadius:0, borderTopRightRadius:0 }}>
                          <Stack alignItems="center">
                            {item.articles?.map((itm, index) => (
                              <Button sx={{ width: '95%', marginTop:1, marginBottom:1 }} onClick={() => setArticle(itm)}> 
                                <Typography sx={{ textAlign:'flex-start', color:(selectedArticle(itm?.id) ? '#fff':'#999') }}>
                                  {itm?.title}
                                </Typography>
                              </Button>
                            ))}
                          </Stack>
                        </Card>
                      </AccordionDetails>
                    </Accordion>
                  </Accordion>
                ))}
              </Stack>
            </Grid>
            <Grid padding={1} lg={9} md={12} xs={12}>
              <Card sx={{ background: '#2b2440', width: '100%', padding: 2 }}>
                  <div dangerouslySetInnerHTML={{ __html: article?.body }}>
                  </div>
              </Card>
            </Grid>
          </Grid>}
        </Stack>
      </Grid>
    </Layout>
  );
};

export default Help;
