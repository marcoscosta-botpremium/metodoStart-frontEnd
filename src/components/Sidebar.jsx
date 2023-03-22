import { LinearProgress, Drawer, Typography, Button, Grid, Stack, ListItemButton, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import React from "react"
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import LanguageIcon from '@mui/icons-material/Language'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import CalculateIcon from '@mui/icons-material/Calculate';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom"
import { Logo } from './'

const menu = [
{
    icon: DashboardIcon,
    text:'Dashboard',
    url: '/dashboard'
},
{
    icon: AccountTreeIcon,
    text:'Estratégias',
    url: '/strategies'
},
{
    icon: CalculateIcon,
    text: 'Calculadora',
    url: '/calculator'
},
{
    icon: AnalyticsIcon,
    text: 'Gerenciamento',
    url: '/reports'
},
{
    icon: SettingsIcon,
    text: 'Configurações',
    url: '/settings'
},
{
    icon: LanguageIcon,
    text: 'Ajuda',
    url: '/help'
},
{
    icon: LogoutIcon,
    text: 'Sair',
    url:'/login',
    action: async () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('tokenList')
    }
}
]

export const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <Stack alignItems="center">
          <Logo/>
          {menu.map((item, index) => (
            <ListItemButton
              onClick={() => (item?.action) ? item.action().then(() => navigate(item.url)):navigate(item.url)}
              sx={{
                width:'77%',
                marginTop: 3,
                minHeight: 40,
                borderRadius: 4,
                background: (window.location.pathname == item.url) ? "linear-gradient(0.25turn, #6cdd60, #2196b6);":"transparent",
                justifyContent: 'flex-start',
                display:(item?.onlyDesktop) ? {xs:'none', sm:'none', md:'flex'}:'flex'
              }}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText>
                {item.text}
              </ListItemText>
            </ListItemButton>
          ))}
        </Stack>
    )
}