import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from "@expo/vector-icons/Ionicons";
import Notifications from '../model/Notifications';
import {useTheme} from "@react-navigation/native";

export const NotificationsScreen = ({ navigation}) => {
    const { colors } = useTheme();
    const [listData, setListData] = useState(
        Notifications.map((NotificationItem, index) => ({
            key: `${index}`,
            title: NotificationItem.title,
            details: NotificationItem.details,
        })),
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onLeftActionStatusChange = rowKey => {
        console.log('onLeftActionStatusChange', rowKey);
    };

    const onRightActionStatusChange = rowKey => {
        console.log('onRightActionStatusChange', rowKey);
    };

    const onRightAction = rowKey => {
        console.log('onRightAction', rowKey);
    };

    const onLeftAction = rowKey => {
        console.log('onLeftAction', rowKey);
    };

    const VisibleItem = props => {
        const { data, rowHeightAnimatedValue, removeRow, rightActionState} = props;

        if (rightActionState) {
            Animated.timing(rowHeightAnimatedValue, {toValue: 0, duration: 200, useNativeDriver: false, }).start(() => {
                removeRow();
            });
        }

        return (
            <View style={[styles.item, {backgroundColor: colors.background2}]}>
                <TouchableOpacity onPress={() => console.log('Element touched')}>
                    <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between',}}>
                        <View style={[styles.itemLeft, {flexDirection: 'row'}]}>
                            <View style={styles.square}>
                                <MaterialCommunityIcons name="bell-ring-outline" size={26} color={colors.text}/>
                            </View>
                            <Text style={[styles.itemText, {color: '#1f65ff', fontWeight: 'bold'}]}>{data.item.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        );
    };

    const renderItem = (data, rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <VisibleItem data={data} rowHeightAnimatedValue={rowHeightAnimatedValue} removeRow={() => deleteRow(rowMap, data.item.key)}/>
        );
    };

    const HiddenItemWithActions = props => {
        const { swipeAnimatedValue, leftActionActivated, rightActionActivated, rowActionAnimatedValue, rowHeightAnimatedValue, onClose, onDelete,
        } = props;

        if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, { toValue: 500, useNativeDriver: false}).start();
        } else {
            Animated.spring(rowActionAnimatedValue, { toValue: 75, useNativeDriver: false}).start();
        }

        return (
            <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
                <Text>Left</Text>
                {
                    !leftActionActivated && (
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                            <MaterialCommunityIcons name="close-circle-outline" size={25} color="#fff"/>
                        </TouchableOpacity>
                    )
                }
                {
                    !leftActionActivated && (
                        <Animated.View style={[styles.backRightBtn,styles.backRightBtnRight, {flex: 1, width: rowActionAnimatedValue}]}>
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
                                <Animated.View style={[styles.trash, {transform: [{ scale: swipeAnimatedValue.interpolate({
                                    inputRange: [-90, -45], outputRange: [1, 0], extrapolate: 'clamp'})}]}]}>
                                    <MaterialCommunityIcons name="trash-can-outline"  size={25} color="#fff"/>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                }
            </Animated.View>
        );
    };

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}/>
        );
    };

    return (
        <View style={[styles.container, {marginTop: 50}]}>
            <View style={{  paddingHorizontal: 20, paddingBottom: 0, flexDirection: "row"}}>
                <Icon.Button name="ios-menu" size={35}  color={colors.text} backgroundColor={colors.background} onPress={() => {
                    navigation.openDrawer()}}  />
                    <Text style={[styles.sectionTitle, {color: colors.text, marginTop: 6}]}>Оповещения</Text>
            </View>
            <View style={styles.tasksWrapper}>
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    disableRightSwipe
                    onRowDidOpen={onRowDidOpen}
                    leftActivationValue={100}
                    rightActivationValue={-200}
                    leftActionValue={0}
                    rightActionValue={-500}
                    onLeftAction={onLeftAction}
                    onRightAction={onRightAction}
                    onLeftActionStatusChange={onLeftActionStatusChange}
                    onRightActionStatusChange={onRightActionStatusChange}/>
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
