import {ValidationError} from 'yup'

interface Errors{
    [key: string]: string //a chave do objeto pode ser qualquer coisa
}

export default function getValidationErrors(err: ValidationError){
 
    const validationErrors: Errors = {}

        err.inner.forEach(error => {
         if(error.path){
            validationErrors[error.path] = error.message
        }
})
 
    return validationErrors 
}