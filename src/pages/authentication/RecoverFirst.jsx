import { Button, ButtonBase, Alert, styled, InputAdornment, Typography } from "@mui/material"
import AppTextField from "../../components/AppTextField"
import AuthenticationLayout from "./LayoutLogin"
import React, { useState } from "react"
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ToggleIcon from 'material-ui-toggle-icon'
import * as api from '../../services/api'
import { useNavigate, useLocation } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search);

const RecoverFirst = () => {
  const query = useQuery()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
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
          {error ? error?.code ? error?.code[0]: null:null}
        </Alert> : null}
      <div style={{display:'flex', justifyContent:'center'}}>
        <Typography sx={{ width: '80%' }} variant="subtitle1">
          Antes de iniciar sua jornada, precisamos que você crie uma senha para sua conta.
        </Typography>
      </div>
      <form>
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
                  onClick={() => setVisible2(visible => !visible)}
                  on={visible}
                  onIcon={<Visibility />}
                  offIcon={<VisibilityOff />}
                />
              </InputAdornment>
            )
          }}
          error={error?.password1 ? true : false}
          helperText={error?.password1 ? error?.password1[0] : null}
          onChange={handleChange}
          type={visible2 ? "text" : "password"}
          fullWidth
          placeholder="Digite sua senha" />
        <AppTextField
          name="password2"
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
          error={error?.password2 ? true : false}
          helperText={error?.password2 ? error?.password2[0] : null}
          onChange={handleChange}
          type={visible ? "text" : "password"}
          fullWidth
          placeholder="Confirme sua senha" />
        <Button
          fullWidth
          onClick={() => {
            setIsLoading(true)
            setError('')
            console.log(query)
            api.recover({ ...data, code:query.get('code')}).then(req => {
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
          Confirmar senha
        </Button>
      </form>
    </AuthenticationLayout>
  );
};

export default RecoverFirst;
