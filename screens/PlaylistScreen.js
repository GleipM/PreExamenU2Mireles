import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const songs = [
  { id: '1', title: 'Canción 1', artist: 'Artista 1', image: 'https://m.media-amazon.com/images/I/814htMhuuML._UF1000,1000_QL80_.jpg' },
  { id: '2', title: 'Canción 2', artist: 'Artista 2', image: 'https://m.media-amazon.com/images/I/814htMhuuML._UF1000,1000_QL80_.jpg' },
  { id: '3', title: 'Canción 1', artist: 'Artista 1', image: 'https://m.media-amazon.com/images/I/814htMhuuML._UF1000,1000_QL80_.jpg' },
  { id: '4', title: 'Canción 2', artist: 'Artista 2', image: 'https://m.media-amazon.com/images/I/814htMhuuML._UF1000,1000_QL80_.jpg' },
  { id: '5', title: 'Canción 1', artist: 'Artista 1', image: 'https://m.media-amazon.com/images/I/814htMhuuML._UF1000,1000_QL80_.jpg' },
  { id: '6', title: 'Canción 2', artist: 'Artista 2', image: 'https://m.media-amazon.com/images/I/814htMhuuML._UF1000,1000_QL80_.jpg' },
];

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxuI70nXbPG_hK1CQIiBJeNe_oA1aIWiMCw&s' }} 
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={40} color="white" onPress={() => navigation.goBack()} />
          <View style={{ flexDirection: 'row' }}>
            <Icon name="favorite-outline" size={40} color="white" />
            <Icon name="more-vert" size={40} color="white" />
          </View>
        </View>
      </ImageBackground>

      <View style={{ marginTop: -95, marginBottom: -70, padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: "900" }}>WEEKEND PLAYLIST</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="favorite-outline" size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 13 }}>25,00000 likes,</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="access-time" size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 13 }}>2 h 25 mins</Text>
          </View>
          <View style={{ backgroundColor: 'rgb(9, 255, 0)', borderRadius: 50, padding: 10 }}>
            <Icon name="play-arrow" size={40} color="black" />
          </View>
        </View>
      </View>

      <Text style={{ color: 'white', fontSize: 25, paddingLeft: 20, borderBottomColor: 'rgb(73, 73, 73)', borderBottomWidth: 1, paddingTop: 15,}}>Featuring</Text>
          
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Player', { song: item })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(73, 73, 73)', borderBottomWidth: 1, paddingTop: 15, paddingHorizontal: 20 }}>  
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />                  
                <View>
                  <Text style={styles.songTitle}>{item.title}</Text>
                  <Text style={styles.artist}>{item.artist}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Icon 
                  name={favorites[item.id] ? "favorite" : "favorite-outline"} 
                  size={40} 
                  color={favorites[item.id] ? "red" : "white"} 
                  onPress={() => toggleFavorite(item.id)} 
                />
                <Icon name="more-vert" size={40} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    height: 350,
  },
  container: { 
    flex: 1, 
    backgroundColor: 'rgb(20, 20, 20)',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 20,
    paddingTop: 50,
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15,
    color: 'white',
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15,
  },
  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 8, 
    marginRight: 10,
  },
  songTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: 'white',
  },
  artist: { 
    fontSize: 14, 
    color: 'white',
  },
});

export default PlaylistScreen;