import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  text: string;
}

const TodoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fungsi untuk mengambil tugas dari AsyncStorage
  const fetchTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');
      if (jsonValue !== null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  // Fungsi untuk menyimpan tugas ke AsyncStorage
  const saveTasks = async (newTasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(newTasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  // Fungsi untuk menambahkan tugas baru
  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask: Task = { id: Date.now().toString(), text: taskInput };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTaskInput('');
    }
  };

  // Fungsi untuk menghapus tugas
  const deleteTask = async (taskId: string) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={taskInput}
          onChangeText={text => setTaskInput(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>DONE</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#C978BC', // Warna C978BC
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  deleteButton: {
    color: '#C978BC', // Warna C978BC
  },
});

export default TodoScreen;
