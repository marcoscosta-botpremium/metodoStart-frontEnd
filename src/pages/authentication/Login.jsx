import { Button, ButtonBase, Alert, styled, InputAdornment } from "@mui/material"
import AppTextField from "../../components/AppTextField"
import AuthenticationLayout from "./LayoutLogin"
import React, { useState } from "react"
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ToggleIcon from 'material-ui-toggle-icon'
import * as api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    setData(dt => ({ ...dt, [e.target.name]: e.target.value }))
  }

  return (
    <AuthenticationLayout
      isLoading={isLoading}
    >
      {(error) ?
        <Alert
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '77%',
            borderRadius: 10,
            paddingRight: 4,
            paddingLeft: 4
          }}
          severity="error">
          {error}
        </Alert> : null}
      <form>
        <AppTextField
          name="user"
          sx={{
            width: '77%',
            marginTop: (error) ? 4 : 0,
            "& input::placeholder": {
              fontSize: 14
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          fullWidth
          placeholder="Digite seu e-mail" />
        <AppTextField
          name="password"
          sx={{
            width: '77%',
            marginTop: 4,
            "& input::placeholder": {
              fontSize: 14
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <ToggleIcon
                  onClick={() => setVisible(visible => !visible)}
                  on={visible}
                  onIcon={<Visibility />}
                  offIcon={<VisibilityOff />}
                />
              </InputAdornment>
            )
          }}
          onChange={handleChange}
          type={visible ? "text" : "password"}
          fullWidth
          placeholder="Digite sua senha" />
        <Button
          href="/forgot"
          sx={{
            width: '77%',
            marginTop: 5,
            paddingLeft: 2,
            paddingRight: 2,
            color: "#999999",
            '&:hover': {
              color: 'text.primary',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          Esqueceu a senha?
        </Button>
        <Button
          fullWidth
          onClick={() => {
            setIsLoading(true)
            setError('')
            api.login(data).then(req => {
              setIsLoading(false)
              if (req.success) {
                localStorage.setItem('accessToken', req.token)
                navigate('dashboard')
              } else {
                setError(req.message)
              }
            })
          }}
          sx={{
            width: '77%',
            marginTop: 5,
            marginBottom: 7,
            minHeight: 40,
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 'bold',
            background: "linear-gradient(0.25turn, #6cdd60, #2196b6);"
          }}>
          Entrar
        </Button>
      </form>
    </AuthenticationLayout>
  );
};

export default Login;
