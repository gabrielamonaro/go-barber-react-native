import React, { useCallback, useRef } from 'react';
import {Image, View , ScrollView, TextInput, Alert} from 'react-native';
import {Container,Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, FormView} from './styles';
import logoImg from '../../assets/Logo.png';
import {Form} from '@unform/mobile'
import {FormHandles } from '@unform/core'
import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData{
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null) //usada para fazer com que o Form execute a funcao do botao

  const passwordInputRef = useRef<TextInput>(null)

  const handleSignIn = useCallback(async(data: object) => {
    try{
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'Senha obrigatória')
        })
        await schema.validate(data, {
            abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
        }) //método .validate() vem junto com o Yup quando setamos schema = Yup.object()

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
          Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique os dados e tente novamente.')

    }
}, [])


  const navigation = useNavigation()
  return (
    <>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flex:1}}> 
    <Container>
      <Image source={logoImg} />
      <View>
        <Title>Faça seu logon</Title>
      </View>

      <FormView>
        <Form onSubmit={handleSignIn} ref={formRef}>
          <Input 
            name="email" 
            icon="mail" 
            keyboardType="email-address"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType='next'
            onSubmitEditing={() => {
                passwordInputRef.current?.focus()
            }}
          />
          <Input
            ref={passwordInputRef} 
            name="password" 
            secureTextEntry //campo password - nao precisa colocar capitalize e fica com bolinhas
            icon="lock" 
            placeholder="Senha"
            returnKeyType='send' //tipo de botao do final do teclado (mas nao tem ação)
            onSubmitEditing={() => {formRef.current?.submitForm()}}  //acao do botao acima
          />

          <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button> 
        </Form>
      </FormView>
      
      <ForgotPassword onPress={()=> {}}>
        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
      </ForgotPassword>

    </Container>

    <CreateAccountButton onPress={()=> navigation.navigate("SignUp" as never)}>
      <Icon name="log-in" size={20} color="#ff9000"/>
      <CreateAccountButtonText> Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
    </ScrollView>
    
    </>
  );
};

export default SignIn;