import React, {useRef, useEffect}  from 'react';
import {Dimensions, Animated} from 'react-native'
import {Paragraph} from "react-native-paper";
import {View} from "react-native-animatable";

export const AnimatedFish = ({children}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    const animate_state = {
        start: 0,
        end: 100
    }

    const value = useRef(new Animated.Value(animate_state.start)).current
    const startAnimate = () => {
        Animated.timing(value, { toValue: animate_state.end, useNativeDriver: false, duration: getRandomFloat(2000,8000) }).start()
    }

    const inputRange = Object.values(animate_state)

    let rLef = screenWidth/getRandomFloat(1.4,5)
    let rTo = -screenHeight/getRandomFloat(3,7)
    let rLef2 = screenWidth/getRandomFloat(1.4,5)
    let rTo2 = -screenHeight/getRandomFloat(3,7)

    let top = value.interpolate({ inputRange, outputRange: [rTo2, rTo] })
    let left = value.interpolate({ inputRange, outputRange: [rLef2, rLef] })
    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    useEffect( () => {
        let flag = true;
        setInterval(() =>{
            if(flag){
                rLef = screenWidth/getRandomFloat(1.4,5)
                rTo = -screenHeight/getRandomFloat(3,7)
                top = value.interpolate({ inputRange, outputRange: [rTo2, rTo] })
                left = value.interpolate({ inputRange, outputRange: [rLef2, rLef] })
                animate_state.start = 0
                animate_state.end = 100

            }
            else {
                rLef2 = screenWidth/getRandomFloat(1.4,5)
                rTo2 = -screenHeight/getRandomFloat(3,7)
                top = value.interpolate({ inputRange, outputRange: [rTo2, rTo] })
                left = value.interpolate({ inputRange, outputRange: [rLef2, rLef] })

                animate_state.start = 100
                animate_state.end = 0
            }startAnimate()
            console.log(top)
            flag = !flag;
        }, getRandomFloat(2000,8000))
    }, [])

    return (
        <View style={{position: 'absolute', top, left}}>
            {children}
        </View>
    )
}
