import React, {useState, useEffect, useMemo} from 'react';
import {ActivityIndicator, Dimensions, View, Text, StyleSheet, Keyboard, Modal, ScrollView, Alert, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Fish from '../model/Fish';
import {FishClown} from "../components/FishClown"
import {FishOrange2} from "../components/FishOrange2";;
import {FishOrange} from "../components/FishOrange";
import {FishBlue} from "../components/FishBlue";
import {ClownLoach} from "../components/ClownLoach";
import {NanoFish} from "../components/NanoFish";
import {SwordBill} from "../components/SwordBill";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Caption, Paragraph} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native'


export const FishScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    const [name, setName] = useState(null)
    const [title, setTitle] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [icon, setIcon] = useState("FishClown")
    
    const [fishItems, setFishItems] = useState([]);
    const [fishIcons, setFishIcons] = useState([]);
    const[isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        let cleanupFunction = false;
        setTimeout(async() => {
            try {
                const myArray = await AsyncStorage.getItem('fishItems');
                const myArray2 = await AsyncStorage.getItem('fishIcons');
                if(!cleanupFunction) setFishItems([...JSON.parse(myArray)]);
                if(!cleanupFunction) setFishIcons([...JSON.parse(myArray2)]);
            } catch (e) {
                console.log(e)
            }
            if(!cleanupFunction) setIsLoading(true)
            navigation.navigate("HomeDrawer")
        }, 2000)
        return () => cleanupFunction = true;
    }, [])

    const handleAddFish = async () => {
        Keyboard.dismiss()
        let data = {
            key: fishItems.length.toString(),
            name: name,
            title: title,
            details: '',
            quantity: quantity,
            ico: icon
        }
        let dataIco = {
            key: fishItems.length.toString(),
            ico: icon
        }
        setFishItems([...fishItems, data])
        setFishIcons([...fishIcons, dataIco])
        setName(null)
        setTitle(null)
        setQuantity(null)
        setIcon("FishClown")
        setIsModalVisible(false);

        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify([...fishItems, data]));
            await AsyncStorage.setItem('fishIcons', JSON.stringify([...fishIcons, dataIco]));
        } catch (e) {
            console.log(e)
        }
    }

    const completeFish = async (index) => {
        let itemsCopy = [...fishItems]
        itemsCopy.splice(index, 1);
        setFishItems(itemsCopy)
        let myArrayIco = await AsyncStorage.getItem('fishIcons');
        var parseIco = JSON.parse(myArrayIco)
        parseIco.splice(index, 1);
        setFishIcons(parseIco)
        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify([...itemsCopy]));
            await AsyncStorage.setItem('fishIcons', JSON.stringify([...parseIco]));
        } catch (e) {
            console.log(e)
        }
    }

    const changeFish = async (index) => {
        Keyboard.dismiss()
        let data = {
            key: fishItems.length.toString(),
            name: name,
            title: title,
            details: '',
            quantity: quantity,
            ico: icon
        }
       
        let dataIco = {
            key: fishItems.length.toString(),
            ico: icon
        }
        let parseIco = [
            ...fishIcons.slice(0, index),
            fishIcons[index] = dataIco,
            ...fishIcons.slice(index + 1)
        ]
        let items = [
            ...fishItems.slice(0, index),
            fishItems[index] = data,
            ...fishItems.slice(index + 1)
        ]
        setFishIcons(parseIco)
        setFishItems(items)
        setName(null)
        setTitle(null)
        setIcon("FishClown")
        setQuantity(null)
        setIsModalVisible(false);
        setIsModalFish(false)
        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify(items));
        } catch (e) {
            console.log(e)
        }
        try {
            await AsyncStorage.setItem('fishIcons', JSON.stringify(parseIco));
        } catch (e) {
            console.log(e)
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false)

    const openModal = async () => {
      setIsModalVisible(true);
   
         /* Keyboard.dismiss()
        let data = {
            key: fishItems.length.toString(),
            name: "sgsdgdsg",
            title: "sdgdsgdfdfdffdfdds",
            details: '',
            quantity: "5",
            ico: "FishClown"
        }
        let dataIco = {
            key: fishItems.length.toString(),
            ico: "FishClown"
        }
        setFishItems([...fishItems, data])
        setFishIcons([...fishIcons, dataIco])
        setName(null)
        setTitle(null)
        setQuantity(null)
        setIsModalVisible(false);

        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify([...fishItems, data]));
            await AsyncStorage.setItem('fishIcons', JSON.stringify([...fishIcons, dataIco]));
        } catch (e) {
            console.log(e)
        }*/
    }

    const closeModal = () => {
       setName(null)
        setTitle(null)
        setQuantity(null)
        setIcon("FishClown")
        setIsModalVisible(false);
        setIsModalFish(false)
      
    }

    const [isModalFish, setIsModalFish] = useState(false)
    const [modalIndex, setModalIndex] = useState(false)

    const openModalFish =  (index) => {
      setIsModalVisible(true);
        setName(fishItems[index].name === null ? "" : fishItems[index].name)
        setTitle(fishItems[index].title === null ? "" : fishItems[index].title)
        setQuantity(fishItems[index].quantity === null ? "1" : fishItems[index].quantity.toString())
        setIcon(fishItems[index].ico === null ? "FishClown" : fishItems[index].ico.toString())
        setIsModalFish(true)
        setModalIndex(index)
        /* Keyboard.dismiss()
        let data = {
            key: fishItems.length.toString(),
            name: "sgsdgdsg",
            title: "sdgdsgdfdfdffdfdds",
            details: '',
            quantity: "5",
            ico: "FishClown"
        }
        let dataIco = {
            key: fishItems.length.toString(),
            ico: "FishClown"
        }
        setFishItems([...fishItems, data])
        setFishIcons([...fishIcons, dataIco])
        setName(null)
        setTitle(null)
        setQuantity(null)
        setIsModalVisible(false);

        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify([...fishItems, data]));
            await AsyncStorage.setItem('fishIcons', JSON.stringify([...fishIcons, dataIco]));
        } catch (e) {
            console.log(e)
        }*/
    }

    const openDeleteAlert = (index) => {
        Alert.alert(
            "Вы действительно хотите удалить рыбку?", "",
            [
                {text: 'да', onPress: () => completeFish(index)},
                {text: 'нет'}
            ]
        )
    }
    if( !isLoading ) {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: "white"}}>
              <ActivityIndicator size="large"/>
               <LottieView source={require('../components/6729-fish.json')} autoPlay loop/>
            </View>
        );
    }
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
           { /*  <Modal transparent={true} visible={isModalVisible}>*/}
                <StatusBar backgroundColor={colors.background}/>
             







            { !isLoading ? null :
                <View style={{ paddingTop: 55, paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row"}}>
                    <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => navigation.goBack()} >
                        <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                    </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>Список рыбок</Text>
                </View>
            }
            { !isLoading ? null:
                <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                    <View style={styles.tasksWrapper}>
                        <View style={styles.items}>
                            {
                                fishItems.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => openModalFish(index)} key={index}
                                                          style={[styles.item, {backgroundColor: colors.background2}]}>
                                            <View style={[styles.itemLeft, {width: '75%'}]}>
                                                <View style={styles.square}>
                                                    {
                                                        (item.ico === "FishClown") ?
                       <FishClown/>
                        :  (item.ico === "FishBlue") ?
                       <FishBlue/>
                        :  (item.ico === "FishOrange") ?
                       <FishOrange/>
                        :  (item.ico === "FishOrange2") ?
                       <FishOrange2/>
                       :  (item.ico === "ClownLoach") ?
                       <ClownLoach/>
                       :  (item.ico === "NanoFish") ?
                       <NanoFish/>
                       :  (item.ico === "SwordBill") ?
                       <SwordBill/>
                        : null
                                                    }
                                                </View>
                                                <View>
                                                {
                                                    item.name === '' || item.name === null ? null :
                                                        <Paragraph style={[styles.paragraph, styles.caption,
                                                            {color: colors.text}]}>{item.name}</Paragraph>
                                                }
                                                {
                                                    item.title === '' || item.title === null ? null :
                                                        <Caption style={[styles.caption, {color: theme.dark ?
                                                                "rgba(255,255,255, 0.5)" : "rgba(0,0,0, 0.5)"}]}>
                                                            {item.title}</Caption>
                                                }
                                            </View>
                                            </View>
                                            {
                                                item.quantity === '' || item.quantity === null ?
                                                    <Paragraph style={[styles.paragraph, styles.caption,
                                                        {color: colors.text}]}>{" x1"}</Paragraph>
                                                    :
                                                    <Paragraph style={[styles.paragraph, styles.caption,
                                                        {color: colors.text}]}>{" x" + item.quantity}</Paragraph>
                                            }
                                            <TouchableOpacity onPress={() => openDeleteAlert(index)}>
                                                <MaterialCommunityIcons name="close" size={26} color={colors.text}/>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            }
            { !isLoading ? null: <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                                       style={styles.writeTaskWrapper}>
                <TouchableOpacity onPress={() => openModal()}>
                    <View style={[styles.addWrapper, {
                        backgroundColor: theme.dark ? '#004943' : '#009387',
                        marginRight: 20
                    }]}>
                        <Text style={[styles.addText, {color: "white"}]}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>}






            { isModalVisible ? <Animatable.View animation="lightSpeedIn"
                                 style={[styles.modelContentWrapper, {backgroundColor: colors.background}]}>
                   <View style={{flexDirection: 'row'}}>
                   <TouchableOpacity style={[{paddingLeft: 5}, styles.closeBtnWrapper]} onPress={() => closeModal()} >
                        <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                    </TouchableOpacity>
                   

                    {isModalFish ?
                    <TouchableOpacity style={[styles.closeBtnWrapper, {width: screenWidth - 90,alignItems: 'flex-end'}]} onPress={() => changeFish(modalIndex)}>
                        <MaterialCommunityIcons style={styles.closeModal} name="check" size={35} color={colors.text}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.closeBtnWrapper, {width: screenWidth - 90,alignItems: 'flex-end'}]} onPress={() => handleAddFish()}>
                        <MaterialCommunityIcons style={styles.closeModal} name="check" size={35} color={colors.text}/>
                    </TouchableOpacity>
                    }

                  </View>

                    <View style={[styles.inputWrapper]}>
                        <TextInput
                            style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            placeholder="Введите имя рыбки" onChangeText={text => setName(text)} value={name}
                            placeholderTextColor={'#666'}/>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            placeholder="Введите научное название" onChangeText={text => setTitle(text)} value={title}
                            placeholderTextColor={'#666'}/>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            placeholder="Введите количество" onChangeText={text => setQuantity(text)}
                            value={quantity} placeholderTextColor={'#666'}/>
                    </View>
                    
                    <View style={{alignItems: 'center'}}>
                    <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setIcon("FishClown")} 
                    style={[styles.textInput, {backgroundColor: icon === "FishClown" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15, paddingLeft: 15, margin: 5}]}>
                    <FishClown/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIcon("FishOrange")} 
                    style={[styles.textInput, {backgroundColor: icon === "FishOrange" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15, paddingLeft: 13, margin: 5}]}>
                    <FishOrange/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIcon("FishBlue")} 
                    style={[styles.textInput, {backgroundColor: icon === "FishBlue" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15,  margin: 5}]}>
                    <FishBlue/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIcon("FishOrange2")} 
                    style={[styles.textInput, {backgroundColor: icon === "FishOrange2" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15,  margin: 5}]}>
                    <FishOrange2/>
                    </TouchableOpacity>
                    
                    </View>

                    <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setIcon("ClownLoach")} 
                    style={[styles.textInput, {backgroundColor: icon === "ClownLoach" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15, paddingLeft: 15,  margin: 5}]}>
                    <ClownLoach/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIcon("NanoFish")} 
                    style={[styles.textInput, {backgroundColor: icon === "NanoFish" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15, paddingLeft: 15,  margin: 5}]}>
                    <NanoFish/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIcon("SwordBill")} 
                    style={[styles.textInput, {backgroundColor: icon === "SwordBill" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: 15, paddingLeft: 15,  margin: 5}]}>
                    <SwordBill/>
                    </TouchableOpacity>


                    </View>
                    </View>
                    { /*  {isModalFish ?
                        <TouchableOpacity onPress={() => changeFish(modalIndex)} style={[styles.btnWrapper,
                            {backgroundColor: colors.background2}]}>
                            <Text style={{textAlign: 'center', color: colors.text}}>Сохранить</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => handleAddFish()} style={[styles.btnWrapper,
                            {backgroundColor: colors.background2}]}>
                            <Text style={{textAlign: 'center', color: colors.text}}>Сохранить</Text>
                        </TouchableOpacity>
                    }*/}
                </Animatable.View> : null }
          { /* </Modal>*/}
        </View>



    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 60
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 20,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',//'space-around',
        alignItems: 'center',
        left: 10
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        //  borderWidth: 1,

    },
    addText: {
        fontSize: 26,
    },
    item: {
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 30,
        height: 30,
        /* backgroundColor: '#55BCF6',
       * opacity: 0.4,
         borderRadius: 5,*/
        marginRight: 15,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    modelContentWrapper: {
        height: '100%',
        width: '100%',
        marginTop: 'auto',
        padding: 15,
        position: 'absolute'
    },
    closeModal: {
        width: 40,
        height: 40,
    },
    closeBtnWrapper: {
        marginTop: 45,
        marginRight: 10
    },
    inputWrapper: {
        marginTop: 15
    },
    textInput: {
        padding: 15,
        fontSize: 18,
        borderRadius: 20
    },
    btnWrapper: {
        marginTop: 30,
        padding: 15,
        borderRadius: 20
    }
});
