import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppNavigation } from '../../utils/useAppNavigation';

const HomeScreen = () => {
  const navigation = useAppNavigation();
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>HEY WELCOME BACK!</Text>
          <Text style={styles.headerTextSecond}>Let's get organized with StudySync!</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonColumn}>
          <TouchableOpacity 
                onPress={() =>
                navigation.navigate("StackScreens", {
                  screen: "ScheduleScreen",
                })
              }  
              style={styles.button}>
            <Text style={styles.buttonText}>SCHEDULE</Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() =>
            navigation.navigate("StackScreens", {
              screen: "TodoScreen",
            })
          }   
          style={styles.button}>
            <Text style={styles.buttonText}>PLANNER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // warna latar belakang bisa diganti sesuai kebutuhan
  },
  header: {
    paddingTop: '9%',
    flexDirection: 'row',
    height: '20%', // header akan mencakup 30% dari tinggi layar
    // alignItems: 'center', // mengatur posisi horizontal tengah
    justifyContent: 'center', // mengatur posisi vertical tengah
    backgroundColor: '#C978BC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerText: {
    fontSize: 30, // ukuran teks header
    fontWeight: 'bold', // teks header tebal
    color: 'white'
  },
  headerTextSecond: {
    fontSize: 14, // ukuran teks header
    fontWeight: 'bold', // teks header tebal
    color: 'white'
  },
  content: {
    flex: 1, // agar konten mengisi sisa ruang yang tersedia
    justifyContent: 'center', // mengatur posisi vertical tengah
    alignItems: 'center', // mengatur posisi horizontal tengah
  },
  buttonColumn: {
    alignItems: 'center', // mengatur posisi horizontal tengah
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#C978BC',
    fontSize: 40,
    fontWeight: 'bold',
  },
})
