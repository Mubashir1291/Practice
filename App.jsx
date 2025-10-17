// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, View, Animated } from 'react-native';
// import LottieView from 'lottie-react-native';
// import { Text } from 'react-native-gesture-handler';
// import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

// export default function Animation() {
//   const images = [
//     require('./assets/src/ball.png'),
//     require('./assets/src/mic.png'),
//     require('./assets/src/mouse.png'),
//     require('./assets/src/bat.png'),
//     require('./assets/src/choclate.png'),
//   ];

//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const animatePop = () => {
//       // Start small
//       scaleAnim.setValue(1);
//       // Scale up quickly
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     };

//     // Initial pop
//     animatePop();

//     const interval = setInterval(() => {
//       // Change image and pop again
//       setIndex(prev => (prev + 1) % images.length);
//       animatePop();
//     }, 700);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.LottieContainer}>
//         <LottieView
//           source={require('./assets/src/shoppingCart.json')}
//           autoPlay
//           loop
//           style={styles.lootie}
//         />
//       </View>

//       <View style={styles.imagecon}>
//         <Animated.Text
//           style={[
//             styles.text,
//             { transform: [{ scale: scaleAnim }] },
//           ]}
//         >
//           Design your Gift
//         </Animated.Text>
//         <Animated.Image
//           source={images[index]}
//           style={[
//             styles.image,
//             {
//               transform: [
//                 {
//                   scale: scaleAnim.interpolate({
//                     inputRange: [ 1,1],
//                     outputRange: [1, 1], // pop from smaller size
//                   }),
//                 },
//               ],
//             },
//           ]}
//           resizeMode="contain"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   LottieContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 300,
//     height: 300,
//   },
//   lootie: {
//     width: 150,
//     height: 150,
//   },
//   imagecon: {
//     backgroundColor: 'aqua',
//     width: '90%',
//     height: 150,
//     flexDirection: 'row',
//     borderRadius: 50,
//     alignItems: 'center',
//     overflow: 'hidden',

//   },
//   image: {
//     width: 125,
//     height: 125,
//     position: 'absolute',
//     marginRight: 20,
//     left:220,
//   },
//   text:{
//   color : 'red',
//   fontSize:25,
//   marginLeft:30,
//   fontWeight:'bold'

//   }
// });

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Text, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Animation() {
  const images = [
    require('./assets/src/ball.png'),
    require('./assets/src/mic.png'),
    require('./assets/src/mouse.png'),
    require('./assets/src/bat.png'),
    require('./assets/src/choclate.png'),
  ];

  const scaleAnim = useRef(new Animated.Value(1)).current; // for text pulse
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const animatePop = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // grow
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // shrink back
          duration: 400,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Initial pop
    animatePop();

    const interval = setInterval(() => {
      // Change image
      setIndex(prev => (prev + 1) % images.length);
      // Animate text pulse
      animatePop();
    }, 1500); // slightly slower for a calm rhythm

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.LottieContainer}>
        <LottieView
          source={require('./assets/src/shoppingCart.json')}
          autoPlay
          loop
          style={styles.lootie}
        />
      </View>

      <View style={styles.imagecon}>
        <Animated.Text
          style={[
            styles.text,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          Design your Gift
        </Animated.Text>

        <Animated.Image
          source={images[index]}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  LottieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  lootie: {
    width: 150,
    height: 150,
  },
  imagecon: {
    backgroundColor: 'aqua',
    width: '90%',
    height: 150,
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 8
  },
  image: {
    width: 125,
    height: 125,
    position: 'absolute',
    right: 25,
  },
  text: {
    color: 'red',
    fontSize: 25,
    marginLeft: 30,
    fontWeight: 'bold',
  },
});

