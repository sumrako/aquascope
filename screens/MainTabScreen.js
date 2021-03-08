import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {HomeScreen} from "./HomeScreen";
import {DetailsScreen} from "./DetailScreen";
import {CalculatorScreen} from "./CalculatorScreen";
import {ProfileScreen} from "./ProfileScreen";
import { useTheme } from '@react-navigation/native';
import {FishScreen} from "./FishScreen";
const HomeStack = createStackNavigator()
const DetailsStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export const MainTabScreen = () => {
    const theme = useTheme();
   return  (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{backgroundColor: 'tomato'}}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Аквариум',
                    tabBarColor: theme.dark ? '#004943' : '#009387',
                    tabBarIcon: ({color}) => (
                        /* <Icon name="ios-home" color={color} size={26} />*/
                        <MaterialCommunityIcons name="fishbowl" color={color} size={25}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={DetailsStackScreen}
                options={{
                    tabBarLabel: 'Оповещения',
                    tabBarColor: theme.dark ? '#0F327F' : '#1f65ff',
                    tabBarIcon: ({color}) => (
                        <Icon name="ios-notifications" color={color} size={25}/>
                    ),
                }}
            />
            <Tab.Screen
            name="Calculator"
            component={CalculatorScreen}
            options={{
                tabBarLabel: 'Калькулятор',
                tabBarColor: theme.dark ? '#681430':'#d02860',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="calculator-variant" color={color} size={25}/>
                ),
            }}
        />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: theme.dark ? '#342756':'#694fad',
                    tabBarIcon: ({color}) => (
                        <Icon name="ios-person" color={color} size={25}/>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}
const HomeStackScreen = ({navigation}) => {
    const theme = useTheme();
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: theme.dark ? '#004943' : '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            animationEnabled: false,
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                title: 'Аквариум',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor={theme.dark ? '#004943' : '#009387'} onPress={() => {
                        navigation.openDrawer()}}
                    />)
            }}/>
            <HomeStack.Screen name="FishScreen" component={FishScreen} options={{
                title: 'Список рыбок',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor={theme.dark ? '#004943' : '#009387'} onPress={() => {
                        navigation.openDrawer()}}
                    />)
            }}/>
        </HomeStack.Navigator>
    )
}

const DetailsStackScreen = ({navigation}) => {
    const theme = useTheme();
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: theme.dark ? '#0F327F' : '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            animationEnabled: false,
        }}>
            <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
                title: 'Оповещения',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor={theme.dark ? '#0F327F' : '#1f65ff'} onPress={() => {
                        navigation.openDrawer()}}
                    />)
            }}/>
        </DetailsStack.Navigator>
    )
}
