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
import { forgotSchema } from '../validation';
import { Container } from './styles';

const ForgotPassword = ({ setActiveContent }) => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    await forgotPassword(data.user);
  };

  return (
    <Container
      variants={variants.opacity}
      animate="visible"
      initial="hidden"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SubTitle variants={variants.itemOpacity}>Recuperar senha</SubTitle>

      <motion.div variants={variants.itemOpacity}>
        <InputControled
          name="user"
          placeholder="Digite seu e-mail"
          type="email"
          error={errors.user}
          control={control}
        />
      </motion.div>

      <Text variants={variants.itemOpacity} onClick={() => setActiveContent(0)}>
        Voltar
      </Text>

      <Button
        loading={isSubmitting}
        variants={variants.itemOpacity}
        type="submit"
      >
        Enviar
      </Button>
    </Container>
  );
};

export default ForgotPassword;
