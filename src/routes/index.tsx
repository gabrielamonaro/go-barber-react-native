import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

const Auth = createStackNavigator() 

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        screenOptions={
            {
                headerShown: false,
                cardStyle: {backgroundColor: '#312e38'}
            }
        }
        initialRouteName='SignIn'
    >
        <Auth.Screen name="SignIn" component={SignIn}/>
        <Auth.Screen name="SignUp" component={SignUp}/>
    </Auth.Navigator>
)

export default AuthRoutes