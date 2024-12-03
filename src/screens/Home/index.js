import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import {ApiGetUsers} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [email, setEmail] = useState('');

  const navigation = useNavigation(); // Gunakan useNavigation

  const fetchData = async pageNumber => {
    if (loading || pageNumber > totalPages) return; // Jangan fetch jika sudah di halaman terakhir atau sedang loading
    setLoading(true);
    try {
      const {data} = await ApiGetUsers(pageNumber);
      console.log(data, 'ini response');
      //   const json = await response.json();
      //   setData(prevData => [...prevData, ...data.data]); // Append data baru ke data lama
      setData(data.data); // Append data baru ke data lama
      setTotalPages(data.total_pages); // Set total halaman
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
    fetchData(page); // Panggil API saat halaman berubah
  }, [page]);

  useEffect(() => {
    fetchEmail();
  }, []);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Navigasi ke halaman berikutnya
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
            navigation.navigate('Login')
            // Redirect ke halaman login atau aksi lain jika diperlukan
          },
        },
      ],
      { cancelable: false } // Agar tidak bisa menutup dengan menekan luar alert
    );
  };


  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <Text style={styles.cell}>{item.first_name}</Text>
      <Text style={styles.cell}>{item.last_name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate('DetailUser', {user: item})}>
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Selamat Datang di Home Screen!</Text>
    // </View>
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View>
          <Text style={styles.navUserName}>User</Text>
          <Text style={styles.navUserEmail}>{email}</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.containerTengah}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>User Table</Text>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={() =>
              data.length > 0 ? (
                <View style={[styles.row, styles.header]}>
                  <Text style={styles.cell}>ID</Text>
                  <Text style={styles.cell}>Avatar</Text>
                  <Text style={styles.cell}>First Name</Text>
                  <Text style={styles.cell}>Last Name</Text>
                  <Text style={styles.cell}>Email</Text>
                  <Text style={styles.cell}>Action</Text>
                </View>
              ) : null
            }
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Data Kosong</Text>
              </View>
            )}
          />
        </>
      )}

      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        renderPagination()
      )} */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.button, page === 1 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={page === 1}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          {page} / {totalPages}
        </Text>
        <TouchableOpacity
          style={[styles.button, page === totalPages && styles.disabledButton]}
          onPress={handleNext}
          disabled={page === totalPages}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9fbfc',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#008A00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
  containerTengah: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fbfc', // Warna latar opsional
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    backgroundColor: '#008A00',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#007BFF',
  },
  pageText: {
    color: '#000',
  },
  activePageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginTop: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // Tambahkan latar belakang jika diperlukan
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    // backgroundColor: '#008A00',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  emptyText: {
    fontSize: 30,
    color: '#999',
  },
  button: {
    backgroundColor: '#008A00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#d6d6d6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailButton: {
    backgroundColor: '#008A00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
