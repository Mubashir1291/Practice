import React, { useEffect, useRef } from 'react';
import { View, Animated, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Screen2({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Run both fade and scale animations together
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
        <Animated.Image
      source={require('../../assets/src/cat.jpeg')}          style={[
            styles.fullImage,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: 350, height: 350, borderRadius: 20 },
});
