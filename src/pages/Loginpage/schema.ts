import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatorio').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});
