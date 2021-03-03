import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SvgAquarium from "../components/svgAquarium";
import {StatusBar} from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {Caption, Paragraph, Title} from "react-native-paper";
import IconAquarium from "../components/IconAquarium";


export const HomeScreen = ({navigation}) => {

    const { colors } = useTheme();

    const theme = useTheme();

    return (
        <View style={styles.container}>

          <StatusBar style={ theme.dark ? "light" : "dark"}/>

                <SvgAquarium />



            {/*  <Text style={{ color: colors.text}}>Home Screen</Text>
            <Button
                title="Go to details screen"
                onPress={() => navigation.navigate("Details")}
            />*/}


            <View
                style={[styles.footer, {
                    backgroundColor: colors.background2,
                }]}
            >


                <Text style={[styles.text_footer, {color: colors.text, borderBottomColor: colors.text,
                    borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10}]}>Информация об аквариуме</Text>
                <View style={styles.section}>
                    <Caption style={[styles.caption, {marginRight: 10}]}>Название</Caption>
                    <Paragraph style={[styles.paragraph, styles.caption]}>Мой аквариум</Paragraph>
                </View>
                <View style={styles.section}>
                    <Caption style={[styles.caption, {marginRight: 10}]}>Тип</Caption>
                    <Paragraph style={[styles.paragraph, styles.caption]}>Пресноводный аквариум</Paragraph>
                </View>
                <View style={styles.section}>
                    <Caption style={[styles.caption, {marginRight: 10}]}>Вместимость</Caption>
                    <Paragraph style={[styles.paragraph, styles.caption]}>100 литров</Paragraph>
                </View>
                <View style={styles.section}>
                    <Caption style={[styles.caption, {marginRight: 10}]}>Дата запуска</Caption>
                    <Paragraph style={[styles.paragraph, styles.caption]}>02-03-2021</Paragraph>
                </View>

        </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
});
