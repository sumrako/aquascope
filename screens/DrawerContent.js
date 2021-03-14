import React from 'react'
import {View, StyleSheet, StatusBar } from 'react-native'
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from  '@expo/vector-icons/Ionicons'
import SimpleLineIcons from  '@expo/vector-icons/SimpleLineIcons'
import Feather from  '@expo/vector-icons/Feather'
import {AuthContext} from "../components/context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function DrawerContent(props) {
    const paperTheme = useTheme();
    const { signOut, toggleTheme } = React.useContext(AuthContext)

    return (
        <View style={{flex: 1}}>

           <DrawerContentScrollView {...props}>
               <View style={styles.drawerContent}>
                   <View style={styles.userInfoSection}>

                       <Drawer.Section style={styles.drawerSection}>
                           <DrawerItem icon={({color, size}) => (
                              /* <Icon name="home-outline" color={color} size={size}/>*/
                               <MaterialCommunityIcons name="fishbowl-outline" color={color} size={size} />
                           )} label="Аквариум" onPress={() => {props.navigation.navigate('Home')}}/>



                           <DrawerItem icon={({color, size}) => (
                               <Ionicons name="notifications-outline" color={color} size={size}/>
                           )} label="Оповещения" onPress={() => {props.navigation.navigate('Notifications')}}/>
                           <DrawerItem icon={({color, size}) => (
                               <SimpleLineIcons name="calculator" color={color} size={size}/>
                           )} label="Калькулятор" onPress={() => {props.navigation.navigate('Calculator')}}/>
                           <DrawerItem icon={({color, size}) => (
                               <Feather name="book" color={color} size={size}/>
                           )} label="Мануал" onPress={() => {props.navigation.navigate('Manual')}}/>


                           <DrawerItem icon={({color, size}) => (
                               <Icon name="note-multiple-outline" color={color} size={size}/>
                           )} label="Заметки" onPress={() => {props.navigation.navigate('NoteScreen')}}/>

                           {/*
                           <DrawerItem icon={({color, size}) => (
                               <Ionicons name="settings-outline" color={color} size={size}/>
                           )} label="Settings" onPress={() => {props.navigation.navigate('SettingsScreen')}}/>

                           <DrawerItem icon={({color, size}) => (
                               <Icon name="account-check-outline" color={color} size={size}/>
                           )} label="Support" onPress={() => {props.navigation.navigate('SupportScreen')}}/>
                           */}
                       </Drawer.Section>
                       <Drawer.Section>
                           <TouchableRipple onPress={() => {
                               toggleTheme();
                           }}>
                               <View style={styles.preference}>
                                   <Caption style={{fontSize: 16}}>Тема</Caption>
                                   <View pointerEvents="none">
                                       <Switch value={paperTheme.dark}/>
                                   </View>

                               </View>
                           </TouchableRipple>
                       </Drawer.Section>
                   </View>
               </View>
           </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({color, size}) => (
                    <Icon name="exit-to-app" color={color} size={size}/>
                )} label="Sign Out" onPress={() => {signOut()}}/>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
