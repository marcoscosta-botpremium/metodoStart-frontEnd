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
import { recoverPasswoordSchema } from '../validation';
import { Container } from './styles';

const RecoverPassword = ({ code }) => {
  const navigate = useNavigate();
  const { recoverPassword } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(recoverPasswoordSchema),
  });

  const onSubmit = async (data) => {
    await recoverPassword(data, code, navigate);
  };

  return (
    <Container
      variants={variants.opacity}
      animate="visible"
      initial="hidden"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SubTitle variants={variants.itemSlide}>Digite sua nova senha</SubTitle>

      <motion.div variants={variants.itemSlide}>
        <InputControled
          password
          name="password"
          placeholder="Digite sua senha"
          error={errors.password}
          control={control}
        />
      </motion.div>

      <motion.div variants={variants.itemSlide}>
        <InputControled
          password
          name="password2"
          placeholder="Confirme sua senha..."
          error={errors.password2}
          control={control}
        />
      </motion.div>

      <Text variants={variants.itemSlide} onClick={() => navigate('login')}>
        Voltar para login
      </Text>

      <Button
        loading={isSubmitting}
        variants={variants.itemSlide}
        type="submit"
      >
        Alterar
      </Button>
    </Container>
  );
};

export default RecoverPassword;
