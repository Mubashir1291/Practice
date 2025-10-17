import React, { useEffect, useRef, useState } from 'react';

import { StyleSheet, View, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Animation() {
  const images = [
    require('./assets/src/ball.png'),
    require('./assets/src/mic.png'),
    require('./assets/src/mouse.png'),
    require('./assets/src/bat.png'),
    require('./assets/src/choclate.png'),
  ];
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,

        useNativeDriver: true,
      }).start(() => {
        // Change image when fade out completes
        setIndex(prev => (prev + 1) % images.length);

        // Fade in new image
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,

          useNativeDriver: true,
        }).start();
      });
    }, 2000); // change every 4 seconds

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

      <Animated.Image
        source={images[index]}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
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

  image: {
    width: 250,
    height: 250,
  },
});
