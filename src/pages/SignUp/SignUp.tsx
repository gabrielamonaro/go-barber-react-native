import React, {useRef, useCallback} from 'react';
import {Image, View , ScrollView, TextInput, Alert} from 'react-native';
import {Container,Title, BackToSignIn, BackToSignInText, FormView} from './styles';
import logoImg from '../../assets/Logo.png';

import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import {Form } from '@unform/mobile'
import {FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api'

 const SignUp: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null) 

    const handleSignUp = useCallback(async(data: object) => {
      try{
          formRef.current?.setErrors({})
          const schema = Yup.object().shape({
              name: Yup.string().required('Nome obrigatório'),
              email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
              password: Yup.string().min(6, 'No mínimo 6 dígitos').required(),
          })
          await schema.validate(data, {
              abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
          }) //método .validate() vem junto com o Yup quando setamos schema = Yup.object()
          await api.post('/users', data)
          navigation.goBack()
          Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login na aplicação.')

      }
      catch(err)
      {
          let errors
          if (err instanceof Yup.ValidationError){

              console.log(err)
              errors = getValidationErrors(err)
              formRef.current?.setErrors(errors)
            return
            }

            Alert.alert('Erro na autenticação', `Ocorreu um erro ao fazer login, verifique os dados e tente novamente. ${err}`)
          }
  }, [])


    return (
        <>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex:1}}> 
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie sua conta</Title>
          </View>
            
          <FormView>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input 
                ref={emailInputRef}
                name="name" 
                icon="lock" 
                placeholder="Nome"
                autoCorrect={true}
                autoCapitalize='words'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
              }}

              />
              <Input 
                ref={emailInputRef}
                name="email" 
                icon="mail" 
                placeholder="E-mail"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
              }}
              />
              <Input 
                ref={passwordInputRef}
                name="password" 
                icon="lock" 
                placeholder="Senha"
                secureTextEntry  
                textContentType='newPassword' //nao vai tentar pegar alguma senha salva
                //textContentType="OneTimeCode" --> da opcao para preencher automaticamente algum código de validação vindo de SMS
                returnKeyType='send'
                onSubmitEditing={() => {formRef.current?.submitForm()}}
              />
              <Button onPress={() => {formRef.current?.submitForm()}}>Cadastrar</Button>
            </Form>
          </FormView>
    
        </Container>
        <BackToSignIn onPress={()=> navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff"/>
          <BackToSignInText> Voltar </BackToSignInText>
        </BackToSignIn>
        </ScrollView>
        
        </>
      );
}

export default SignUp