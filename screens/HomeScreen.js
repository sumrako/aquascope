import React, {useState, useCallback, useRef} from 'react';
import {Animated, View, Text, StyleSheet,TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SvgAquarium from "../components/svgAquarium";
import {StatusBar} from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import {Caption, Paragraph} from "react-native-paper";
import {Dimensions} from 'react-native';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {FishClown} from "../components/FishClown";
import {FishOrange} from "../components/FishOrange";
import {FishOrange2} from "../components/FishOrange2";
import {FishBlue} from "../components/FishBlue";
import {ClownLoach} from "../components/ClownLoach";
import {NanoFish} from "../components/NanoFish";
import {SwordBill} from "../components/SwordBill";
import {AnimatedFish} from "../components/AnimatedFish";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native'
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import Icon from "@expo/vector-icons/Ionicons";

export const HomeScreen = ({navigation, useIsFocused}) => {

    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const { colors } = useTheme();
    const theme = useTheme();
    const [fishItems, setFishItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

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

    const width = (screenWidth < (screenHeight - 154) / 5 * 3) ? screenWidth :  (screenHeight - 154) / 5 * 3;

    const raznica = (screenWidth < (screenHeight - 154) / 5 * 3) ? ((screenHeight - 154) / 5 * 3) - screenWidth :  0;

    useFocusEffect(useCallback (() => {
        setIsLoading(false)
        setFishItems([])
        animate_state.start = 100
        animate_state.end = 0
        startAnimate()
        setTimeout(async() => {
            try {
                setFishItems([...JSON.parse(await AsyncStorage.getItem('fishItems'))]);
            } catch (e) { console.log(e) }
        }, 0)
        setIsLoading(true)
    }, [useIsFocused]))
    
    return (
        <View  style={styles.container}>
            <StatusBar style={ theme.dark ? "light" : "dark"}/>
            <Image blurRadius={.7} style={{position: 'absolute', width: '100%', height: '100%', flex: 0}}
            source={theme.dark ? require('../components/fonHome20.jpg') : require('../components/fonHome.jpg')}/>

            <View style={{width: '100%', height: 100, backgroundColor: theme.dark ? '#004943' : '#009387'}}>
                <View style={{paddingHorizontal: 20, flexDirection: "row", marginTop: 55, marginLeft: 10}}>
                <TouchableOpacity onPress={() => {navigation.openDrawer()}} style={{height: '100%', width: 50}}>
                    <Icon name="ios-menu" size={35}  color={'#EEEEEE'}/>
                </TouchableOpacity>
                    
                    <Text style={[styles.sectionTitle, {color: '#EEEEEE', marginTop: -1}]}>Мой аквариум</Text>
                </View>
            </View>

<View style={{height: screenHeight - 154, width: '100%'}}>
            <Animated.View  style={ {color: colors.text, textAlign: 'center', height: height}}/>
            <SvgAquarium/>
            <View>
                { 
                    isLoading ?   fishItems.map((item, index) => {
                        return (
                            (item.ico === "FishClown") ?
                            <AnimatedFish key={index} height={width} raznica={raznica}><FishClown /></AnimatedFish>
                            :  (item.ico === "FishBlue") ?
                            <AnimatedFish key={index}  height={width} raznica={raznica}><FishBlue/></AnimatedFish>
                            :  (item.ico === "FishOrange") ?
                            <AnimatedFish key={index}  height={width} raznica={raznica}><FishOrange/></AnimatedFish>
                            :  (item.ico === "FishOrange2") ?
                            <AnimatedFish key={index}  height={width} raznica={raznica}><FishOrange2/></AnimatedFish>
                            :  (item.ico === "ClownLoach") ?
                            <AnimatedFish key={index}  height={width} raznica={raznica}><ClownLoach/></AnimatedFish>
                            :  (item.ico === "NanoFish") ?
                            <AnimatedFish key={index}  height={width} raznica={raznica}><NanoFish/></AnimatedFish>
                            :  (item.ico === "SwordBill") ?
                            <AnimatedFish key={index}  height={width} raznica={raznica}><SwordBill/></AnimatedFish>
                            : null
                    )} ) : null}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgba(233,234,236, 0.8)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
