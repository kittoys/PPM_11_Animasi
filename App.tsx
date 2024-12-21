import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

const App = () => {
  const moveAnim = useRef(new Animated.Value(-100)).current; // Mulai dari luar layar kiri
  const screenWidth = Dimensions.get('window').width; // Mendapatkan lebar layar

  // Fungsi untuk menjalankan animasi pergerakan awan dari kiri ke kanan
  const moveCloud = () => {
    Animated.loop(
      // Animasi bergerak terus-menerus
      Animated.timing(moveAnim, {
        toValue: screenWidth, // Gerakan sampai ke koordinat x = lebar layar
        duration: 5000, // Durasi pergerakan dalam 5 detik
        useNativeDriver: true,
      }),
    ).start();
  };

  // Fungsi untuk mereset posisi awan
  const resetCloud = () => {
    moveAnim.setValue(-100); // Reset ke posisi awal
    moveCloud(); // Mulai animasi lagi
  };

  // Menjalankan animasi saat komponen pertama kali dimuat
  useEffect(() => {
    moveCloud(); // Mulai animasi pergerakan awan
  }, []);

  return (
    <View style={styles.container}>
      {/* Gambar Latar Belakang */}
      <ImageBackground
        source={require('./assets/background_pixel.jpg')} // Ganti dengan gambar latar belakang
        style={styles.background}>
        {/* Animasi awan yang bergerak */}
        <Animated.View
          style={[
            styles.cloud,
            {
              transform: [{translateX: moveAnim}], // Animasi bergerak secara horizontal
            },
          ]}>
          {/* Gambar awan */}
          <Image
            source={require('./assets/sleet.png')} // Gambar awan yang akan bergerak
            style={styles.cloudImage}
          />
        </Animated.View>

        {/* Tombol Reset untuk mereset animasi */}
        <TouchableOpacity onPress={resetCloud} style={styles.button}>
          <Text style={styles.buttonText}>Reset Animasi</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloud: {
    position: 'absolute',
    top: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudImage: {
    width: 80, // Ukuran gambar awan
    height: 80, // Ukuran gambar awan
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
