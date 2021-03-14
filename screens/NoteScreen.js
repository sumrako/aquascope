import React, {useState, useMemo} from 'react';
import { View, Text, StyleSheet, Keyboard, ScrollView, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native'

export const NoteScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = async () => {
        Keyboard.dismiss();
        await AsyncStorage.setItem('Tasks', JSON.stringify([...taskItems, task]))
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = async (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
        await AsyncStorage.setItem('Tasks', JSON.stringify(itemsCopy))
    }

    useMemo(async () => {
        try {
            const myArray = await AsyncStorage.getItem('Tasks');
            setTaskItems([...JSON.parse(myArray)]);
        } catch (e) {
            console.log(e)
        }
    }, []).then(r => null)

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={{ paddingTop: 80, paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row"}}>
            <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => navigation.goBack()} >
                <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
            </TouchableOpacity>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>Заметки</Text></View>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={{marginBottom: 100}}>
                <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                        {
                            taskItems.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index}  onPress={() => {}}>
                                            <View style={[styles.item, {backgroundColor: colors.background2}]}>
                                                <View style={styles.itemLeft}>
                                                    <View style={styles.square}/>
                                                    <Text style={[styles.itemText, {color: colors.text}]}>{item}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => completeTask(index)}>
                                                    <MaterialCommunityIcons name="close" size={26} color={colors.text}/>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                        }
                    </View>
                </View>
            </ScrollView>
            <KeyboardAvoidingView /*behavior={Platform.OS === "ios" ? "padding" : "height"}*/ style={styles.writeTaskWrapper}>
                <TextInput style={[styles.input, {backgroundColor: colors.background2, color: colors.text}]} placeholder={'Напишите заметку'}
                           value={task} onChangeText={text => setTask(text)} placeholderTextColor={'#666'}/>
                           <TouchableOpacity onPress={() => handleAddTask()}>
                               <View style={[styles.addWrapper, {backgroundColor: colors.background2}]}>
                                   <Text style={[styles.addText, {color: colors.text}]}>+</Text>
                               </View>
                           </TouchableOpacity>
            </KeyboardAvoidingView>
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
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
        borderWidth: 1,
    },
    addText: {},
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
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
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
});
