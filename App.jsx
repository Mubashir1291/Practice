import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Animated, 
  Text, 
  Easing, 
  ActivityIndicator, 
  ScrollView, 
  Dimensions,  
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Modal , SlideAnimation , ModalPortal } from 'react-native-modals';

export default function Animation() {
  const images = [
    require('./assets/src/ball.png'),
    require('./assets/src/mic.png'),
    require('./assets/src/mouse.png'),
    require('./assets/src/bat.png'),
    require('./assets/src/choclate.png'),
  ];

  const scaleAnim = useRef(new Animated.Value(1)).current; 
  const [index, setIndex] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 1200,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(pulse).start();

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 800);

    fetch('https://jsonplaceholder.typicode.com/users') 
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

    return () => clearInterval(interval);
  }, []);
   
  useEffect(() => {
    const timer = setTimeout(() => {
    console.log("Showing Modal")
      setIsModalVisible(true);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.appContainer}>
    
      <ScrollView style={styles.scrollView}> 
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
          
          <View style={{ padding: 20 }}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              data.slice(0, 2).map(item => (
                <View
                  key={item.id}
                  style={styles.dataItem}
                >
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>Name: {item.name}</Text>
                  <Text style={{ color: '#555' }}> Username: {item.username}</Text>
                  <Text style={{ color: '#777' }}> Email: {item.email}</Text>
                </View>
              ))
            )}
                 
          </View>

        </View>
      </ScrollView>

    <Modal 
  visible={isModalVisible}
  swipeDirection={['down']}
  swipeThreshold={150}
 animationDuration = {200}
  onSwipeOut={() => setIsModalVisible(false)}
  modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
>
  <View style={{  paddingHorizontal: 20, alignItems: 'center' , width:"100%", height:600 }}>
    
    <Text>You are on Modal</Text>
  </View>
</Modal>
<ModalPortal/>

    </View>
  );
}

const styles = StyleSheet.create({
  // New style for the outermost container
  appContainer: {
    flex: 1, 
    backgroundColor: '#fff', 
  },
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
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
  dataItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 300, 
  },
 

  modalContainer: {
    height:600,
    width:"100%",
    marginTop: 20, 
    marginLeft: 20, 
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'column', 
  },


});