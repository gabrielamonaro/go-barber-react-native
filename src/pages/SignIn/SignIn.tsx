import React, { useCallback, useRef } from 'react';
import {Image, View , ScrollView} from 'react-native';
import {Container,Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, FormView} from './styles';
import logoImg from '../../assets/Logo.png';
import {Form} from '@unform/mobile'
import {FormHandles } from '@unform/core'
import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null) //usada para fazer com que o Form execute a funcao do botao

  const handleSignIn = useCallback((data: object) => {
    console.log(data)
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
          <Input name="email" icon="mail" placeholder="E-mail"/>
          <Input name="password" icon="lock" placeholder="Senha"/>
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
