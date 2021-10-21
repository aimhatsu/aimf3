import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Api from '../../../../Utils/Api';
import { config } from '../../../../Utils/ConfigDeviceView';
import { Storage_Token } from '../../../../Utils/KeyStorage';
import { Loader } from '../../../Loader/Loader';
import Weekschedule from '../../../Weekschedule/Weekschedule';

const RecomendationDetails = (props: any): JSX.Element => {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [grid, setGrid] = useState<any>();
  const [gridMonth, setGridMonth] = useState<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const { recomendationDetails } = props;
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const getGrid = () => {
      setLoader(true);
      AsyncStorage.getItem(Storage_Token).then((data) => {
        Api({
          method: 'get',
          url: `schedule/${recomendationDetails.EspecialistaIndicado[0]._id.$oid}`,
          headers: {
            bearer: data,
          },
        })
          .then(async (res) => {
            setGrid(res.data);
            setLoader(false);
          })
          .catch((err) => console.log(err));
      });
    };

    getGrid();
  }, []);

  const getScheduled = (yearDay: number, hour: number) => {
    const scheduled = grid.find((el: any) => el._id === yearDay)?.[hour] || 0;

    return scheduled;
  };

  const generateDaysMonth = async () => {
    const names = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];

    const date: any = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    const start: any = new Date(date.getFullYear(), 0, 0);
    const diff =
      date -
      start +
      (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const yearDay = Math.floor(diff / oneDay);

    let daysMonth: Array<any> = [];

    // while (date.getDay() < 6) {
    let i = 0;
    while (date.getMonth() == new Date().getMonth()) {
      if (date.getDay() > 0 && date.getDay() < 6) {
        daysMonth.push({
          day: date.getDate(),
          dayWeek: names[date.getDay()],
          month: date.getMonth() + 1,
          officeHour1: hours.map((hour) => ({
            hour: moment(hour, 'HH:mm').format('HH:mm'),
            unavailable: getScheduled(yearDay + i, hour),
          })),
        });
      }
      date.setDate(date.getDate() + 1);
      i++;
    }

    setGridMonth(daysMonth);
    setModalVisible(!modalVisible);
  };

  const renderItem = (item: any) => {
    return (
      <View style={{ borderRadius: 15 }}>
        <Weekschedule
          item={item}
          tratamento={recomendationDetails.DetalhesDoTratamento[0].tratamento}
          cidade={recomendationDetails.EspecialistaIndicado[0].cidade}
        />
      </View>
    );
  };

  return (
    <>
      <Loader loading={loader} />

      <View style={styles.mainCardView}>
        <View style={styles.containerImage}>
          <ImageBackground
            source={{
              uri: recomendationDetails.DetalhesDoTratamento[0].arquivo,
            }}
            style={styles.imageBackground}
          >
            <View style={styles.textImageContent}>
              <Text style={styles.textImageTitle}>
                {recomendationDetails.DetalhesDoTratamento[0].tratamento}
              </Text>
              <Text style={styles.textImageSubTitle}>
                {recomendationDetails.DetalhesDoTratamento[0].quantidade}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textStep}>
            <Text style={styles.textTitleContent}>
              {recomendationDetails.DetalhesDoTratamento[0].title1}
            </Text>
            <Text style={styles.textDescription}>
              {recomendationDetails.DetalhesDoTratamento[0].txt1}
            </Text>
          </View>

          <View style={styles.textStep}>
            <Text style={styles.textTitleContent}>
              {recomendationDetails.DetalhesDoTratamento[0].title2}
            </Text>
            <Text style={styles.textDescription}>
              {recomendationDetails.DetalhesDoTratamento[0].txt2}
            </Text>
          </View>

          <View style={styles.textSpecialist}>
            <Text style={styles.textTitleContent}>
              Especialista em Psicanálise
            </Text>
            <Text style={styles.textDescription}>
              {' '}
              {recomendationDetails?.EspecialistaIndicado[0]?.nome}{' '}
            </Text>
          </View>

          <View style={styles.textStep}>
            <Text style={styles.textTitleContent}>Endereço</Text>
            <Text style={styles.textAddress}>
              {recomendationDetails?.EspecialistaIndicado?.[0]?.endereco} -
              {recomendationDetails?.EspecialistaIndicado?.[0]?.cidade} -{' '}
              {recomendationDetails?.EspecialistaIndicado?.[0]?.estado} -
              {recomendationDetails?.EspecialistaIndicado?.[0]?.cep}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#ccc"
            onPress={() => {
              generateDaysMonth();
            }}
          >
            <Text style={styles.textButton}> AGENDAR </Text>
          </TouchableHighlight>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerModal}>
                <Text style={styles.shedule}>Horários disponíveis</Text>

                <TouchableHighlight
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </TouchableHighlight>
              </View>

              <FlatList data={gridMonth} renderItem={renderItem} />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '95%',
  },
  headerModal: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,

    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  textStyle: {
    fontSize: 15,
  },
  mainCardView: {
    height: config.deviceWidth * 1.2,
    borderRadius: 15,
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 6,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  containerImage: {
    flexDirection: 'column',
    height: '30%',
    borderRadius: 15,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'flex-start',
  },
  textImageTitle: {
    color: '#2592A1',
    shadowColor: '#00000029',
    shadowOpacity: 1,
    shadowRadius: 8,
    fontWeight: 'bold',
  },
  textImageSubTitle: {
    color: '#707070',
    shadowColor: '#00000029',
    shadowOpacity: 1,
    shadowRadius: 8,
    fontSize: 15,
  },
  textAddress: {
    color: '#0F7FFF',
    shadowColor: '#00000029',
    shadowOpacity: 1,
    shadowRadius: 8,
    fontSize: 12,
  },
  textContainer: {},
  textStep: {
    margin: 8,
  },

  textSpecialist: {
    margin: 8,
    paddingTop: 8,
  },
  textTitleContent: {
    color: '#F59F95',
    fontSize: 10,
  },
  textDescription: {
    marginTop: 5,
    color: '#6A6A6A',
    opacity: 1,
    fontSize: 12,
  },
  textImageContent: {
    display: 'flex',
    top: 0,
    alignItems: 'center',
    margin: 10,
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  button: {
    height: config.deviceHeight * 0.08,
    backgroundColor: '#F6A096',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  textButton: {
    color: '#FFFFFF',
    letterSpacing: 1.8,
  },
  shedule: {
    color: '#2694A3',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default RecomendationDetails;
