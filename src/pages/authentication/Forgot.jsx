import { Button, ButtonBase, Alert, styled, InputAdornment, Typography } from "@mui/material"
import AppTextField from "../../components/AppTextField"
import AuthenticationLayout from "./LayoutLogin"
import React, { useState } from "react"
import Email from '@mui/icons-material/Email'
import * as api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const Forgot = () => {
  const navigate = useNavigate()  
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
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
          {error ? error: null}
        </Alert> : null}
      {(success) ?
        <Alert
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '77%',
            borderRadius: 10,
            paddingRight: 4,
            paddingLeft: 4
          }}
          severity="success">
          {success ? success: null}
        </Alert> : null}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ width: '80%' }} variant="subtitle1">
          Você receberá um e-mail para definir uma nova senha.
        </Typography>
      </div>
      <form>
        <AppTextField
          name="email"
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
                <Email />
              </InputAdornment>
            )
          }}
          error={error ? true : false}
          onChange={handleChange}
          type={'text'}
          fullWidth
          placeholder="Digite seu e-mail" />
        <Button
          href="/login"
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
          Lembrou a senha?
        </Button>
        <Button
          fullWidth
          onClick={() => {
            setIsLoading(true)
            setError('')
            api.forgot(data?.email).then(req => {
              setIsLoading(false)
              if (req.success) {
                setSuccess('Um e-mail foi enviado para você com as instruções para redefinir sua senha.')
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
          Enviar agora
        </Button>
      </form>
    </AuthenticationLayout>
  );
};

export default Forgot;
