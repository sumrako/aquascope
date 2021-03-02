import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SvgAquarium from "./svgAquarium";
import {StatusBar} from "expo-status-bar";
export const HomeScreen = ({navigation}) => {

    const { colors } = useTheme();

    const theme = useTheme();

    return (
        <View style={styles.container}>

          <StatusBar style={ theme.dark ? "light" : "dark"}/>

            <SvgAquarium/>

            {  /* <Text style={{color: colors.text}}>Home Screen</Text>
            <Button
                title="Go to details screen"
                onPress={() => navigation.navigate("Details")}
            />*/}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
