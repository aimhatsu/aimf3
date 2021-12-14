import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Api from '../../Utils/Api';
import { IsMock } from '../../Utils/IsMock';
import { Storage_Token } from '../../Utils/KeyStorage';
import FloatingButton from '../FloatingButton/FloatingButton';
import { Loader } from '../Loader/Loader';
import RecomendationItem from './Components/RecomendationItem/RecomendationItem';
import RecomendationDetails from './Components/RecomentationDetails/RecomentationDetails';
const recomendationMock = require('../../Mock/Recomendations.json');
const recomendationsDetailsMock = require('../../Mock/RecomendationsDetails.json');

const Recomendation = (): JSX.Element => {
  const [recomendation, setRecomendation] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [recomendationsDetails, setrecomendationsDetails] = useState<any>();

  useEffect(() => {
    AsyncStorage.getItem(Storage_Token).then((data) => {
      Api({
        method: 'get',
        url: 'tratamentos/treatm',
        headers: {
          bearer: data,
        },
      })
        .then(async (res) => {
          if (IsMock) {
            setRecomendation(recomendationMock);
          } else {
            setRecomendation(res.data);
          }
          setLoading(false);
        })
        .catch((erro) => {
          setLoading(false);
        });
    });
  }, []);

  const handleDetails = (tratamento: string) => {
    AsyncStorage.getItem(Storage_Token).then((data) => {
      Api({
        method: 'get',
        url: `tratamentos/treatm/${tratamento}`,
        headers: {
          bearer: data,
        },
      })
        .then(async (res) => {
          if (IsMock) {
            setrecomendationsDetails(recomendationsDetailsMock);
          } else {
            setrecomendationsDetails(res.data);
          }
        })
        .catch((erro) => {})
        .finally(() => setLoading(false));
    });
  };

  const renderItem = (item: any) => {
    return (
      <TouchableHighlight
        onPress={() => {
          handleDetails(item.item.tratamento);
        }}
      >
        <RecomendationItem item={item.item} />
      </TouchableHighlight>
    );
  };

  const returnState = () => {
    setrecomendationsDetails(undefined);
  };

  return (
    <>
      <Loader loading={loading} />
      <View style={{ height: '100%' }}>
        {!loading && (
          <ScrollView>
            {recomendationsDetails == undefined && (
              <>
                <Text style={styles.titleRecomendation}>
                  Medicina Tradicional
                </Text>
                <Text style={styles.subTitleRecomendation}>
                  A sua qualidade de vida é o seu auto cuidado
                </Text>
                <FlatList
                  data={recomendation}
                  horizontal={true}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </>
            )}
            {recomendationsDetails != undefined && (
              <>
                <View>
                  <RecomendationDetails
                    recomendationDetails={recomendationsDetails}
                  />
                </View>
              </>
            )}
          </ScrollView>
        )}
        {recomendationsDetails != undefined && (
          <TouchableHighlight
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              width: 50,
              height: 50,
              right: 25,
              top: 12,
              backgroundColor: '#2694A3',
              borderRadius: 50,
            }}
            underlayColor="#ccc"
            onPress={() => {
              returnState();
            }}
          >
            <Icon name="arrow-back" color="#fff" />
          </TouchableHighlight>
        )}
        <FloatingButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleRecomendation: {
    fontSize: 30,
    color: '#2592A1',
    fontWeight: 'bold',
    opacity: 1,
    marginLeft: 15,
  },
  subTitleRecomendation: {
    fontSize: 14,
    color: '#707070',
    opacity: 1,
    marginLeft: 15,
    marginBottom: 10,
  },
});

export default Recomendation;
