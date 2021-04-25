import React from 'react';
import {Dimensions, Animated} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

export const AnimatedFish = ({height, raznica, children}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
const [fun] = React.useState([
        {
            x: height/14.5,
            y: height/2
        },
        {
            x: height/14,
            y: height/2.08
        },
        {
            x: height/13.5,
            y: height/2.15
        },
        {
            x: height/13,
            y: height/2.2
        },
        {
            x: height/12.5,
            y: height/2.27
        },
        {
            x: height/12,
            y: height/2.34
        },
        {
            x: height/11,
            y: height/2.5
        },
        {
            x: height/10.5,
            y: height/2.57
        },
        {
            x: height/10,
            y: height/2.65
        },
        {
            x: height/9.5,
            y: height/2.75
        },
        {
            x: height/9,
            y: height/2.84
        },
        {
            x: height/8.5,
            y: height/2.95
        },
        {
            x: height/8,
            y: height/3.09
        },
        {
            x: height/7.5,
            y: height/3.24
        },
        {
            x: height/7,
            y: height/3.4
        },
        {
            x: height/6.5,
            y: height/3.64
        },
        {
            x: height/6,
            y: height/3.85
        },
        {
            x: height/5.5,
            y: height/4.15
        },
        {
            x: height/5,
            y: height/4.55
        },
        {
            x: height/4.5,
            y: height/5
        },
        {
            x: height/4,
            y: height/5.6
        },
        {
            x: height/3.5,
            y: height/6.45
        },
        {
            x: height/3,
            y: height/7.55
        },
        {
            x: height/2.5,
            y: height/9
        },
        {
            x: height/2.25,
            y: height/8.9
        },
        {
            x: height/2,
            y: height/7.65
        },
        {
            x: height/1.9,
            y: height/7.01
        },
        {
            x: height/1.8,
            y: height/6.25
        },
        {
            x: height/1.7,
            y: height/5.46
        },
        {
            x: height/1.6,
            y: height/4.62
        },
        {
            x: height/1.5,
            y: height/3.82
        },
        {
            x: height/1.4,
            y: height/3.01
        },
        {
            x: height/1.35,
            y: height/2.55
        },
        {
            x: height/1.31,
            y: height/2.04
        },
    ])

    const rand = Math.ceil(getRandomFloat(0,33))
    let left = new Animated.Value(fun[rand].x + screenWidth / 2 - height /2)
    let bottom = new Animated.Value(raznica + getRandomFloat(fun[rand].y , height / 2))

    let rotate = new Animated.Value(0)

    let left2 = new Animated.Value(fun[rand].x + screenWidth / 2 - height /2)

    let prevX = left + 5
    let thisX = left

    const startAnimate = () => {
        let time = getRandomFloat(5000,8000)

        prevX = thisX
        let sdvigX =  getRandomFloat( height / 14.5,  height / 1.31) + screenWidth / 2 - height /2
        thisX = sdvigX

        let sdvigY;
        let flag = 1
        let prev;
        fun.map((item, index) => {
            if(item.x == sdvigX && flag == 1) {
                sdvigY = item.y
                flag = 0

            }
            else if(item.x > sdvigX && flag == 1 && index != 0) {
                sdvigY = (item.y + prev.y) / 2
                flag = 0
            }
            prev = item
        })
        sdvigY = getRandomFloat(sdvigY , height / 2) + raznica

        if(left2 > left)
        Animated.timing(rotate, {
            toValue: 180,
            useNativeDriver: false,
            duration: 0,
        }).start();
        if(left2 < left)
        Animated.timing(rotate, {
            toValue: 0,
            useNativeDriver: false,
            duration: 0,
        }).start();
        left2 = left
        Animated.timing(left, {
            toValue: sdvigX,
            useNativeDriver: false,
            duration: time,
        }).start();
        Animated.timing(bottom, {
            toValue: sdvigY,
            useNativeDriver: false,
            duration: time,
        }).start();

    }

    function normal_random(){
        var pos = [ Math.random(), Math.random() ];
        while ( Math.sin( pos[0] * Math.PI ) > pos[1] ){
          pos = [ Math.random(), Math.random() ];
        }
        return pos[0];
      };




        function getRandomFloat(min, max) {
            let ran = 0
            for(let i = 0; i < 2; ++i) ran += normal_random()
            return ran / 2 * (max - min) + min;
        }

    useFocusEffect(React.useCallback( () => {
        startAnimate()
        setInterval(() =>{startAnimate()}, getRandomFloat(5000,15000))
    }, []))







    return (
        <Animated.View style={{position: 'absolute', /*transform: [{rotateY: rotate.valueOf().toString().concat('deg')}] ,backgroundColor: "#fa9f6a",*/ left: left, bottom: bottom}}>
            {children}
        </Animated.View>
    )
}
