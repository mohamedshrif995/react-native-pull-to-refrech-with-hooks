
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, SetIsLoading] = useState(false)

  const getData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    SetIsLoading(true)
    await fetch(url).then(res => res.json())
      .then((resJson) => {
        setData(resJson)
      }).finally(() => SetIsLoading(false))
  }
  useEffect(() => {
    getData()
    SetIsLoading(false)
  }, [data])
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemRow} >
        <Text key={item.id}>{item.title}</Text>
        <Text>{item.id}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        refreshing={isLoading}
        onRefresh={getData}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemRow: {
    marginTop: 5,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10
  },

});


export default App;
