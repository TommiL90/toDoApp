import * as yup from 'yup'


export const singUpSchema = yup.object().shape({
    name: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('Email obrigatorio').email('Email inválido'),
    password: yup.string().required('Senha obrigatória'),
    repeatPassword: yup.string().required('Senha obrigatória').oneOf([yup.ref('password')], 'Senha precisam ser iguais')
})