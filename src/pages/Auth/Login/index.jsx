import { yupResolver } from '@hookform/resolvers/yup';

import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/index';
import InputControled from '../../../components/InputControled/index';
import { useAuth } from '../../../contexts/auth';
import { SubTitle, Text } from '../../../styles/global';
import { variants } from '../../../utils/motionConfig';
import { loginSchema } from '../validation';
import { Container } from './styles';

const Login = ({ setActiveContent }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await login(data, navigate);
  };

  return (
    <Container
      variants={variants.opacity}
      animate="visible"
      initial="hidden"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SubTitle variants={variants.itemSlide}>Bem Vindo</SubTitle>

      <motion.div variants={variants.itemSlide}>
        <InputControled
          name="user"
          placeholder="Digite seu e-mail"
          type="email"
          error={errors.user}
          control={control}
        />
      </motion.div>

      <motion.div variants={variants.itemSlide}>
        <InputControled
          variants={variants.itemSlide}
          password
          name="password"
          placeholder="Digite sua senha"
          error={errors.password}
          control={control}
        />
      </motion.div>

      <Text variants={variants.itemSlide} onClick={() => setActiveContent(1)}>
        Esqueceu sua senha ?
      </Text>

      <Button
        loading={isSubmitting}
        variants={variants.itemSlide}
        type="submit"
      >
        Entrar
      </Button>
      <div style={{
        textAlign: 'center',
        paddingLeft: '2%',
        paddingRight: '2%',
        fontSize: 8,
        position: 'absolute',
        bottom: 5,
      }}>Os produtos oferecidos pela Deriv oferece derivativos complexos como opções e contratos por diferença ("CFDs"). Estes produtos podem não ser adequados para todos os clientes, e sua comercialização envolve riscos para você. Certifique-se de compreender os seguintes riscos antes de negociar produtos derivados: a) você pode perder parte ou todo o dinheiro investido na negociação, b) se sua negociação envolver conversão de moeda, as taxas de câmbio afetarão seus lucros e perdas. Nunca se deve negociar com dinheiro emprestado ou dinheiro que não se pode perder.</div>
    </Container>
  );
};

export default Login;
