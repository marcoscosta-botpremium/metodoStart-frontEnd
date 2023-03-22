import * as yup from 'yup';

const msg = {
  requered: 'Este campo é obrigatorio',
};

export const loginSchema = yup.object().shape({
  user: yup.string().required(msg.requered),
  password: yup.string().required(msg.requered),
});

export const forgotSchema = yup.object().shape({
  user: yup.string().required(msg.requered),
});

export const recoverPasswoordSchema = yup.object().shape({
  password: yup.string().required(msg.requered),
  password2: yup
    .string()
    .when('password', (password, field) =>
      password ? field.required().oneOf([yup.ref('password')]) : field
    ),
});
