import React, {useRef}  from 'react';
import {Animated, View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SvgAquarium from "../components/svgAquarium";
import {StatusBar} from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import {Caption, Paragraph, Title} from "react-native-paper";


export const HomeScreen = ({navigation}) => {

    const { colors } = useTheme();
    const theme = useTheme();

    const [swipe, setSwipe] = React.useState(true)

    const animate_state = {
        start: 0,
        end: 100
    }
    const value = useRef(new Animated.Value(animate_state.start)).current

    const startAnimate = () => {
        swipe ?
            Animated.timing(value, { toValue: animate_state.end, useNativeDriver: false, duration: 500 }).start()
            : Animated.timing(value, { toValue: animate_state.start, useNativeDriver: false, duration: 500 }).start()
    }
    const inputRange = Object.values(animate_state)
    const height = value.interpolate({ inputRange, outputRange: ['20%', '0%'] })

    return (





        <View style={styles.container}>
            <Image
style={{

    position: 'absolute',
    width: '100%',
    height: '100%',
}}
            source={require('../components/fon.jpg')}
       />
            <StatusBar style={ theme.dark ? "light" : "dark"}/>

            <Animated.View  style={ {color: colors.text, textAlign: 'center',
                height  }}/>

            <SvgAquarium/>
<View style={{alignItems: "center"}}>
            <TouchableOpacity onPress={() => {startAnimate(); setSwipe(!swipe)}}
            style={{ position: "absolute", bottom: 25, left: 300}}>
            <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 50, height: 30, borderRadius: 30, backgroundColor: '#0071E3'
            }}>...</Text>
        </TouchableOpacity></View>
            {/*  <Text style={{ color: colors.text}}>Home Screen</Text>
            <Button
                title="Go to details screen"
                onPress={() => navigation.navigate("Details")}
            />*/}

            {swipe ? null :
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, {
                    backgroundColor: colors.backgroundOpacity, backdropFilter: 'blur(2rem)', opacity: 0.5}]}>


                    <Text style={[styles.text_footer, {color: colors.text, borderBottomColor: colors.text,
                        borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10, textAlign: 'center'}]}
                          onPress={() => {startAnimate(); setSwipe(!swipe)}}  >Информация об аквариуме</Text>
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
                </Animatable.View>
            }
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
        flex: 1,
        backgroundColor: 'rgba(233,234,236, 0.8)',
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
