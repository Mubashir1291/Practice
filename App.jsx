import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOutLeft,
  BounceIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  BounceInDown,
  BounceOut,
  ZoomOut,
  ZoomIn,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createNativeStackNavigator();

const DATA = [
  { id: '1', title: 'Item One', description: 'This is detail of Item One', colors: ['#2A7B9B', '#13547A'] },
  { id: '2', title: 'Item Two', description: 'This is detail of Item Two', colors: ['#E67E22', '#F1C40F'] },
  { id: '3', title: 'Item Three', description: 'This is detail of Item Three', colors: ['#8E44AD', '#3498DB'] },
  { id: '4', title: 'Item Four', description: 'This is detail of Item Four', colors: ['#2ECC71', '#27AE60'] },
  { id: '5', title: 'Item Five', description: 'This is detail of Item Five', colors: ['#E74C3C', '#C0392B'] },
];

const ListScreen = ({ navigation }) => {
  const getItemStyle = (index) => {
    switch (index) {
      case 0:
        return { height: 180, width: 180 };
      case 1:
        return { height: 170, width: 150 };
      default:
        return { height: 180 };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animated Gradient List</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          gap: 10,
          marginBottom: 15,
        }}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={ZoomIn.duration(3000).easing(Easing.out(Easing.exp)).delay(index * 300)}
            exiting={ZoomOut.duration(1500).easing(Easing.in(Easing.exp))}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })} activeOpacity={0.9}>
              <LinearGradient
                colors={item.colors?.length? item.colors : ['#555', '#333']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.item, getItemStyle(index)]}
              >
                <Text style={styles.title}>{item.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
};


const DetailScreen = ({ route }: any) => {
  const { item } = route.params;

  const rotate = useSharedValue(0);
  const scale = useSharedValue(0.96);

  React.useEffect(() => {
    // smooth rotation (no spring oscillation)
    rotate.value = withTiming(360, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });

    // smooth scale "pop" without strong bounce
    scale.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[styles.container]}
      entering={FadeInDown.duration(250)}
      exiting={FadeOutLeft}
    >
      <Animated.Image
        style={[{ width: '100%', height: 300, marginTop: 20 }, animatedStyle]}
        source={{
          uri: 'https://pkgiftshop.com/user_files/product_images/1630329371-HTpLRm.jpg',
        }}
      />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </Animated.View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 10,

  },
  title: {
    fontSize: 18,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
});
 