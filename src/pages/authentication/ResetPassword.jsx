import { Button, ButtonBase, Divider, Stack, styled, InputAdornment } from "@mui/material"
import AppTextField from "../../components/AppTextField"
import AuthenticationLayout from "./LayoutLogin"
import React from "react"
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  padding: 12,
  marginBottom: 16,
  borderRadius: "8px",
  fontWeight: "500",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down(454)]: {
    width: "100%",
    marginBottom: 8,
  },
}));

const Login = () => { 
  return (
    <AuthenticationLayout
      route="/register"
      description="Novo aqui?"
      title="Entrar"
      routeName="Criar uma conta"
    >
      <form>
        <AppTextField
          sx={{
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
          fullWidth
          placeholder="Digite seu e-mail" />
        <AppTextField
          sx={{
            marginTop:4,
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
          }} 
          fullWidth
          placeholder="Digite sua senha" />
        <Button
          href="/register"
          sx={{
            marginTop:5,
            paddingLeft:2,
            paddingRight:2,
            color:"#999999",
            '&:hover': {
              color: 'text.primary',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          Esqueceu a senha?
        </Button>
        <Button
          fullWidth 
          sx={{
            marginTop:5,
            minHeight:40,
            borderRadius:4,
            fontSize:14,
            fontWeight:'bold',
            background: "linear-gradient(0.25turn, #6cdd60, #2196b6);"
          }}>
          Entrar
        </Button>
      </form>
    </AuthenticationLayout>
  );
};

export default Login;
