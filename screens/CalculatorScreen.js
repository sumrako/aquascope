import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";

export const CalculatorScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
    return (
        <View style={[styles.container, {marginTop: 50, paddingHorizontal: 10}]}>


        <View style={{  paddingHorizontal: 10, flexDirection: "row"}}>
        <Icon.Button name="ios-menu" size={35}  color={colors.text} backgroundColor={colors.background} onPress={() => {
                               navigation.openDrawer()}}  />
                           <Text style={[styles.sectionTitle, {color: colors.text, marginTop: 6}]}>Калькуляторы</Text></View>


                           <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={{ paddingTop: 20}}>
                           <TouchableOpacity onPress={() => {navigation.navigate("AquariumVolume")}} 
                                                          style={[styles.item, {backgroundColor: colors.background2}]}>
                                           
                                          <Text  style={[{color: '#72D695', fontWeight: 'bold'}]}> Объем аквариума</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => {navigation.navigate("CO2Level")}} 
                                                          style={[styles.item, {backgroundColor: colors.background2}]}>
                                           
                                          <Text  style={[{color: '#72D695', fontWeight: 'bold'}]}>Уровень СО2</Text>
                                        </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
