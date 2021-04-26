import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const WaterBalance = ({navigation}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const {colors} = useTheme();
    const theme = useTheme();
    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)
    const [value3, setValue3] = useState(null)
    const [value4, setValue4] = useState(null)
    const [value5, setValue5] = useState(null)

    return (
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Водный баланс</Text>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%'}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>RO вода (литров){"\n"}</Text>
                                <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                                placeholder="" onChangeText={text => setValue1(text)} value={value1} placeholderTextColor={'#666'} />
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%'}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Водопроводная вода</Text>
                            <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            placeholder="" onChangeText={text => setValue2(text)} value={value2} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  





                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}>Соотношение воды : 1: {value1 / value2} </Text>
                    <Text style={{color: colors.text}}>Коэффициент :   {(value1 / value2)*100} </Text>
                </View>


                    
                    <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды RO (литров)</Text>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue3(text)} value={value3} placeholderTextColor={'#666'}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%', marginTop: 20}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Соотношение воды{"\n"}</Text>
                            <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            placeholder="" onChangeText={text => setValue4(text)} value={value4} placeholderTextColor={'#666'}/>
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%', marginTop: 20}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Объём  воды(литров) </Text>
                            <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            placeholder="" onChangeText={text => setValue5(text)} value={value5} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  




                    
                </View>
                <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    
                    <Text style={{color: colors.text}}>Нужно добавить - {value3 * value5 / value4 } литров водопроводной воды</Text>
                    
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 20,
    },
    textInput: {
        padding: 10,
        fontSize: 17,
        borderRadius: 20
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
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
