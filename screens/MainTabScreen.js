import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet, View, Text} from 'react-native'
import Icon from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {HomeScreen} from "./HomeScreen";
import {NotificationsScreen} from "./NotificationsScreen";
import {CalculatorScreen} from "./CalculatorScreen";
import { useTheme } from '@react-navigation/native';
import {ManualScreen} from "./ManualScreen";
const HomeStack = createStackNavigator()
const DetailsStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export const MainTabScreen = () => {
    const theme = useTheme();
    const { colors } = useTheme();
    return  (
        <Tab.Navigator initialRouteName="Home" activeColor="#fff" barStyle={{backgroundColor: 'tomato'}}>
            <Tab.Screen name="Home"  component={HomeScreen} options={{
                tabBarLabel: 'Аквариум',
                tabBarColor: theme.dark ? '#004943' : '#009387',
                tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="fishbowl" color={color} size={25}/>
                      
                ),
            }}/>
            <Tab.Screen name="Notifications" component={NotificationsScreen} options={{
                tabBarLabel: 'Оповещения',
                tabBarColor: theme.dark ? '#0F327F' : '#1f65ff',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-notifications" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name="Calculator" component={CalculatorScreen} options={{
                tabBarLabel: 'Калькулятор',
                tabBarColor: theme.dark ? '#396A4A' : '#72D695',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="calculator-variant" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name="Manual"  component={ManualScreen} options={{
                tabBarLabel: 'Мануал',
                tabBarColor: theme.dark ? '#434E7E' : '#899FFE',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="book-open-page-variant" color={color} size={25}/>
                ),
            }}/>
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
        </HomeStack.Navigator>
    )
}

const NotificationsStackScreen = ({navigation}) => {
    const theme = useTheme();
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor:'#1f65ff',// theme.dark ? '#0F327F' : '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            animationEnabled: false,
        }}>
            <DetailsStack.Screen name="Details" component={NotificationsScreen} options={{
                title: 'Оповещения',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor={'#1f65ff'/*theme.dark ? '#0F327F' : '#1f65ff'*/} onPress={() => {
                        navigation.openDrawer()}}
                    />)
            }}/>
        </DetailsStack.Navigator>
    )
}



const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})