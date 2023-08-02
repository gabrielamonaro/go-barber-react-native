import React, { useEffect, useRef } from 'react'
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

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
    const inputElementRef = useRef<any>(null)
    
    const {registerField, defaultValue, fieldName, error} = useField(name) //informacoes para cadastrar as informacos do input dentro do unform
    const inputValueRef = useRef<InputValueReference>({value: defaultValue})

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

    return (<Container> 
        <Icon name={icon} size={20} color="#666360"/>
        <TextInput  
            // ref={inputElementRef}
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

export default Input
