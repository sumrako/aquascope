import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from "@expo/vector-icons/Ionicons";
import Notifications from '../model/Notifications';
import {useTheme} from "@react-navigation/native";

export const NotificationsScreen = ({ navigation}) => {
    const { colors } = useTheme();
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const [listData, setListData] = useState(
       [
            {
                key: 1,
                title: 'Покорми рыбок',
                active: false
            },
            {
                key: 2,
                title: 'Почисти аквариум',
                active: false
            },
            {
                key: 3,
                title: 'Поменяй воду в аквариуме',
                active: false
            },
        ])

        const [active0, setActive0] = useState(false)
        const [active1, setActive1] = useState(false)
        const [active2, setActive2] = useState(false)


    const toggleNotification = (index) => {
        index === 0 ? setActive0(data => !data) :
        index === 1 ? setActive1(data => !data) :
        setActive2(data => !data) 
    }

   

    return (
        <View style={[styles.container, {marginTop: 50}]}>
            <View style={{  paddingHorizontal: 20, paddingBottom: 0, flexDirection: "row"}}>
                <Icon.Button name="ios-menu" size={35}  color={colors.text} backgroundColor={colors.background} onPress={() => {
                    navigation.openDrawer()}}  />
                    <Text style={[styles.sectionTitle, {color: colors.text, marginTop: 6}]}>Оповещения</Text>
            </View>
            <View style={styles.tasksWrapper}>
            {
                listData.map((data, index) => {
                    return (
                        <View style={[styles.item, {backgroundColor: colors.background2}]} key={data.key}>
                            <TouchableOpacity onPress={() => { toggleNotification(index)}}>
                                <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between',}}>
                                    <View style={[styles.itemLeft, {flexDirection: 'row'}]}>
                                        <View style={[styles.square]}>
                                            <MaterialCommunityIcons name="bell-ring-outline" size={26} color={colors.text}/>
                                        </View>
                                        <Text style={[styles.itemText, {width: screenWidth - 136, color: '#1f65ff', fontWeight: 'bold'}]}>{data.title}</Text>
                                        
                                        {
                                            index === 0 ? 
                                            <View pointerEvents="none">
                                       <Switch value={active0}/>
                                   </View>:
                                   index === 1 ? 
                                            <View pointerEvents="none">
                                       <Switch value={active1}/>
                                   </View>:
                                  
                                            <View pointerEvents="none">
                                       <Switch value={active2}/>
                                   </View>


                                        }
                                        

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    );
                 })

            }
           </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tasksWrapper: {
        marginTop: 15,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        top: 5
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 20,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,

        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 76,
        width: 150,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        width: 75,
        right: 1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    }
});
