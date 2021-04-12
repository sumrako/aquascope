import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Image } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Manual from '../model/Manual';
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";
import Icon from "@expo/vector-icons/Ionicons";
import { CalculatorScreen } from './CalculatorScreen';
const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
export const ManualScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();

 
    const [listData, setListData] = useState(
        Manual.map((ManualItem, index) => ({
            key: `${index}`,
            title: ManualItem.title,
            details: ManualItem.details,
            patch: ManualItem.patch
        })),
    );

    const [title, setTitle] = useState(null)
    const [details, setDetails] = useState(null)
    const [patch, setPatch] = useState(null)
    const [modalIndex, setModalIndex] = useState(null)

    const openModalFish =  (index) => {
        setTitle(listData[index].title === null ? "" : listData[index].title)
        setDetails(listData[index].details === null ? "" : listData[index].details)
        setPatch(listData[index].patch === null ? "" : listData[index].patch)
        setModalIndex(index)
        setIsModalVisible(true);
    }

    const closeModal = () => {
       
        
         setIsModalVisible(false);
     }

    const [isModalVisible, setIsModalVisible] = useState(false)
    return (

        <View style={[styles.container, {marginTop: 50, paddingHorizontal: 10}]}>


 <View style={{  paddingHorizontal: 10, flexDirection: "row"}}>

 <Icon.Button name="ios-menu" size={35}  color={colors.text} backgroundColor={colors.background} onPress={() => {
                        navigation.openDrawer()}}
                    />
                    <Text style={[styles.sectionTitle, {color: colors.text, marginTop: 5}]}>Мануал</Text></View>



                    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={{paddingTop: 20}}>
         { 
            listData.map((item, index) => {
                  return (
                       <TouchableOpacity onPress={() =>  openModalFish(index)} key={index}
                       style={[styles.item, {backgroundColor: colors.background2}]}>
                        <View style={[styles.itemLeft]}>
                         
                         
                          <Image style={{ marginLeft: 5, marginRight: 10, width: 60, height: 60, borderRadius: 10}}
                   source={item.patch}/>



                        
                             <View style={{width:  screenWidth - 110}}>
                              {
                                  item.title === '' || item.title === null ? null :
                                  <Paragraph style={[styles.paragraph, styles.caption,
                                   {color: '#899FFE', fontWeight: 'bold'}]}>{item.title}</Paragraph>
                                     }
                                       {
                                             item.details === '' || item.details === null ? null :
                                               <Caption style={[styles.caption, {height: 50, color: theme.dark ?
                                                   "#9B9B9B" : "rgba(0,0,0, 0.5)"}]}>
                                                       {item.details}</Caption>
                                                }
                                                 </View>
                                                    </View>   
                                      </TouchableOpacity>
                                     )
                                })
         }
                            
</ScrollView>





          { isModalVisible ? <Animatable.View animation="lightSpeedIn"
             style={[styles.modelContentWrapper, {backgroundColor: colors.background}]}>
           

               <View style={{marginTop: 5,  paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row"}}>
                 <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => closeModal()} >
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>{title}</Text></View>



  <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' >

  <Image style={{ marginLeft: 10, marginRight: 10, width: screenWidth -20, borderRadius: 20, height: 200}}
                   source={patch}/>


                    <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                     <Text style={{color: colors.text, textAlign: 'justify'}}>{details}</Text>
            
                     </View>
                      </View>
                          </ScrollView>
                           </Animatable.View> : null }        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       /* alignItems: 'center',
        justifyContent: 'center',*/
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
        padding: 5,
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
        width: 24,
        height: 24,
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
        width: screenWidth,
        marginTop: 'auto',
        position: 'absolute',
    },
    closeModal: {
        width: 40,
        height: 40,
    },
    closeBtnWrapper: {
        alignItems: 'flex-end',
        marginTop: 45,
        marginRight: 10
    },
    inputWrapper: {
        marginTop: 30
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
