import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
export const AquariumVolume = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();


    const [lengthA, setLengthA] = useState(null)
    const [lengthB, setLengthB] = useState(null)
    const [height, setHeight] = useState(null)
    const [thickness, setThickness] = useState(null)
    const [groundHeight, setGroundHeight] = useState(null)

    return (
        <View style={styles.container}>


<View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                 <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => navigation.goBack()} >
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>Объем аквариума</Text></View>



         <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' >
             <Caption style={[styles.caption, { color: "#9B9B9B"}]}>
                                                       Прямоугольный аквариум</Caption>
    <Image style={{ width: screenWidth - 40, height: screenWidth - 190}}
                   source={theme.dark ? require('./AquariumPryamWhite.png') : require('./AquariumPryamBlack.png')}/>


<View>

<Text style={{color: '#72D695', marginLeft: 20}}>Длина A(cm)</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="Введите длину A(cm)" onChangeText={text => setLengthA(text)} value={lengthA}
      placeholderTextColor={'#666'} />
       </View>


       <Text style={{color: '#72D695', marginLeft: 20}}>Длина B(cm)</Text>
       <View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="Введите длину B(cm)" onChangeText={text => setLengthB(text)} value={lengthB}
      placeholderTextColor={'#666'}/>
       </View>
       
     
<Text style={{color: '#72D695', marginLeft: 20}}>Высота аквариума(cm)</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="Введите высоту аквариума(cm)" onChangeText={text => setHeight(text)} value={height}
      placeholderTextColor={'#666'}/>
       </View>


       <Text style={{color: '#72D695', marginLeft: 20}}>Толщина стекла(mm)</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="Введите толщину стекла(mm)" onChangeText={text => setThickness(text)} value={thickness}
      placeholderTextColor={'#666'}/>
       </View>
       
       <Text style={{color: '#72D695', marginLeft: 20}}>Высота грунта(cm)</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="Введите высоту грунта(cm)" onChangeText={text => setGroundHeight(text)} value={groundHeight}
      placeholderTextColor={'#666'}/>
       </View>
    

</View>



<View style={{marginTop: 10, marginLeft: 20}}>
    <Text style={{color: colors.text}}>Объем: Брутто - {lengthA * lengthB * height / 1000} литров</Text>
    <Text style={{color: colors.text}}>              Нетто - {lengthA * lengthB * height / 1000 - 
        ((lengthA * lengthB + 2 * lengthA * height + 2 * lengthB * height) * thickness)/10000 } литров</Text>
        <Text style={{marginTop: 10, color: colors.text}}>Вес грунта: {lengthA * lengthB * groundHeight * 0.0015} кг</Text>
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
