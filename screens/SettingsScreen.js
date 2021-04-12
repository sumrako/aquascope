import React from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, Button } from 'react-native'
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import {AuthContext} from "../components/context";
export const SettingsScreen = (navigation) => {
    const { toggleTheme } = React.useContext(AuthContext)
    const paperTheme = useTheme();
    return (
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
