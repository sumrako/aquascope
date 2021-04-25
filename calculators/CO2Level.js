import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const CO2Level = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();


    const [PHValue, setPHValue] = useState(null)
    const [KHLevel, setKHLevel] = useState(null)

    return (
        <View style={styles.container}>


<View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                 <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}} >
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>Уровень СО2</Text></View>



         <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' >
            


<View>

<Text style={{color: '#72D695', marginLeft: 20}}>Текущее значение pH</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="" onChangeText={text => setPHValue(text)} value={PHValue}
      placeholderTextColor={'#666'} />
       </View>


       <Text style={{color: '#72D695', marginLeft: 20}}>Текущий уровень KH</Text>
       <View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="" onChangeText={text => setKHLevel(text)} value={KHLevel}
      placeholderTextColor={'#666'}/>
       </View>
       

    

</View>



<View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
<Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
    <Text style={{color: colors.text}}>{(KHLevel / 2.8 * 10**(7.9 - PHValue)).toFixed(3)} ppm</Text>

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
        /*alignItems: 'center',
        justifyContent: 'center',*/
        
    },
    inputWrapper: {
       // marginTop: 10,
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
     writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
