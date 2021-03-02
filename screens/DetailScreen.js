import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

export const DetailsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            {/*  <StatusBar backgroundColor="#0F327F" barStyle="light-content"/> */}

            <Text>Details Screen</Text>
            <Button
                title="Go to details screen...again"
                onPress={() => navigation.push("Details")}
            />
            <Button
                title="Go to home"
                onPress={() => navigation.navigate("Home")}
            />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
