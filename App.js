import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';
import{ MainTabScreen }from './screens/MainTabScreen';
import{ SupportScreen }from './screens/SupportScreen';
import{ SettingsScreen }from './screens/SettingsScreen';
import{ BookMarksScreen }from './screens/BookMarksScreen';
import{ FishScreen }from './screens/FishScreen';

import { AuthContext } from './components/context';

import { RootStackScreen }from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null);

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            background2: '#E9EAEC',
            backgroundOpacity: 'rgba(0,73,67, 0.5)',
            text: '#333333'
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#000',
            background2: '#333333',
            backgroundOpacity: 'rgba(0,36,33, 0.5)',
            text: '#ffffff'
        }
    }

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const loginReducer = (prevState, action) => {
        switch( action.type ) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async(foundUser) => {
            // setUserToken('fgkj');
            // setIsLoading(false);
            const userToken = String(foundUser[0].userToken);
            const userName = foundUser[0].username;

            try {
                await AsyncStorage.setItem('userToken', userToken);
              //  await AsyncStorage.setItem('f', 123);
            } catch(e) {
                console.log(e);
            }
            //console.log('user token: ', userToken);
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async() => {
            // setUserToken(null);
            // setIsLoading(false);
            try {
                await AsyncStorage.removeItem('userToken');
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
            // setUserToken('fgkj');
            // setIsLoading(false);
        },
        toggleTheme: () => {
            setIsDarkTheme( isDarkTheme => !isDarkTheme );
        }
    }), []);

    useEffect(() => {
        setTimeout(async() => {
            // setIsLoading(false);
            let userToken;
            userToken = null;
           // let f;
           // f = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
               // f = await AsyncStorage.getItem('f');
            } catch(e) {
                console.log(e);
            }
           // console.log('f: ', f);
            console.log('user token: ', userToken);
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
    }, []);

    if( loginState.isLoading ) {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer theme={theme}>
                    { loginState.userToken !== null ? (
                            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                                <Drawer.Screen name="BookMarksScreen" component={BookMarksScreen} />
                                { /*  <Drawer.Screen name="FishScreen" component={FishScreen} />*/}
                            </Drawer.Navigator>
                        )
                        :
                        <RootStackScreen/>
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    );
}

export default App;
