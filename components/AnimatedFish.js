import React from 'react';
import {Dimensions, Animated} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

export const AnimatedFish = ({children}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

  
    let left = new Animated.Value(screenWidth/getRandomFloat(1.7,4.7))
    let top = new Animated.Value(-screenHeight/getRandomFloat(3.5,7))
    

    const startAnimate = () => {
        let time = getRandomFloat(4000,6000)
        Animated.timing(left, {
            toValue: screenWidth/getRandomFloat(1.7,4.7),
            useNativeDriver: false,
            duration: time,
        }).start();
        Animated.timing(top, {
            toValue: -screenHeight/getRandomFloat(3.5,7),
            useNativeDriver: false,
            duration: time,
        }).start();
    }

    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    useFocusEffect(React.useCallback( () => {
        startAnimate()
        setInterval(() =>{startAnimate()}, getRandomFloat(6000,8000))
    }, []))

    return (
        <Animated.View style={{position: 'absolute', top: top, left: left}}>
            {children}
        </Animated.View>
    )
}
