import React, { useEffect } from 'react';
import { View, ActivityIndicator, useColorScheme, Appearance} from 'react-native';
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
import LottieView from 'lottie-react-native'
import { DrawerContent } from './screens/DrawerContent';
import{ MainTabScreen }from './screens/MainTabScreen';
import{ SupportScreen }from './screens/SupportScreen';
import{ SettingsScreen }from './screens/SettingsScreen';
import {NoteScreen} from './screens/NoteScreen';
import {FishScreen} from './screens/FishScreen';
import {HomeScreen} from './screens/HomeScreen';
import { AuthContext } from './components/context';
import { RootStackScreen }from './screens/RootStackScreen';

import { AquariumVolume }from './calculators/AquariumVolume';
import { CO2Level }from './calculators/CO2Level';
import { AquariumWater }from './calculators/AquariumWater';
import {WaterBalance }from './calculators/WaterBalance';

import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from "./screens/ProfileScreen";
import Users from "./model/users";
import { useTheme } from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native'
const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
    const { colors } = useTheme();
    const [isDarkTheme, setIsDarkTheme] = React.useState(Appearance.getColorScheme() === "dark")

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
            background: '#F2F2F2',
            background2: '#FCFCFC',
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
            background: '#010101',
            background2: '#171717',
            backgroundOpacity: 'rgba(0,36,33, 0.5)',
            text: '#EEEEEE'
        }
    }

    let theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

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
            const userToken = String(foundUser[0].userToken);
            const userName = foundUser[0].username;
            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async() => {
            try {
                await AsyncStorage.removeItem('userToken');
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {

        },
        toggleTheme: () => {
            //setIsDarkTheme(isDarkTheme => !isDarkTheme)
            setIsDarkTheme(Appearance.getColorScheme() === "dark")
        }
    }), []);

    useEffect(() => {
      
        setTimeout(async() => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch(e) {
                console.log(e);
            }
            console.log('user token: ', userToken);
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 0);
    }, []);


    useEffect(() => {
        setInterval(() =>{authContext.toggleTheme()}, 1)
    }, [])

    if( loginState.isLoading ) {
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center', backgroundColor: "white"}}>
              <ActivityIndicator size="large"/>
                 <LottieView source={require('./components/6729-fish.json')} autoPlay loop/>
            </View>
        );
    }

    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer theme={theme}>
                    { loginState.userToken === null ?
                            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                              <Drawer.Screen name="FishScreen" component={FishScreen} />
                                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                                <Drawer.Screen name="Profile" component={ProfileScreen} />
                                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                                <Drawer.Screen name="NoteScreen" component={NoteScreen} />


                                <Drawer.Screen name="AquariumVolume" component={AquariumVolume} />
                                <Drawer.Screen name="CO2Level" component={CO2Level} />
                                <Drawer.Screen name="AquariumWater" component={AquariumWater} />
                                <Drawer.Screen name="WaterBalance" component={WaterBalance} />
                            </Drawer.Navigator>
                        : <RootStackScreen/>
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    )
}
export default App;
