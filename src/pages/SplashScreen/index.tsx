// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect } from 'react'
// import { useAppNavigation } from '../../utils/useAppNavigation';

// const SplashScreen = () => {
//   const navigation = useAppNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate("StackScreens", {
//         screen: "HomeScreen",
//       })
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigation])
  
//   return (
//     <View>
//       <Text>SplashScreen</Text>
//     </View>
//   )
// }

// export default SplashScreen

// const styles = StyleSheet.create({})

import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppNavigation } from '../../utils/useAppNavigation';

const SplashScreen = () => {
  const navigation = useAppNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("StackScreens", {
        screen: "HomeScreen",
      })
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation])
  return (
    <LinearGradient colors={['#C978BC', '#FFFFFF']} style={styles.container}>
      <View style={styles.logoContainer}>
       <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

{/* <Image source={require('../../assets/logo.png')} style={styles.logo} /> */}