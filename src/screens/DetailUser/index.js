// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const DetailUser = ({route}) => {
//   const {user} = route.params;
//   const [email, setEmail] = useState('');

//   const navigation = useNavigation();

//   const handleLogout = () => {
//     Alert.alert(
//       'Konfirmasi Logout', // Judul alert
//       'Apakah anda yakin ingin logout?', // Pesan alert
//       [
//         {
//           text: 'Batal', // Tombol batal
//           onPress: () => console.log('Logout dibatalkan'),
//           style: 'cancel',
//         },
//         {
//           text: 'Ya', // Tombol konfirmasi
//           onPress: async () => {
//             await AsyncStorage.removeItem('user'); // Hapus user dari AsyncStorage
//             console.log('Logged out successfully');
//             navigation.navigate('Login')
//             // Redirect ke halaman login atau aksi lain jika diperlukan
//           },
//         },
//       ],
//       { cancelable: false } // Agar tidak bisa menutup dengan menekan luar alert
//     );
//   };

//   const fetchEmail = async () => {
//     try {
//       const userString = await AsyncStorage.getItem('user');
//       if (userString !== null) {
//         const user = JSON.parse(userString);
//         setEmail(user.email); // Set email ke state
//       }
//     } catch (error) {
//       console.error('Error fetching user from storage:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEmail();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.navbar}>
//         <View>
//           <Text style={styles.navUserName}>User</Text>
//           <Text style={styles.navUserEmail}>{email}</Text>
//         </View>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.title}>Detail User</Text>
//       <Image source={{uri: user.avatar}} style={styles.avatar} />
//       <Text style={styles.detailText}>ID: {user.id}</Text>
//       <Text style={styles.detailText}>First Name: {user.first_name}</Text>
//       <Text style={styles.detailText}>Last Name: {user.last_name}</Text>
//       <Text style={styles.detailText}>Email: {user.email}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   detailText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#008A00',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   navUserName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   navUserEmail: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   logoutButton: {
//     backgroundColor: '#ff4d4f',
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default DetailUser;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window'); // Mendapatkan lebar layar

const DetailUser = ({route}) => {
  const {user} = route.params;
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout', // Judul alert
      'Apakah anda yakin ingin logout?', // Pesan alert
      [
        {
          text: 'Batal', // Tombol batal
          onPress: () => console.log('Logout dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Ya', // Tombol konfirmasi
          onPress: async () => {
            await AsyncStorage.removeItem('user'); // Hapus user dari AsyncStorage
            console.log('Logged out successfully');
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false}, // Agar tidak bisa menutup dengan menekan luar alert
    );
  };

  const fetchEmail = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString !== null) {
        const user = JSON.parse(userString);
        setEmail(user.email); // Set email ke state
      }
    } catch (error) {
      console.error('Error fetching user from storage:', error);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.navUserName}>User</Text>
          <Text style={styles.navUserEmail}>{email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Detail User</Text>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <Text style={styles.detailText}>ID: {user.id}</Text>
        <Text style={styles.detailText}>First Name: {user.first_name}</Text>
        <Text style={styles.detailText}>Last Name: {user.last_name}</Text>
        <Text style={styles.detailText}>Email: {user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    position: 'absolute', // Navbar berada di atas layar
    top: 0, // Posisi di atas layar
    width: '100%', // Lebar penuh
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#008A00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 1000, // Pastikan navbar berada di atas
  },
  content: {
    marginTop: 80, // Memberi jarak dengan navbar
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#555', // Warna tombol back
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navUserName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navUserEmail: {
    color: '#fff',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailUser;
