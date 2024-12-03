import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Logo from '../../../assets/images/logo-bg.png';
import LogoXapiens from '../../../assets/images/logoPtXapiens.png'
import Input from '../../components/Input/Input';
import Input2 from '../../components/Input/Input2';
import Button from '../../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApiLogin } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {

  const navigation = useNavigation(); // Gunakan useNavigation

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkToken = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.token) {
          navigation.navigate('Home'); // Jika token ada, arahkan ke Home
        }
      }
      console.log("Check token berhasil");
      
    } catch (error) {
      console.error('Failed to retrieve token', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, [navigation]);

  const onSignInPressed = async () => {
    setIsLoading(true);
    const value = {
      email: email,
      password: password
  }
    try {
      const { data, status } = await ApiLogin(value);
      console.log(status, " iko status");
      
      if (status == 200) {
        const user = {
          email: value.email,
          token: data.token,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('Login successful', user);

        // Arahkan ke halaman Home
        navigation.navigate('Home');
        
      } 
      // else if (status == 400) {
      //   console.log(data.error);
      //   Alert.alert('Login Error', "User tidak ditemukan", [
      //     { text: 'OK' }
      //   ]);
        
      // }

    } catch (error) {
      console.log(error);
      Alert.alert('Error', "User Salah" , [
        { text: 'OK' }
      ]);
      // notificationError(error.response?.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Logo by jobseekers */}
      <Image source={LogoXapiens} style={styles.logo} resizeMode="contain" />
      <Text style={styles.text}>Sign in</Text>

      {/* Input email and password */}
      <Input placeholder="Email address" value={email} setValue={setEmail} />
      <Input2
        placeholder={'Password'}
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      <Text style={styles.text2}>Forgot password?</Text>

      {/* Button sign in */}
      {/* <Button text={'Sign In'} onPress={onSignInPressed} /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={onSignInPressed}
        disabled={isLoading} // Nonaktifkan tombol jika sedang loading
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* UI line and text 'or' */}
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text3}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Link for google, facebook and apple */}
      <TouchableOpacity style={styles.link}>
        <Icon name="google" size={25} color={'#000'} style={styles.icon} />
        <Text style={styles.text4}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Icon name="facebook" size={25} color={'#000'} style={styles.icon} />
        <Text style={styles.text4}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Icon name="apple" size={25} color={'#000'} style={styles.icon} />
        <Text style={styles.text4}>Continue with Apple</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.text4}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.text5}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'flex-end',
    padding: 15,
  },
  logo: {
    width: 250,
    height:150,
    marginLeft: 60,
  },
  text: {
    color: '#008A00',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  text2: {
    color: '#006083',
    fontSize: 14,
    marginLeft: 250,
    marginBottom: 10,
  },
  text3: {
    color: '#008A00',
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 25,
  },
  text4: {
    color: '#008A00',
    fontSize: 14,
  },
  text5: {
    color: '#006083',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#008A00',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  line: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    width: '43%',
    marginTop: 20,
    marginBottom: 25,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  link: {
    borderColor: '#008A00',
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    position: 'relative',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  footer: {
    flexDirection: 'row',
  },
});

export default SignInScreen;
