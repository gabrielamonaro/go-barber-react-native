import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback} from 'react'
//useImperativeHandle é um hook que serve para passar uma funcionalidade/funcao de um componente interno para um componente pai

import { Container, TextInput, Icon } from './styles'
import {useField} from '@unform/core'
import {TextInputProps} from 'react-native'

interface InputProps extends TextInputProps{
    name: string
    icon: string //no react native icones sao recebidos como string
}

interface InputValueReference{
    value: string
}

interface InputRef{
    focus(): void
}
//React.FC por padrao nao recebe uma referencia
//usamos outra tipagem para receber a referencia

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> //InputRef sendo o tipo de ref  
    = ({name, icon, ...rest}, ref) => {
    const inputElementRef = useRef<any>(null)
    
    const {registerField, defaultValue, fieldName, error} = useField(name) //informacoes para cadastrar as informacos do input dentro do unform
    const inputValueRef = useRef<InputValueReference>({value: defaultValue})

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    },[])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsFilled(!!inputValueRef.current.value) //if(inputValueRef.current.value) then setIsFilled(true) else setIsFilled(false)
        
    },[])

    useImperativeHandle(ref, () => ({   //esse metodo vai injetar focus dentro da ref que está sendo passada pelo componente Input --> a ref está no componente pai. Fazemos isso porque o componente pai sempre vai ser algo nao especifico
        focus() {
            inputElementRef.current.focus()
        },
    }))

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: string){
                inputValueRef.current.value = value
                inputElementRef.current.setNativeProps({text: value})
            },
            clearValue(){
                inputValueRef.current.value = ''
                inputElementRef.current.clear()
            }
        })
    }, [fieldName, registerField])

    return (<Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}> 

        <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : "#666360"}/>
        
        <TextInput  
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputElementRef}
            keyboardAppearance='dark'
            defaultValue={defaultValue}
            onChangeText={value => {
                inputValueRef.current.value = value //colocando o texto digitado dentro da variavel value
            }}
            placeholderTextColor="#666360"
            {...rest}
        />
    </Container>)
}

export default forwardRef(Input)