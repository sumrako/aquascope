import React, {useState, useEffect, useRef} from 'react';
import {Animated, View, Text, StyleSheet,Keyboard, Modal, TouchableOpacity, Image, Alert, Platform, KeyboardAvoidingView, TextInput,  ScrollView } from 'react-native';
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
import {ClownLoach} from "../components/ClownLoach";
import {NanoFish} from "../components/NanoFish";
import {SwordBill} from "../components/SwordBill";
import {Seaweed} from "../components/Seaweed";
import {AnimatedFish} from "../components/AnimatedFish";
import {AuthContext} from "../components/context";
import AsyncStorage from "@react-native-community/async-storage";
import Fish from '../model/Fish';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native'
import {useIsFocused, useFocusEffect} from '@react-navigation/native'





export const HomeScreen = ({navigation}) => {
    
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const { colors } = useTheme();
    const theme = useTheme();

    let animate_state = {
        start: 0,
        end: 100
    }

    const value = useRef(new Animated.Value(animate_state.start)).current

    const startAnimate = () => {
        if (animate_state.end) {
            Animated.timing(value, {toValue: animate_state.end, useNativeDriver: false, duration: 500}).start()
            animate_state.start = 100
            animate_state.end = 0
        } else {
            Animated.timing(value, {toValue: animate_state.end, useNativeDriver: false, duration: 500}).start()
            animate_state.start = 0
            animate_state.end = 100
        }
    }

    const inputRange = Object.values(animate_state)
    const height = value.interpolate({ inputRange, outputRange: ['20%', '0%'] })

    const [fishItems, setFishItems] = useState([]);
    const[isLoading, setIsLoading] = useState(false)
    
    useFocusEffect( React.useCallback (() => {
        setIsLoading(false)
        setFishItems([])
        animate_state.start = 100
        animate_state.end = 0
        startAnimate()
        /*setFishItems([ {
            key: fishItems.length.toString(),
            ico: "FishClown"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishBlue"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishOrange"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishOrange2"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishClown"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishBlue"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishOrange"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishOrange2"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishClown"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishBlue"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishOrange"
        },
        {
            key: fishItems.length.toString(),
            ico: "FishOrange2"
        }])*/
        setTimeout(async() => {
            try {
                const myArray = await AsyncStorage.getItem('fishIcons');
                setFishItems([...JSON.parse(myArray)]);
            } catch (e) { console.log(e) }
        }, 0)
        setIsLoading(true)
    }, []))

    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }






    return (
        <View  style={styles.container}>
  <StatusBar style={ theme.dark ? "light" : "dark"}/>
            <Image blurRadius={.7} style={{position: 'absolute', width: '100%', height: '100%', flex: 0}}
                   source={require('../components/fonHome5.jpg')}/>

            <Animated.View  style={ {color: colors.text, textAlign: 'center', height: height}}/>

            <SvgAquarium/>

            <View>
                {/*  <Paragraph style={{position: 'absolute', top: -screenHeight/3.7, left: screenWidth/3.8}}><Seaweed/></Paragraph>*/}
                { isLoading ?   fishItems.map((item, index) => {
                    return (
                        (item.ico === "FishClown") ?
                        <AnimatedFish key={index}><FishClown/></AnimatedFish>
                        :  (item.ico === "FishBlue") ?
                        <AnimatedFish key={index}><FishBlue/></AnimatedFish>
                        :  (item.ico === "FishOrange") ?
                        <AnimatedFish key={index}><FishOrange/></AnimatedFish>
                        :  (item.ico === "FishOrange2") ?
                        <AnimatedFish key={index}><FishOrange2/></AnimatedFish>
                        :  (item.ico === "ClownLoach") ?
                        <AnimatedFish key={index}><ClownLoach/></AnimatedFish>
                        :  (item.ico === "NanoFish") ?
                        <AnimatedFish key={index}><NanoFish/></AnimatedFish>
                        :  (item.ico === "SwordBill") ?
                        <AnimatedFish key={index}><SwordBill/></AnimatedFish>
                        : null
                    )} ) : null}

 {/*  <Animated.View style={{position: 'absolute', top: -screenHeight/4.1, left: screenWidth/2.2}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/4.1, left: screenWidth/1.85}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/4.1, left: screenWidth/1.6}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/3.6, left: screenWidth/1.6}}><FishClown/></Animated.View>

<Animated.View style={{position: 'absolute', top: -screenHeight/4.1, left: screenWidth/2.7}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/4.1, left: screenWidth/3.4}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/4.7, left: screenWidth/3.4}}><FishClown/></Animated.View>

<Animated.View style={{position: 'absolute', top: -screenHeight/3.6, left: screenWidth/2.2}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/3.2, left: screenWidth/2.2}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/3.2, left: screenWidth/2.7}}><FishClown/></Animated.View>


<Animated.View style={{position: 'absolute', top: -screenHeight/4.7, left: screenWidth/2.2}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/5.5, left: screenWidth/2.2}}><FishClown/></Animated.View>
<Animated.View style={{position: 'absolute', top: -screenHeight/5.5, left: screenWidth/1.85}}><FishClown/></Animated.View>

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
                <AnimatedFish><FishOrange2/></AnimatedFish>*/}


            </View>
        






            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => {navigation.navigate("FishScreen"); setFishItems([])}}
                                  style={{ position: "absolute",  bottom: screenHeight/30 + 45, left: '85%'}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 40, height: 40,
                        borderRadius: 20, backgroundColor: colors.backgroundOpacity, lineHeight: 37}}>
                        <FontAwesome5 name="fish" size={20}/></Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => {startAnimate();}}
                                  style={{ position: "absolute", bottom: screenHeight/30, left: '85%'}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 40, height: 40,
                        borderRadius: 20, backgroundColor: colors.backgroundOpacity, lineHeight: 37}}>
                        <FontAwesome5 name="info" size={20}/></Text>
                </TouchableOpacity>
            </View>






            <Animated.View  style={ {color: colors.text, textAlign: 'center',height: height}}/>

                <Animatable.View animation="fadeInUpBig" style={[styles.footer, {
                    backgroundColor: colors.backgroundOpacity   }]} >
                    <Text style={[styles.text_footer, {color: "white"/*colors.text*/, borderBottomColor: colors.text,
                        borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10, textAlign: 'center'}]}
                          onPress={() => {startAnimate()}}  >Информация об аквариуме</Text>
                    <ScrollView>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Название</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>Мой аквариум</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Тип</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>Пресноводный аквариум</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Вместимость</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>100 литров</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Дата запуска</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>02-03-2021</Paragraph>
                        </View>
                    </ScrollView>
                </Animatable.View>

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
