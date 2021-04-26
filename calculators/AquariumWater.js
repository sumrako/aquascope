import React, {useState} from 'react';
import { View, Text, StyleSheet,  TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export const AquariumWater = ({navigation}) => {
    const {colors} = useTheme();



    const [VolumeA, setVolumeA] = useState(null)
    const [VolumeB, setVolumeB] = useState(null)
    const [percent, setPercent] = useState(null)
   

    return (
        <View style={styles.container}>


<View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                 <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => navigation.goBack()} >
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>Подмена воды</Text></View>



         <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' >
             


<View>

<Text style={{color: '#72D695', marginLeft: 20, marginTop: 5}}>Объём аквариума (литров)</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="" onChangeText={text => setVolumeA(text)} value={VolumeA}
      placeholderTextColor={'#666'} />
       </View>


       <Text style={{color: '#72D695', marginLeft: 20, marginTop: 5}}>Фактический объём (литров)</Text>
       <View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="" onChangeText={text => setVolumeB(text)} value={VolumeB}
      placeholderTextColor={'#666'}/>
       </View>
       
     
<Text style={{color: '#72D695', marginLeft: 20, marginTop: 5}}>Процент подмены воды(%)</Text>
<View style={styles.inputWrapper}>
  <TextInput
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
    placeholder="" onChangeText={text => setPercent(text)} value={percent}
      placeholderTextColor={'#666'}/>
       </View>



</View>




<View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
    <Text style={{color: colors.text}}>Подмена воды брутто : {VolumeA * percent / 100} литров</Text>
    <Text style={{color: colors.text}}>Подмена воды брутто Нетто : { VolumeB * percent / 100  } литров</Text>
       
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
    inputWrapper: {
        //marginTop: 20,
    },
    textInput: {
        marginTop: 5,
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