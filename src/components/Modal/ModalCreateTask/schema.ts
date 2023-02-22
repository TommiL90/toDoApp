import * as yup from 'yup'


export const newTaskSchema = yup.object().shape({
    title: yup.string().required('Título obrigatório'),
    description: yup.string().required('Descrição obrigatoria').max(100, 'Máximo 100 caracteres')
})