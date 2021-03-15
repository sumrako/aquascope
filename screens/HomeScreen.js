import React, {useRef}  from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SvgAquarium from "../components/svgAquarium";
import {StatusBar} from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import {Caption, Paragraph, Title} from "react-native-paper";
import {Dimensions} from 'react-native';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {FishClown} from "../components/FishClown";
import {FishOrange} from "../components/FishOrange";
import {FishOrange2} from "../components/FishOrange2";
import {FishBlue} from "../components/FishBlue";
import {Seaweed} from "../components/Seaweed";
import {AnimatedFish} from "../components/AnimatedFish";
import {AuthContext} from "../components/context";
import AsyncStorage from "@react-native-community/async-storage";
export const HomeScreen = ({navigation}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

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
    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    React.useEffect( () => {
        setSwipe(true)
    }, [])
    return (
        <View  style={styles.container}>


            <StatusBar style={ theme.dark ? "light" : "dark"}/>
            <Image blurRadius={.7} style={{position: 'absolute', width: '100%', height: '100%', flex: 0}}
                   source={require('../components/fonHome5.jpg')}/>



            <Animated.View  style={ {color: colors.text, textAlign: 'center',height: height}}/>

            {/* <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '60%'}}>*/}

            <SvgAquarium/>



            <View>
                {/*  <Paragraph style={{position: 'absolute', top: -screenHeight/3.7, left: screenWidth/3.8}}><Seaweed/></Paragraph>
*/}
                <AnimatedFish><FishBlue/></AnimatedFish>
                <AnimatedFish><FishClown/></AnimatedFish>
                <AnimatedFish><FishOrange/></AnimatedFish>
                <AnimatedFish><FishOrange2/></AnimatedFish>

                <AnimatedFish><FishBlue/></AnimatedFish>
                <AnimatedFish><FishClown/></AnimatedFish>
                <AnimatedFish><FishOrange/></AnimatedFish>
                <AnimatedFish><FishOrange2/></AnimatedFish>

                <AnimatedFish><FishBlue/></AnimatedFish>
                <AnimatedFish><FishClown/></AnimatedFish>
                <AnimatedFish><FishOrange/></AnimatedFish>
                <AnimatedFish><FishOrange2/></AnimatedFish>

                <AnimatedFish><FishBlue/></AnimatedFish>
                <AnimatedFish><FishClown/></AnimatedFish>
                <AnimatedFish><FishOrange/></AnimatedFish>
                <AnimatedFish><FishOrange2/></AnimatedFish>

                <AnimatedFish><FishBlue/></AnimatedFish>
                <AnimatedFish><FishClown/></AnimatedFish>
                <AnimatedFish><FishOrange/></AnimatedFish>
                <AnimatedFish><FishOrange2/></AnimatedFish>




            </View>
            { /* </View>*/}
            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => navigation.navigate("FishScreen")}
                                  style={{ position: "absolute",  bottom: screenHeight/30 + 45, left: '85%'}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 40, height: 40,
                        borderRadius: 20, backgroundColor: colors.backgroundOpacity, lineHeight: 37}}>
                        <FontAwesome5 name="fish" size={20}/></Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => {startAnimate(); setSwipe(!swipe)}}
                                  style={{ position: "absolute", bottom: screenHeight/30, left: '85%'}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 40, height: 40,
                        borderRadius: 20, backgroundColor: colors.backgroundOpacity, lineHeight: 37}}>
                        <FontAwesome5 name="info" size={20}/></Text>
                </TouchableOpacity>
            </View>










            {swipe ? null :
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, {
                    backgroundColor: colors.backgroundOpacity   }]} >
                    <Text style={[styles.text_footer, {color: "white"/*colors.text*/, borderBottomColor: colors.text,
                        borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10, textAlign: 'center'}]}
                          onPress={() => {startAnimate(); setSwipe(!swipe)}}  >Информация об аквариуме</Text>
                    <ScrollView>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "rgba(255,255,255, 0.5)", width: 110, marginRight: 10}]}>Название</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>Мой аквариум</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "rgba(255,255,255, 0.5)", width: 110, marginRight: 10}]}>Тип</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>Пресноводный аквариум</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "rgba(255,255,255, 0.5)", width: 110, marginRight: 10}]}>Вместимость</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>100 литров</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "rgba(255,255,255, 0.5)", width: 110, marginRight: 10}]}>Дата запуска</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>02-03-2021</Paragraph>
                        </View>
                    </ScrollView>
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
