import React from 'react';
import {Image, View , ScrollView} from 'react-native';
import {Container,Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from './styles';
import logoImg from '../../assets/Logo.png';

import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
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
      <Input name="email" icon="mail" placeholder="E-mail"/>
      <Input name="password" icon="lock" placeholder="Senha"/>
      <Button onPress={() => {console.log('Deys')}}>Entrar</Button>

      <ForgotPassword onPress={()=> {}}>
        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
      </ForgotPassword>

    </Container>

    <CreateAccountButton onPress={()=> navigation.navigate("SignIn" as never)}>
      <Icon name="log-in" size={20} color="#ff9000"/>
      <CreateAccountButtonText> Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
    </ScrollView>
    
    </>
  );
};

export default SignIn;
