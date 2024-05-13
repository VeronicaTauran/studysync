import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [agenda, setAgenda] = useState<{ [date: string]: string }>({});
  const [newAgenda, setNewAgenda] = useState<string>('');

  // Ambil agenda dari AsyncStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const storedAgenda = await AsyncStorage.getItem('@schedule');
        if (storedAgenda !== null) {
          setAgenda(JSON.parse(storedAgenda));
        }
      } catch (error) {
        console.error('Error fetching agenda:', error);
      }
    };

    fetchAgenda();
  }, []);

  // Simpan agenda ke AsyncStorage setiap kali agenda berubah
  useEffect(() => {
    const saveAgenda = async () => {
      try {
        await AsyncStorage.setItem('@schedule', JSON.stringify(agenda));
      } catch (error) {
        console.error('Error saving agenda:', error);
      }
    };

    saveAgenda();
  }, [agenda]);

  const handleDatePress = (date: any) => {
    setSelectedDate(date.dateString);
    if (agenda[date.dateString]) {
      Alert.alert(`Agenda pada tanggal ${date.dateString}: ${agenda[date.dateString]}`);
    } else {
      Alert.alert(`Anda memilih tanggal ${date.dateString}`);
    }
  };

  const handleAddAgenda = () => {
    if (selectedDate && newAgenda.trim() !== '') {
      setAgenda({ ...agenda, [selectedDate]: newAgenda });
      Alert.alert('Agenda berhasil ditambahkan!');
      setNewAgenda('');
    } else {
      Alert.alert('Silakan pilih tanggal dan masukkan agenda terlebih dahulu.');
    }
  };

  const agendaToMarkedDates = (agenda: { [date: string]: string }, selectedDate: string | undefined) => {
    const markedDates: { [date: string]: { selected: boolean, selectedColor?: string, marked?: boolean, dotColor?: string, } } = {};
    for (const date in agenda) {
      if (date === selectedDate) {
        markedDates[date] = { selected: true, selectedColor: 'purple' };
      } 
      else {
        markedDates[date] = { marked: true, dotColor: 'purple' };
      }
    }
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={agendaToMarkedDates(agenda, selectedDate)}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan agenda"
        onChangeText={text => setNewAgenda(text)}
        value={newAgenda}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAgenda}>
        <Text style={styles.addButtonText}>TAMBAH AGENDA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;
