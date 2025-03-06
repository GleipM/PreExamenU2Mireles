import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { ProgressBar } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const PlayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { song } = route.params;
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setProgress((prev) => (prev < 1 ? prev + 0.01 : 1));
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value) => {
    setProgress(value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: song.image }}
        style={styles.backgroundImage}
      >

        <View style={styles.header}>
          <Icon name="expand-more" size={40} color="white" onPress={() => navigation.goBack()} />
          <Text style={{ color: 'white', fontSize: 20, fontWeight: "900" }}>WEEKEND PLAYLIST</Text>  
          <Icon name="more-vert" size={40} color="white" />
        </View>

        <View style={styles.center}>
          <Image source={{ uri: song.image  }} style={styles.image} /> 
        </View>
        
      </ImageBackground>

      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        onValueChange={handleSliderChange}
        minimumTrackTintColor='rgb(255, 255, 255)'
        maximumTrackTintColor='rgb(173, 134, 134)'
        thumbTintColor='rgb(255, 255, 255)'
      />

      <View style={styles.center}>
        <View style={styles.controls}>

          <Icon name="skip-previous" size={40} color="white" />

          <TouchableOpacity onPress={handlePlayPause}>
            <View style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: 50, padding: 10 }}>
              <Icon name={isPlaying ? "pause" : "play-arrow"} size={40} color="black" />
            </View>
          </TouchableOpacity>

          <Icon name="skip-next" size={40} color="white" />

        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    height: 400,
  },
  container: { 
    flex: 1, 
    backgroundColor: 'rgb(20, 20, 20)',
    color: 'white',
  },
  center: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'rgba(20, 20, 20, 0.54)',
    height: 400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 50,
    padding: 20,
  },
  image: { 
    marginTop: -350,
    width: 300, 
    height: 300, 
    borderRadius: 15, 
    marginBottom: 20 
  },
  title: { 
    paddingTop: 30,
    paddingHorizontal: 20,
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white' 
  },
  artist: { 
    paddingHorizontal: 20,
    fontSize: 18, 
    color: 'gray', 
    marginBottom: 20 
  },
  slider: {
    marginBottom: 20,
    color: 'white',
  },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '60%',
    padding: 10,
    borderRadius: 10,
  },
});

export default PlayerScreen;