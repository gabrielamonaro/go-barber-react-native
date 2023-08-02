import React, {useRef, useCallback} from 'react';
import {Image, View , ScrollView} from 'react-native';
import {Container,Title, BackToSignIn, BackToSignInText, FormView} from './styles';
import logoImg from '../../assets/Logo.png';

import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import {Form } from '@unform/mobile'
import {FormHandles } from '@unform/core'

 const SignUp: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const handleSignUp = useCallback((data: object) => { //para pegar os dados vindos do submit
      console.log(data)
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
              <Input name="user" icon="lock" placeholder="Nome"/>
              <Input name="email" icon="mail" placeholder="E-mail"/>
              <Input name="password" icon="lock" placeholder="Senha"/>
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