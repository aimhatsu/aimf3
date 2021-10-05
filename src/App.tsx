import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';
import AppBar from './Components/AppBar/AppBar';
import { Loader } from './Components/Loader/Loader';
import TabNavigator from './Components/Tabs/TabNavigator';
import { GlobalContext } from './Contexts/GlobalContext';
import Api from './Utils/Api';
import { config } from './Utils/ConfigDeviceView';
import { Storage_Token } from './Utils/KeyStorage';

const App = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [user, setUser] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem(Storage_Token).then((token) => {
      setIsLoggedIn((token !== "" && token !== null && token !== undefined));
    }).finally(() => setIsLoading(false));

  }, [token]);

  const handleLogin = () => {
    setLoader(true);
    var data = new FormData();
    data.append('cpf', user);
    data.append('password', pass);

    Api({
      method: 'post',
      url: 'login',
      data: data
    }).then(async (data) => {
      AsyncStorage.setItem(Storage_Token, data.data.token).then(() => {

        setToken(data.data.token);
        setIsLoggedIn(true);
        setLoader(false);


      }).catch(() => setLoader(false));

    })
  }

  return (
    <>
      <Loader
        loading={loader}
      />
      <AppBar />
      {
        !isLoggedIn && !isLoading &&
        <View style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff"
        }}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {

            }}
          >
            <View style={styles.centeredView}>

              <View style={styles.modalView}>

                <View style={styles.appContainer}>

                  <View style={styles.formLoginContent}>
                    <View style={styles.searchSection}>
                      <Icon
                        name='user'
                        type='font-awesome'

                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Usuário"
                        onChangeText={(value) => setUser(value)}
                        underlineColorAndroid="black"
                      />
                    </View>
                    <View style={styles.searchSection}>
                      <Icon
                        name='lock'
                        type='font-awesome'
                      />
                      <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Senha"
                        onChangeText={(pass) => setPass(pass)}
                        underlineColorAndroid="black"
                      />
                    </View>
                    <TouchableHighlight
                      style={styles.buttonLogin}
                      underlayColor='#ccc'
                      onPress={() => { handleLogin() }}
                    >
                      <Text style={styles.textButtonLogin}> ENTRAR </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      }
      {
        isLoggedIn &&
        <TabNavigator />
      }

    </>
  );
};

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '50%'
  },
  appContainer: {
    backgroundColor: "#fff",
    //height: "100%",
    width: "100%"
  },
  searchSection: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    //paddingTop: 10,
    paddingRight: 10,
    //paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  formLoginContent: {
    margin: 50,
    backgroundColor: "#fff",
    height: "100%",
    //width: "100%"



  },
  buttonLogin: {
    height: config.deviceHeight * 0.06,
    backgroundColor: '#5AAEB9',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 5


  },
  textButtonLogin: {
    color: "#FFFFFF",
  },
});

export default App;

