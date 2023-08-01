import React from 'react';
import {Image, View , ScrollView} from 'react-native';
import {Container,Title, BackToSignIn, BackToSignInText} from './styles';
import logoImg from '../../assets/Logo.png';

import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

 const SignUp: React.FC = () => {
    const navigation = useNavigation()
    
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
          <Input name="user" icon="lock" placeholder="Nome"/>
          <Input name="email" icon="mail" placeholder="E-mail"/>
          <Input name="password" icon="lock" placeholder="Senha"/>
          <Button onPress={() => {console.log('Deys')}}>Cadastrar</Button>

    
        </Container>
        <BackToSignIn onPress={()=> navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff"/>
          <BackToSignInText> Criar uma conta</BackToSignInText>
        </BackToSignIn>
        </ScrollView>
        
        </>
      );
}

export default SignUp