import React, { useRef } from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export default function Screen1({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressImage = () => {
    // Shrink slightly when clicked (for feedback)
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      // Navigate after animation ends
      navigation.navigate('screen2');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressImage} activeOpacity={0.9}>
        <Animated.Image
          source={require('../../assets/src/cat.jpeg')}
          style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 150, height: 150, borderRadius: 10 },
});
